import assert from "node:assert/strict"
import { describe, test } from "node:test"
import {
  type BlueskyAuthorFeedEntry,
  type BlueskyThreadNode,
  type MergeableFeedItem,
  collectSelfAuthoredReplyShareLinksFromThread,
  indexSelfAuthoredReplyShareLinksFromAuthorFeed,
  mergeDuplicateFeedItems,
  referencedLinksForBlueskyRoot,
} from "./consolidate.ts"

const AUTHOR = { did: "did:plc:ben", handle: "benoror.bsky.social" }
const OTHER = { did: "did:plc:other", handle: "someone.bsky.social" }

const INBUNDLY_ROOT_URI = "at://did:plc:ben/app.bsky.feed.post/3muxk4ki5ik24"
const INBUNDLY_BLOG = "https://benoror.bearblog.dev/bringing-google-inboxs-bundles-back-to-gmail/"
const INBUNDLY_SITE = "https://inbundly.com"

const SOURCE_PRIORITY = [
  "https://benoror.bearblog.dev",
  "https://bsky.app/profile/benoror.bsky.social",
]

const post = (opts: {
  uri: string
  text?: string
  author?: { did?: string; handle?: string }
  embed?: string
  facets?: string[]
  replyRoot?: string
}): BlueskyAuthorFeedEntry["post"] => ({
  uri: opts.uri,
  author: opts.author ?? AUTHOR,
  embed: opts.embed ? { external: { uri: opts.embed } } : undefined,
  record: {
    text: opts.text ?? "",
    createdAt: "2026-09-07T12:00:00.000Z",
    reply: opts.replyRoot ? { root: { uri: opts.replyRoot }, parent: { uri: opts.replyRoot } } : undefined,
    embed: opts.embed ? { external: { uri: opts.embed } } : undefined,
    facets: opts.facets?.map((uri) => ({ features: [{ $type: "app.bsky.richtext.facet#link", uri }] })),
  },
})

const feedItem = (
  overrides: Partial<MergeableFeedItem> & Pick<MergeableFeedItem, "id" | "title" | "link" | "sourceId" | "sourceName" | "sourceUrl">,
): MergeableFeedItem => overrides

describe("self-authored Bluesky thread share-link harvest", () => {
  test("folds reply embed/facet permalinks onto the matching root, ignoring other threads and commenters", () => {
    const feed: BlueskyAuthorFeedEntry[] = [
      {
        post: post({
          uri: "at://did:plc:ben/app.bsky.feed.post/read-more",
          text: "Read more: benoror.bearblog.dev/bringing-goo...",
          embed: INBUNDLY_BLOG,
          facets: [INBUNDLY_BLOG],
          replyRoot: INBUNDLY_ROOT_URI,
        }),
        reply: {},
      },
      {
        post: post({
          uri: "at://did:plc:ben/app.bsky.feed.post/part-4",
          text: "4/ Live on Chrome → inbundly.com",
          embed: INBUNDLY_SITE,
          facets: [INBUNDLY_SITE],
          replyRoot: INBUNDLY_ROOT_URI,
        }),
        reply: {},
      },
      {
        post: post({
          uri: INBUNDLY_ROOT_URI,
          text: "I needed a structured inbox so I revived Google Inbox bundles as Inbundly.",
          embed: INBUNDLY_SITE,
          facets: [INBUNDLY_SITE],
        }),
      },
      {
        post: post({
          uri: "at://did:plc:ben/app.bsky.feed.post/reply-to-someone-else",
          text: "See also my other writeup",
          embed: "https://benoror.bearblog.dev/unrelated-post/",
          facets: ["https://benoror.bearblog.dev/unrelated-post/"],
          replyRoot: "at://did:plc:other/app.bsky.feed.post/someone-elses-root",
        }),
        reply: {},
      },
    ]

    const byRoot = indexSelfAuthoredReplyShareLinksFromAuthorFeed(feed, AUTHOR)
    const inbundlyThreadLinks = byRoot.get(INBUNDLY_ROOT_URI) ?? []
    assert.ok(inbundlyThreadLinks.includes("https://benoror.bearblog.dev/bringing-google-inboxs-bundles-back-to-gmail"))
    assert.ok(inbundlyThreadLinks.includes(INBUNDLY_SITE))
    assert.equal(byRoot.has("at://did:plc:other/app.bsky.feed.post/someone-elses-root"), true)
    assert.ok(!(byRoot.get(INBUNDLY_ROOT_URI) ?? []).includes("https://benoror.bearblog.dev/unrelated-post"))

    const rootPost = feed[2]?.post
    assert.ok(rootPost)
    const referenced = referencedLinksForBlueskyRoot(rootPost, inbundlyThreadLinks)
    assert.ok(referenced.includes(INBUNDLY_SITE))
    assert.ok(referenced.includes("https://benoror.bearblog.dev/bringing-google-inboxs-bundles-back-to-gmail"))
  })

  test("does not harvest bare body URLs from replies (citation protection)", () => {
    const feed: BlueskyAuthorFeedEntry[] = [
      {
        post: post({
          uri: "at://did:plc:ben/app.bsky.feed.post/cite-only",
          text: `Unlike ${INBUNDLY_BLOG} this is just a mention.`,
          replyRoot: INBUNDLY_ROOT_URI,
        }),
        reply: {},
      },
    ]

    const byRoot = indexSelfAuthoredReplyShareLinksFromAuthorFeed(feed, AUTHOR)
    assert.deepEqual(byRoot.get(INBUNDLY_ROOT_URI) ?? [], [])
  })

  test("getPostThread walker keeps only the author's reply share links", () => {
    const thread: BlueskyThreadNode = {
      $type: "app.bsky.feed.defs#threadViewPost",
      post: post({
        uri: INBUNDLY_ROOT_URI,
        text: "Root about Inbundly",
        embed: INBUNDLY_SITE,
      }),
      replies: [
        {
          post: post({
            uri: "at://did:plc:ben/app.bsky.feed.post/read-more",
            text: "Read more",
            embed: INBUNDLY_BLOG,
            facets: [INBUNDLY_BLOG],
          }),
          replies: [
            {
              post: {
                ...post({
                  uri: "at://did:plc:other/app.bsky.feed.post/random-comment",
                  text: "Nice!",
                  author: OTHER,
                  embed: "https://benoror.bearblog.dev/should-not-merge/",
                  facets: ["https://benoror.bearblog.dev/should-not-merge/"],
                }),
                author: OTHER,
              },
            },
          ],
        },
      ],
    }

    const links = collectSelfAuthoredReplyShareLinksFromThread(thread, AUTHOR)
    assert.deepEqual(links, ["https://benoror.bearblog.dev/bringing-google-inboxs-bundles-back-to-gmail"])
    assert.ok(!links.includes("https://benoror.bearblog.dev/should-not-merge"))
  })
})

