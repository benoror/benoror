import assert from "node:assert/strict"
import { describe, test } from "node:test"
import socialPosts from "../../../../packages/data/src/shared/profile/social-posts.json" with { type: "json" }
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
  "https://notes.benoror.com",
  "https://x.com/benoror",
  "https://linkedin.com/in/benoror",
  "https://example.com",
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
    facets: opts.facets?.map((uri) => ({
      features: [{ $type: "app.bsky.richtext.facet#link", uri }],
    })),
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

  test("uses X as canonical for an X + Bluesky cross-post", () => {
    const x = feedItem({
      id: "x_posts::cross-post",
      title: "Canonical X title",
      link: "https://x.com/benoror/status/1",
      sourceId: "x_posts",
      sourceName: "X",
      sourceUrl: "https://x.com/benoror",
      referencedLinks: ["https://bsky.app/profile/benoror.bsky.social/post/1"],
    })
    const bluesky = feedItem({
      id: "bluesky_posts::cross-post",
      title: "Bluesky title",
      link: "https://bsky.app/profile/benoror.bsky.social/post/1",
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
    })

    const merged = mergeDuplicateFeedItems([bluesky, x], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, x.link)
    assert.equal(merged[0]?.title, x.title)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["Bluesky"])
  })

  test("uses LinkedIn as canonical for a LinkedIn + Bluesky cross-post", () => {
    const linkedin = feedItem({
      id: "linkedin_posts::cross-post",
      title: "Canonical LinkedIn title",
      link: "https://www.linkedin.com/posts/benoror_cross-post",
      sourceId: "linkedin_posts",
      sourceName: "LinkedIn",
      sourceUrl: "https://linkedin.com/in/benoror",
      referencedLinks: ["https://bsky.app/profile/benoror.bsky.social/post/2"],
    })
    const bluesky = feedItem({
      id: "bluesky_posts::cross-post-2",
      title: "Bluesky title",
      link: "https://bsky.app/profile/benoror.bsky.social/post/2",
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
    })

    const merged = mergeDuplicateFeedItems([bluesky, linkedin], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, linkedin.link)
    assert.equal(merged[0]?.title, linkedin.title)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["Bluesky"])
  })

  test("uses X for an X + LinkedIn + Bluesky cross-post and orders alternates", () => {
    const linkedinLink = "https://www.linkedin.com/posts/benoror_cross-post-3"
    const blueskyLink = "https://bsky.app/profile/benoror.bsky.social/post/3"
    const x = feedItem({
      id: "x_posts::cross-post-3",
      title: "Canonical X title",
      link: "https://x.com/benoror/status/3",
      sourceId: "x_posts",
      sourceName: "X",
      sourceUrl: "https://x.com/benoror",
      referencedLinks: [linkedinLink, blueskyLink],
      alsoSharedTo: [
        { sourceId: "bluesky_posts", sourceName: "Bluesky", link: blueskyLink },
        { sourceId: "linkedin_posts", sourceName: "LinkedIn", link: linkedinLink },
      ],
    })
    const linkedin = feedItem({
      id: "linkedin_posts::cross-post-3",
      title: "LinkedIn title",
      link: linkedinLink,
      sourceId: "linkedin_posts",
      sourceName: "LinkedIn",
      sourceUrl: "https://linkedin.com/in/benoror",
    })
    const bluesky = feedItem({
      id: "bluesky_posts::cross-post-3",
      title: "Bluesky title",
      link: blueskyLink,
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
    })

    const merged = mergeDuplicateFeedItems([bluesky, linkedin, x], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, x.link)
    assert.equal(merged[0]?.title, x.title)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["LinkedIn", "Bluesky"])
  })

  test("keeps a blog canonical over X and Bluesky and orders social alternates", () => {
    const blueskyLink = "https://bsky.app/profile/benoror.bsky.social/post/4"
    const blog = feedItem({
      id: "bear_blog::long-form",
      title: "Canonical long-form title",
      link: "https://benoror.bearblog.dev/long-form/",
      sourceId: "bear_blog",
      sourceName: "Blog",
      sourceUrl: "https://benoror.bearblog.dev",
    })
    const x = feedItem({
      id: "x_posts::long-form",
      title: "X title",
      link: "https://x.com/benoror/status/4",
      sourceId: "x_posts",
      sourceName: "X",
      sourceUrl: "https://x.com/benoror",
      referencedLinks: [blog.link, blueskyLink],
    })
    const bluesky = feedItem({
      id: "bluesky_posts::long-form",
      title: "Bluesky title",
      link: blueskyLink,
      sourceId: "bluesky_posts",
      sourceName: "Bluesky",
      sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
    })

    const merged = mergeDuplicateFeedItems([bluesky, x, blog], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, blog.link)
    assert.equal(merged[0]?.title, blog.title)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["X", "Bluesky"])
  })

  test("orders every other source between LinkedIn and Bluesky", () => {
    const sharedTitle = "One cross-post"
    const items = [
      feedItem({
        id: "bluesky_posts::all-sources",
        title: sharedTitle,
        link: "https://bsky.app/profile/benoror.bsky.social/post/all",
        sourceId: "bluesky_posts",
        sourceName: "Bluesky",
        sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
      }),
      feedItem({
        id: "other::all-sources",
        title: sharedTitle,
        link: "https://unlisted.example/all",
        sourceId: "other",
        sourceName: "Other",
        sourceUrl: "https://unlisted.example",
      }),
      feedItem({
        id: "linkedin_posts::all-sources",
        title: sharedTitle,
        link: "https://www.linkedin.com/posts/benoror_all",
        sourceId: "linkedin_posts",
        sourceName: "LinkedIn",
        sourceUrl: "https://linkedin.com/in/benoror",
      }),
      feedItem({
        id: "x_posts::all-sources",
        title: sharedTitle,
        link: "https://x.com/benoror/status/all",
        sourceId: "x_posts",
        sourceName: "X",
        sourceUrl: "https://x.com/benoror",
      }),
      feedItem({
        id: "notes::all-sources",
        title: sharedTitle,
        link: "https://notes.benoror.com/all",
        sourceId: "notes",
        sourceName: "Obsidian Notes",
        sourceUrl: "https://notes.benoror.com",
      }),
    ]

    const merged = mergeDuplicateFeedItems(items, SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.sourceName, "Obsidian Notes")
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), [
      "X",
      "LinkedIn",
      "Other",
      "Bluesky",
    ])
  })

  test("orders a singleton item's existing alsoOn links with the same precedence", () => {
    const x = feedItem({
      id: "x_posts::singleton",
      title: "X post with unmatched cross-post links",
      link: "https://x.com/benoror/status/singleton",
      sourceId: "x_posts",
      sourceName: "X",
      sourceUrl: "https://x.com/benoror",
      alsoSharedTo: [
        {
          sourceId: "bluesky_posts",
          sourceName: "Bluesky",
          link: "https://bsky.app/profile/benoror.bsky.social/post/singleton",
        },
        {
          sourceId: "other",
          sourceName: "Other",
          link: "https://unlisted.example/singleton",
        },
        {
          sourceId: "linkedin_posts",
          sourceName: "LinkedIn",
          link: "https://www.linkedin.com/posts/benoror_singleton",
        },
      ],
    })

    const merged = mergeDuplicateFeedItems([x], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, x.link)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), [
      "LinkedIn",
      "Other",
      "Bluesky",
    ])
  })

  test("folds all 10 curated Bluesky/blog/notes cross-posts into their existing entries", () => {
    const crossPosts = socialPosts.filter((post) =>
      post.alsoOn.some((url) => ["bsky.app", "benoror.bearblog.dev", "notes.benoror.com"].includes(new URL(url).hostname)),
    )
    assert.equal(crossPosts.length, 10)

    const socialItems = crossPosts.map((post) =>
      feedItem({
        id: `x_posts::${post.url}`,
        title: post.title,
        link: post.url,
        sourceId: "x_posts",
        sourceName: "X",
        sourceUrl: "https://x.com/benoror",
        referencedLinks: post.alsoOn,
        alsoSharedTo: post.alsoOn.map((link) => ({
          sourceId: `shared::${new URL(link).hostname}`,
          sourceName: new URL(link).hostname,
          link,
        })),
      }),
    )
    const existingItems = crossPosts.flatMap((post, index) =>
      post.alsoOn
        .filter((url) => ["bsky.app", "benoror.bearblog.dev", "notes.benoror.com"].includes(new URL(url).hostname))
        .map((link, linkIndex) => {
          const equivalentLink = new URL(link)
          equivalentLink.protocol = "http:"
          equivalentLink.search = "?utm_source=test"
          equivalentLink.pathname = `${equivalentLink.pathname}/`

          const sourceId = link.includes("bsky.app") ? "bluesky_posts" : link.includes("bearblog.dev") ? "bear_blog" : "notes"
          const sourceUrl =
            sourceId === "bluesky_posts"
              ? "https://bsky.app/profile/benoror.bsky.social"
              : sourceId === "bear_blog"
                ? "https://benoror.bearblog.dev"
                : "https://notes.benoror.com"

          return feedItem({
            id: `${sourceId}::${index}:${linkIndex}`,
            title: `Existing item ${index}:${linkIndex}`,
            link: equivalentLink.toString(),
            sourceId,
            sourceName: sourceId,
            sourceUrl,
          })
        }),
    )

    const merged = mergeDuplicateFeedItems([...socialItems, ...existingItems], SOURCE_PRIORITY)
    assert.equal(merged.length, 10)
    assert.equal(merged.filter((item) => item.id.startsWith("x_posts::")).length, 6)
    assert.equal(merged.filter((item) => item.sourceId === "bear_blog" || item.sourceId === "notes").length, 4)
    assert.ok(merged.every((item) => item.alsoSharedTo?.some((shared) => shared.sourceId.includes("bluesky"))))
  })

  test("renders an X post with a LinkedIn alsoOn once, with X canonical", () => {
    const crossPost = socialPosts.find((post) => post.platform === "x" && post.alsoOn.some((url) => url.includes("linkedin.com")))
    assert.ok(crossPost)
    const linkedInUrl = crossPost.alsoOn.find((url) => url.includes("linkedin.com"))
    assert.ok(linkedInUrl)

    const x = feedItem({
      id: `x_posts::${crossPost.url}`,
      title: crossPost.title,
      link: crossPost.url,
      sourceId: "x_posts",
      sourceName: "X",
      sourceUrl: "https://x.com/benoror",
      referencedLinks: crossPost.alsoOn,
      alsoSharedTo: [
        {
          sourceId: "linkedin_posts",
          sourceName: "LinkedIn",
          link: linkedInUrl,
        },
      ],
    })
    const linkedIn = feedItem({
      id: `linkedin_posts::${linkedInUrl}`,
      title: `LinkedIn copy of ${crossPost.title}`,
      link: `${linkedInUrl}/?utm_source=test`,
      sourceId: "linkedin_posts",
      sourceName: "LinkedIn",
      sourceUrl: "https://linkedin.com/in/benoror",
    })

    const merged = mergeDuplicateFeedItems([linkedIn, x], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.sourceId, "x_posts")
    assert.deepEqual(merged[0]?.alsoSharedTo, [
      {
        sourceId: "linkedin_posts",
        sourceName: "LinkedIn",
        link: linkedIn.link,
      },
    ])
  })
})
