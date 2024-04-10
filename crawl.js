const url = require("node:url");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(urlString) {
  try {
    const urlObject = new URL(urlString);
    const urlHost = urlObject.host;
    const urlPath = urlObject.pathname.replace(/\/$/, "");
    return `${urlHost}${urlPath}`;
  } catch {
    return null;
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (const link of links) {
    if (link.href.includes(baseURL)) {
      urls.push(link.href);
    } else {
      urls.push(`${baseURL}${link.href}`);
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
