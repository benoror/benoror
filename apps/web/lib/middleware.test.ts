import assert from "node:assert/strict";
import { test } from "node:test";
import { getSectionHostRoute } from "./section-host.ts";

test("rewrites the podcast host root to the internal index", () => {
  assert.deepEqual(getSectionHostRoute("podcast.benoror.com", "/"), {
    action: "rewrite",
    pathname: "/podcast",
  });
});

test("rewrites clean podcast episode paths to the internal route", () => {
  assert.deepEqual(
    getSectionHostRoute("podcast.benoror.com", "/one-map-of-reality"),
    {
      action: "rewrite",
      pathname: "/podcast/one-map-of-reality",
    },
  );
});

test("redirects internal podcast paths to clean subdomain URLs", () => {
  assert.deepEqual(
    getSectionHostRoute("podcast.benoror.com", "/podcast"),
    {
      action: "redirect",
      pathname: "/",
    },
  );
  assert.deepEqual(
    getSectionHostRoute(
      "podcast.benoror.com",
      "/podcast/one-map-of-reality",
    ),
    {
      action: "redirect",
      pathname: "/one-map-of-reality",
    },
  );
});

test("keeps the main-domain podcast fallback path unchanged", () => {
  assert.equal(
    getSectionHostRoute("www.benoror.com", "/podcast"),
    null,
  );
});

test("keeps the existing portfolio host rewrite unchanged", () => {
  assert.deepEqual(getSectionHostRoute("portfolio.benoror.com", "/"), {
    action: "rewrite",
    pathname: "/portfolio",
  });
});
