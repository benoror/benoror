import assert from "node:assert/strict"
import { describe, test } from "node:test"
import socialPosts from "../../../../packages/data/src/shared/profile/social-posts.json" with { type: "json" }
import {
  type BlueskyAuthorFeedEntry,
  type BlueskyThreadNode,
  type MergeableFeedItem,
  collectSelfAuthoredReplyShareLinksFromThread,
  dropStandaloneSocialPosts,
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
  "https://linkedin.com/in/benoror",
  "https://example.com",
  "https://x.com/benoror",
  "https://bsky.app/profile/benoror.bsky.social",
]

const FEATURED_X_IDS = [
  "2120604588797788469",
  "2115572065629507795",
  "2110091188355367391",
  "2080180698162344076",
  "2049686088457892172",
  "2018812038404083961",
]

const X_SOURCE = { sourceId: "x_posts", sourceName: "X", sourceUrl: "https://x.com/benoror" }
const LINKEDIN_SOURCE = { sourceId: "linkedin_posts", sourceName: "LinkedIn", sourceUrl: "https://linkedin.com/in/benoror" }
const BLUESKY_SOURCE = {
  sourceId: "bluesky_posts",
  sourceName: "Bluesky",
  sourceUrl: "https://bsky.app/profile/benoror.bsky.social",
}

type CuratedPost = { date: string; platform: string; url: string; title: string; alsoOn: string[]; featured?: boolean }
const curatedPosts = socialPosts as CuratedPost[]

/** Mirrors how lib/feed.ts maps a curated social post into a feed item. */
const curatedFeedItem = (post: CuratedPost): MergeableFeedItem => {
  const source = post.platform === "x" ? X_SOURCE : LINKEDIN_SOURCE
  return feedItem({
    id: `${source.sourceId}::${post.url}`,
    title: post.title,
    link: post.url,
    ...source,
    referencedLinks: post.alsoOn,
    alsoSharedTo: post.alsoOn.map((link) => ({
      sourceId: `shared::${new URL(link).hostname}`,
      sourceName: new URL(link).hostname,
      link,
    })),
    ...(post.featured ? { featured: true } : {}),
  })
}

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

  test("keeps X as the main link of an X + Bluesky pair, which then leaves the feed", () => {
    const x = feedItem({
      id: "x_posts::cross-post",
      title: "X title",
      link: "https://x.com/benoror/status/1",
      ...X_SOURCE,
      referencedLinks: ["https://bsky.app/profile/benoror.bsky.social/post/1"],
    })
    const bluesky = feedItem({
      id: "bluesky_posts::cross-post",
      title: "Bluesky title",
      link: "https://bsky.app/profile/benoror.bsky.social/post/1",
      ...BLUESKY_SOURCE,
    })

    const merged = mergeDuplicateFeedItems([bluesky, x], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, x.link)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["Bluesky"])
    assert.deepEqual(dropStandaloneSocialPosts(merged), [])
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

  test("uses LinkedIn over X for an X + LinkedIn + Bluesky twin and orders alternates", () => {
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
    assert.equal(merged[0]?.link, linkedin.link)
    assert.equal(merged[0]?.title, linkedin.title)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["X", "Bluesky"])
    assert.equal(dropStandaloneSocialPosts(merged).length, 1)
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

  test("orders every other source between LinkedIn and the short-form social sources", () => {
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
      "LinkedIn",
      "Other",
      "X",
      "Bluesky",
    ])
  })

  test("orders a singleton item's existing alsoOn links with the same precedence", () => {
    const linkedin = feedItem({
      id: "linkedin_posts::singleton",
      title: "LinkedIn post with unmatched cross-post links",
      link: "https://www.linkedin.com/posts/benoror_singleton",
      ...LINKEDIN_SOURCE,
      alsoSharedTo: [
        {
          sourceId: "bluesky_posts",
          sourceName: "Bluesky",
          link: "https://bsky.app/profile/benoror.bsky.social/post/singleton",
        },
        {
          sourceId: "x_posts",
          sourceName: "X",
          link: "https://x.com/benoror/status/singleton",
        },
        {
          sourceId: "other",
          sourceName: "Other",
          link: "https://unlisted.example/singleton",
        },
      ],
    })

    const merged = mergeDuplicateFeedItems([linkedin], SOURCE_PRIORITY)
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, linkedin.link)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["Other", "X", "Bluesky"])
  })

  test("folds all 10 curated Bluesky/blog/notes cross-posts into long-form or featured entries", () => {
    const crossPosts = curatedPosts.filter((post) =>
      post.alsoOn.some((url) => ["bsky.app", "benoror.bearblog.dev", "notes.benoror.com"].includes(new URL(url).hostname)),
    )
    assert.equal(crossPosts.length, 10)

    const socialItems = crossPosts.map(curatedFeedItem)
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

    const merged = dropStandaloneSocialPosts(
      mergeDuplicateFeedItems([...socialItems, ...existingItems], SOURCE_PRIORITY),
    )
    assert.equal(merged.length, 10)
    assert.equal(merged.filter((item) => item.sourceId === "bear_blog" || item.sourceId === "notes").length, 4)
    assert.equal(merged.filter((item) => item.sourceId === "linkedin_posts").length, 5)
    assert.deepEqual(
      merged.filter((item) => item.sourceId === "x_posts").map((item) => item.featured),
      [true],
    )
    assert.ok(merged.every((item) => item.alsoSharedTo?.some((shared) => shared.sourceId.includes("bluesky"))))
  })

  test("renders a LinkedIn + X twin once, with LinkedIn canonical and X under alsoOn", () => {
    const crossPost = curatedPosts.find(
      (post) => post.platform === "linkedin" && post.alsoOn.some((url) => new URL(url).hostname === "x.com"),
    )
    assert.ok(crossPost)
    const xUrl = crossPost.alsoOn.find((url) => new URL(url).hostname === "x.com")
    assert.ok(xUrl)

    const linkedIn = curatedFeedItem(crossPost)
    const x = feedItem({
      id: `x_posts::${xUrl}`,
      title: `X copy of ${crossPost.title}`,
      link: `${xUrl}/?s=20`,
      ...X_SOURCE,
    })

    const merged = dropStandaloneSocialPosts(mergeDuplicateFeedItems([x, linkedIn], SOURCE_PRIORITY))
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.sourceId, "linkedin_posts")
    assert.equal(merged[0]?.link, crossPost.url)
    assert.ok(merged[0]?.alsoSharedTo?.some((shared) => shared.link === x.link))
  })

  test("does not merge two posts that only cite the same third-party or homepage URL", () => {
    const skillsPack = feedItem({
      id: "bluesky_posts::skills-pack",
      title: "Shipped my own skills pack",
      link: "https://bsky.app/profile/benoror.bsky.social/post/pack",
      ...BLUESKY_SOURCE,
      referencedLinks: ["https://skills.sh", "https://skills.sh/p/pack"],
    })
    const laterPost = feedItem({
      id: "bluesky_posts::five-steps",
      title: "Five steps as agent skills",
      link: "https://bsky.app/profile/benoror.bsky.social/post/five",
      ...BLUESKY_SOURCE,
      referencedLinks: ["https://skills.sh/p/pack"],
    })
    const chatbot = feedItem({
      id: "bluesky_posts::chatbot",
      title: "I just added a chatbot to benoror.com",
      link: "https://bsky.app/profile/benoror.bsky.social/post/chatbot",
      ...BLUESKY_SOURCE,
      referencedLinks: ["https://benoror.com"],
    })
    const portfolioReply = feedItem({
      id: "bluesky_posts::gba",
      title: "Resurrecting a GBA project",
      link: "https://bsky.app/profile/benoror.bsky.social/post/gba",
      ...BLUESKY_SOURCE,
      referencedLinks: ["https://www.benoror.com/portfolio"],
    })

    const merged = mergeDuplicateFeedItems([skillsPack, laterPost, chatbot, portfolioReply], SOURCE_PRIORITY)
    assert.equal(merged.length, 4)
  })

  test("a featured X post stays the main item, even next to a LinkedIn twin", () => {
    const linkedinLink = "https://www.linkedin.com/posts/benoror_featured"
    const x = feedItem({
      id: "x_posts::featured",
      title: "Pinned X post",
      link: "https://x.com/benoror/status/featured",
      ...X_SOURCE,
      referencedLinks: [linkedinLink],
      featured: true,
    })
    const linkedin = feedItem({
      id: "linkedin_posts::featured",
      title: "LinkedIn copy",
      link: linkedinLink,
      ...LINKEDIN_SOURCE,
    })

    const merged = dropStandaloneSocialPosts(mergeDuplicateFeedItems([linkedin, x], SOURCE_PRIORITY))
    assert.equal(merged.length, 1)
    assert.equal(merged[0]?.link, x.link)
    assert.equal(merged[0]?.featured, true)
    assert.deepEqual(merged[0]?.alsoSharedTo?.map((item) => item.sourceName), ["LinkedIn"])
  })
})

