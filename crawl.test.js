const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("removes http:// from start of url", () => {
  const url = "http://www.mallard.dev/path";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("removes https:// from start of url", () => {
  const url = "https://www.mallard.dev/path";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("removes trailing / from url", () => {
  const url = "https://www.mallard.dev/path/";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("returns null if given an empty string", () => {
  const url = "";
  expect(normalizeURL(url)).toBe(null);
});

test("returns null if given an invalid URL", () => {
  const url = "mallard.duck";
  expect(normalizeURL(url)).toBe(null);
});
