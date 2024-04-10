const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("normalizeURL remove http://", () => {
  const url = "http://www.mallard.dev/path";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("normalizeURL remove https://", () => {
  const url = "https://www.mallard.dev/path";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("normalizeURL remove trailing /", () => {
  const url = "https://www.mallard.dev/path/";
  expect(normalizeURL(url)).toBe("www.mallard.dev/path");
});

test("normalizeURL ignore empty URL", () => {
  const url = "";
  expect(normalizeURL(url)).toBe(null);
});

test("normalizeURL ignore invalid URL", () => {
  const url = "mallard.duck";
  expect(normalizeURL(url)).toBe(null);
});

test("getURLsFromHTML absolute link", () => {
  const htmlBody =
    '<html><body><a href="https://www.mallard.dev/path">Click me!</a></body></html>';
  const baseURL = "https://www.mallard.dev";
  const htmlLinks = ["https://www.mallard.dev/path"];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(htmlLinks);
});

test("getURLsFromHTML relative link", () => {
  const htmlBody =
    '<html><body><a href="/path/to/content">Click me!</a></body></html>';
  const baseURL = "https://www.mallard.dev";
  const htmlLinks = ["https://www.mallard.dev/path/to/content"];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(htmlLinks);
});

test("getURLsFromHTML multiple links", () => {
  const htmlBody = `<html><body><h1>Hello there</h1><p>This is paragraph with some <a href="https://www.mallard.dev/stuff">
  absolute links</a> and some <a href="/other/things">relative links</a>. There are just <a href="https://www.mallard.dev/more">so</a>
  <a href="/even/more">many</a> <a href="/too/many">links!</a></p></body></html>`;
  const baseURL = "https://www.mallard.dev";
  const htmlLinks = [
    "https://www.mallard.dev/stuff",
    "https://www.mallard.dev/other/things",
    "https://www.mallard.dev/more",
    "https://www.mallard.dev/even/more",
    "https://www.mallard.dev/too/many",
  ];
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual(htmlLinks);
});