describe("dropStandaloneSocialPosts", () => {
  test("keeps long-form and featured items, drops standalone X and Bluesky posts", () => {
    const items = [
      { id: "blog", link: "https://benoror.bearblog.dev/post/" },
      { id: "notes", link: "https://notes.benoror.com/Some-Note" },
      { id: "linkedin", link: "https://www.linkedin.com/posts/benoror_post" },
      { id: "gist", link: "https://gist.github.com/benoror/abc" },
      { id: "x", link: "https://x.com/benoror/status/1" },
      { id: "twitter", link: "https://twitter.com/benoror/status/2" },
      { id: "bluesky", link: "https://bsky.app/profile/benoror.bsky.social/post/3" },
      { id: "featured-x", link: "https://x.com/benoror/status/4", featured: true },
    ]

    assert.deepEqual(
      dropStandaloneSocialPosts(items).map((item) => item.id),
      ["blog", "notes", "linkedin", "gist", "featured-x"],
    )
  })
})

describe("curated social posts", () => {
  test("features exactly the six pinned X posts", () => {
    const featured = curatedPosts.filter((post) => post.featured)
    assert.ok(featured.every((post) => post.platform === "x" && post.featured === true))
    assert.deepEqual(
      featured.map((post) => post.url.split("/status/")[1]).sort(),
      [...FEATURED_X_IDS].sort(),
    )
  })

  test("stores X + LinkedIn twins with LinkedIn canonical", () => {
    const xWithLinkedInTwin = curatedPosts.filter(
      (post) => post.platform === "x" && post.alsoOn.some((url) => url.includes("linkedin.com")),
    )
    assert.deepEqual(xWithLinkedInTwin, [])
    assert.ok(
      curatedPosts.some((post) => post.platform === "linkedin" && post.alsoOn.some((url) => url.includes("x.com"))),
    )
  })

  test("the rendered curated feed has no standalone X posts besides the featured ones", () => {
    const merged = dropStandaloneSocialPosts(mergeDuplicateFeedItems(curatedPosts.map(curatedFeedItem), SOURCE_PRIORITY))
    const linkedInCount = curatedPosts.filter((post) => post.platform === "linkedin").length

    assert.equal(merged.length, linkedInCount + FEATURED_X_IDS.length)
    const xItems = merged.filter((item) => new URL(item.link).hostname === "x.com")
    assert.equal(xItems.length, FEATURED_X_IDS.length)
    assert.ok(xItems.every((item) => item.featured === true))
  })
})
