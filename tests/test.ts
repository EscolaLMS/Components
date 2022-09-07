import { chromium, Browser, Page } from "playwright";
import {
  injectAxe,
  checkA11y,
  getViolations,
  reportViolations,
} from "axe-playwright";

import assert from "assert";
import DefaultTerminalReporter from "./reporter";
import fs from "fs";

//import tablemark from "tablemark";

let browser: Browser;
let page: Page;

(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(`http://localhost:3000`);
  await injectAxe(page);

  await checkA11y(page, undefined, undefined, true);

  const violations = await getViolations(page, ".wellms-component");

  const reporter = new DefaultTerminalReporter();

  reportViolations(violations, reporter);

  if (violations.length) {
    fs.writeFileSync(
      "tests/violations.md",
      `## AXE a11y errors violations
    
    There were ${violations.length} accessibility violations were detected

    ${reporter.markdown}
    
    `
    );
  } else {
    fs.writeFileSync("tests/violations.md", "no AXE a11y errors");
  }

  assert.strictEqual(violations.length, 0);

  /*

  it("check a11y for the whole page and axe run options", async () => {
    await checkA11y(page, null, {
      axeOptions: {
        runOnly: {
          type: "tag",
          values: ["wcag2a"],
        },
      },
    });
  });

  it("check a11y for the specific element", async () => {
    await checkA11y(page, 'input[name="password"]', {
      axeOptions: {
        runOnly: {
          type: "tag",
          values: ["wcag2a"],
        },
      },
    });
  });

  it("gets and reports a11y for the specific element", async () => {
    const violations = await getViolations(page, 'input[name="password"]', {
      axeOptions: {
        runOnly: {
          type: "tag",
          values: ["wcag2a"],
        },
      },
    });

    reportViolations(
      violations,
      new YourAwesomeCsvReporter("accessibility-report.csv")
    );

    expect(violations.length).toBe(0);
  });

  */

  assert(violations.length === 0);

  await browser.close();
})();
