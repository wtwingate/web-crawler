const url = require("node:url");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages) {
  // If page is not part of our website, return immediately.
  if (!currentURL.includes(baseURL)) {
    return pages;
  }

  // Get normalized URL for current page.
  const normalizedURL = normalizeURL(currentURL);

  // If current page is already being tracked, increment counter
  // and return pages.
  if (normalizedURL in pages) {
    pages[normalizedURL] += 1;
    return pages;
  }

  // Add current page to tracked pages.
  pages[normalizedURL] = 1;

  // Crawl the current page and attempt to extract HTML.
  console.log(`Crawling ${currentURL}...`);
  let htmlBody = "";
  try {
    response = await fetch(currentURL);
    if (!response.ok) {
      console.log(
        `Error: server responded with status code ${response.status}.`,
      );
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Error: invalid content type ${contentType}.`);
      return pages;
    }
    htmlBody = await response.text();
  } catch (err) {
    console.log(err.message);
  }

  // Get URL links from the current page's HTML, and call crawlPage
  // on each link recursively.
  const nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      urls.push(`${baseURL}${link.href}`);
    } else {
      urls.push(link.href);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  try {
    const urlObject = new url.URL(urlString);
    const urlHost = urlObject.host;
    const urlPath = urlObject.pathname.replace(/\/$/, "");
    return `${urlHost}${urlPath}`;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  crawlPage,
  getURLsFromHTML,
  normalizeURL,
};
