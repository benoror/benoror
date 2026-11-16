import assert from "node:assert/strict"
import { describe, test } from "node:test"
import { detectFeedPlatform, getFeedPlatformLabel, type FeedPlatformInput } from "./platform.ts"

describe("detectFeedPlatform", () => {
  const cases: Array<{
    name: string
    input: FeedPlatformInput
    expected: ReturnType<typeof detectFeedPlatform>
  }> = [
    {
      name: "X platform field",
      input: { platform: "x", url: "https://example.com/post" },
      expected: "x",
    },
    {
      name: "legacy Twitter host",
      input: { url: "https://twitter.com/benoror/status/1" },
      expected: "x",
    },
    {
      name: "Bluesky",
      input: { url: "https://bsky.app/profile/benoror.bsky.social/post/1" },
      expected: "bluesky",
    },
    {
      name: "Bear Blog",
      input: { url: "https://benoror.bearblog.dev/post" },
      expected: "bear",
    },
    {
      name: "LinkedIn",
      input: { sourceId: "linkedin_posts" },
      expected: "linkedin",
    },
    {
      name: "notes",
      input: { sourceUrl: "https://notes.benoror.com" },
      expected: "notes",
    },
    {
      name: "Medium subdomain",
      input: { url: "https://benoror.medium.com/post" },
      expected: "medium",
    },
    {
      name: "Blogger",
      input: { url: "https://benjiorozco.blogspot.com/2020/post.html" },
      expected: "blogger",
    },
    {
      name: "Stack Overflow",
      input: { url: "https://stackoverflow.com/questions/123/example" },
      expected: "stackoverflow",
    },
    {
      name: "GitHub gist source",
      input: { sourceId: "gist_starred_own" },
      expected: "gist",
    },
    {
      name: "GitHub gist host",
      input: { url: "https://gist.github.com/benoror/abcdef" },
      expected: "gist",
    },
  ]

  for (const testCase of cases) {
    test(`detects ${testCase.name}`, () => {
      assert.equal(detectFeedPlatform(testCase.input), testCase.expected)
    })
  }

  test("prefers an explicit platform/source hint over URL host detection", () => {
    assert.equal(
      detectFeedPlatform({
        platform: "linkedin",
        sourceId: "x_posts",
        url: "https://bsky.app/profile/benoror.bsky.social/post/1",
      }),
      "linkedin",
    )
  })

  test("falls back to the generic external-link platform", () => {
    assert.equal(
      detectFeedPlatform({
        sourceName: "Personal site",
        url: "https://example.com/post",
      }),
      "unknown",
    )
    assert.equal(getFeedPlatformLabel({ url: "https://example.com/post" }), "External link")
  })
})
