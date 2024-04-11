function printReport(pages) {
  console.log("Generating report...");
  let sortable = [];
  for (const page in pages) {
    sortable.push([page, pages[page]]);
  }
  sortable.sort((a, b) => b[1] - a[1]);
  for (item of sortable) {
    const url = item[0];
    const count = item[1];
    console.log(`Found ${count} internal links to ${url}.`);
  }
}

module.exports = {
  printReport,
};
