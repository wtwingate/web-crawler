const url = require("node:url");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(currentURL) {
  console.log(`Crawling ${currentURL}...`);
  try {
    response = await fetch(currentURL);
    if (!response.ok) {
      console.log(
        `Error: server responded with status code ${response.status}.`,
      );
      return;
    }
    if (!response.headers.get("content-type").includes("text/html")) {
      console.log("Error: invalid content type.");
      return;
    }
    htmlString = await response.text();
    console.log(htmlString);
  } catch (err) {
    console.log(err.message);
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
function normalizeURL(urlString) {
  try {
    const urlObject = new url.URL(urlString);
    const urlHost = urlObject.host;
    const urlPath = urlObject.pathname.replace(/\/$/, "");
    return `${urlHost}${urlPath}`;
  } catch {
    return null;
  }
}

module.exports = {
  crawlPage,
  getURLsFromHTML,
  normalizeURL,
};
