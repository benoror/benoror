import rawSocialPosts from "./social-posts.json" with { type: "json" };
import type { SocialPost, SocialPostPlatform } from "./schema.js";

const SOCIAL_POST_KEYS = [
  "date",
  "platform",
  "url",
  "title",
  "alsoOn",
] as const;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const PLATFORMS = new Set<SocialPostPlatform>(["x", "linkedin"]);

const describeItem = (index: number): string =>
  `social-posts.json item ${index + 1}`;

const isValidDate = (value: string): boolean => {
  if (!DATE_PATTERN.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
};

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
};

const validateSocialPost = (value: unknown, index: number): SocialPost => {
  const label = describeItem(index);
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`);
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  const unexpectedKeys = keys.filter(
    (key) =>
      !SOCIAL_POST_KEYS.includes(key as (typeof SOCIAL_POST_KEYS)[number]),
  );
  const missingKeys = SOCIAL_POST_KEYS.filter((key) => !(key in record));
  if (unexpectedKeys.length > 0 || missingKeys.length > 0) {
    throw new TypeError(
      `${label} must contain exactly ${SOCIAL_POST_KEYS.join(", ")} (missing: ${missingKeys.join(", ") || "none"}; unexpected: ${unexpectedKeys.join(", ") || "none"})`,
    );
  }

  if (typeof record.date !== "string" || !isValidDate(record.date)) {
    throw new TypeError(`${label}.date must be a valid YYYY-MM-DD date`);
  }
  if (
    typeof record.platform !== "string" ||
    !PLATFORMS.has(record.platform as SocialPostPlatform)
  ) {
    throw new TypeError(`${label}.platform must be "x" or "linkedin"`);
  }
  if (typeof record.url !== "string" || !isHttpUrl(record.url)) {
    throw new TypeError(`${label}.url must be an absolute HTTP(S) URL`);
  }
  if (typeof record.title !== "string" || record.title.trim().length === 0) {
    throw new TypeError(`${label}.title must be a non-empty string`);
  }
  if (
    !Array.isArray(record.alsoOn) ||
    !record.alsoOn.every((url) => typeof url === "string" && isHttpUrl(url))
  ) {
    throw new TypeError(
      `${label}.alsoOn must be an array of absolute HTTP(S) URLs`,
    );
  }

  return {
    date: record.date,
    platform: record.platform as SocialPostPlatform,
    url: record.url,
    title: record.title,
    alsoOn: [...record.alsoOn] as string[],
  };
};

export const loadSocialPosts = (value: unknown): SocialPost[] => {
  if (!Array.isArray(value)) {
    throw new TypeError("social-posts.json must contain an array");
  }

  const posts = value.map(validateSocialPost);
  const urls = new Set<string>();
  for (const [index, post] of posts.entries()) {
    if (urls.has(post.url)) {
      throw new TypeError(
        `${describeItem(index)}.url duplicates an earlier item: ${post.url}`,
      );
    }
    urls.add(post.url);

    const previous = posts[index - 1];
    if (previous && post.date > previous.date) {
      throw new TypeError(
        `${describeItem(index)} is newer than the preceding item; social-posts.json must be newest first`,
      );
    }
  }

  return posts;
};

export const SOCIAL_POSTS = loadSocialPosts(rawSocialPosts);