describe("mergeDuplicateFeedItems", () => {
  test("collapses Inbundly blog + Bluesky root when the blog URL is a harvested thread share link", () => {
    const blog = feedItem({
      id: "bear_blog::inbundly",
      title: "Bringing Google Inbox's bundles back to Gmail",
      link: INBUNDLY_BLOG,
      sourceId: "bear_blog",
      sourceName: "Blog",
      sourceUrl: "https://benoror.bearblog.dev",
    })
    const bluesky = feedItem({
      id: `bluesky_posts::${INBUNDLY_ROOT_URI}`,
      title: "I needed a structured inbox, for me *and* my AI agents, so I revived Google Inbox",
      link: "https://bsky.app/profile/benoror.bsky.social/post/3muxk4ki5ik24",
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
      referencedLinks: [INBUNDLY_SITE, INBUNDLY_BLOG],
    })

    const merged = mergeDuplicateFeedItems([bluesky, blog], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, INBUNDLY_BLOG)
    assert.equal(merged[0]?.sourceName, "Blog")
    assert.deepEqual(merged[0]?.alsoSharedTo, [
      {
        sourceId: "bluesky_posts",
        sourceName: "Bluesky",
        link: "https://bsky.app/profile/benoror.bsky.social/post/3muxk4ki5ik24",
      },
    ])
  })

  test("does not collapse the pair when the Bluesky root only references the product URL", () => {
    const blog = feedItem({
      id: "bear_blog::inbundly",
      title: "Bringing Google Inbox's bundles back to Gmail",
      link: INBUNDLY_BLOG,
      sourceId: "bear_blog",
      sourceName: "Blog",
      sourceUrl: "https://benoror.bearblog.dev",
    })
    const bluesky = feedItem({
      id: `bluesky_posts::${INBUNDLY_ROOT_URI}`,
      title: "I needed a structured inbox, for me *and* my AI agents, so I revived Google Inbox",
      link: "https://bsky.app/profile/benoror.bsky.social/post/3muxk4ki5ik24",
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
      referencedLinks: [INBUNDLY_SITE],
    })

    const merged = mergeDuplicateFeedItems([bluesky, blog], SOURCE_PRIORITY)
    assert.equal(merged.length, 2)
  })

  test("still unions on equal titles and leaves unrelated items alone", () => {
    const a = feedItem({
      id: "blog::same",
      title: "The Son of Man",
      link: "https://benoror.bearblog.dev/the-son-of-man/",
      sourceId: "bear_blog",
      sourceName: "Blog",
      sourceUrl: "https://benoror.bearblog.dev",
    })
    const b = feedItem({
      id: "bluesky::same",
      title: "The Son of Man",
      link: "https://bsky.app/profile/benoror.bsky.social/post/son",
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
    })
    const other = feedItem({
      id: "blog::other",
      title: "Unrelated note",
      link: "https://benoror.bearblog.dev/other/",
      sourceId: "bear_blog",
      sourceName: "Blog",
      sourceUrl: "https://benoror.bearblog.dev",
    })

    const merged = mergeDuplicateFeedItems([a, b, other], SOURCE_PRIORITY)
    assert.equal(merged.length, 2)
    const son = merged.find((item) => item.id === "blog::same")
    assert.ok(son)
    assert.equal(son.alsoSharedTo?.[0]?.sourceName, "Bluesky")
    assert.ok(merged.some((item) => item.id === "blog::other"))
  })
})
