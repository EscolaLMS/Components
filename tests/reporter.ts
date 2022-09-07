import { markdownTable } from "./mdtable";
import Reporter from "axe-playwright/src/types";
import { describeViolations } from "axe-playwright/src/utils";
import { Result } from "axe-core";

export default class DefaultTerminalReporter implements Reporter {
  public markdown: string = "";

  constructor() {}

  async report(violations: Result[]): Promise<void> {
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => {
        return {
          id,
          impact,
          description,
          nodes: nodes.length,
        };
      }
    );

    this.markdown = markdownTable([
      ["id", "impact", "description", "nodes"],
      ...violationData.map((obj) =>
        Object.values(obj).map((v) => v?.toString())
      ),
    ]);

    if (violationData.length > 0) {
      // summary
      console.log("violationData saved to object");
    } else {
      console.log(`No accessibility violations detected!`);
    }
  }
}
