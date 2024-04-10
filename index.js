const { argv } = require("node:process");
const { crawlPage } = require("./crawl.js");

async function main() {
  if (argv.length < 3) {
    console.log("Error: no website URL provided.");
    process.exit(1);
  }
  if (argv.length > 3) {
    console.log("Error: too many arguments provided.");
    process.exit(1);
  }
  const baseURL = argv[2];
  console.log(`Starting web crawler at ${baseURL}...`);
  await crawlPage(baseURL);
}

main();
