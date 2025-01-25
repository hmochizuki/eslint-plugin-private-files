import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import rule, { errorMessage } from "../src/index";

const ruleTester = new RuleTester();

describe("no-external-imports", () => {
  it("when import is not private file, should not report error", () => {
    ruleTester.run("no-external-imports", rule.rules["no-external-imports"], {
      valid: [
        {
          code: "import 'src/module/external';",
          filename: "src/module/example.ts",
        },
        {
          code: "import './external';",
          filename: "src/example",
        },
      ],
      invalid: [],
    });
  });

  describe("when import is private file", () => {
    describe("relative imports", () => {
      it("should pass for same directory imports", () => {
        ruleTester.run("no-external-imports", rule.rules["no-external-imports"], {
          valid: [
            {
              code: "import './module.private.ts';",
              filename: "src/example.private.ts",
            },
          ],
          invalid: [],
        });
      });
      it("should fail for not same directory imports", () => {
        ruleTester.run("no-external-imports", rule.rules["no-external-imports"], {
          valid: [],
          invalid: [
            {
              code: "import '../externalModule.private.ts';",
              filename: "src/example.private.ts",
              errors: [
                {
                  message: errorMessage,
                },
              ],
            },
          ],
        });
      });
    });
  
    describe("absolute imports", () => {
      it("should pass for same directory imports", () => {
        ruleTester.run("no-external-imports", rule.rules["no-external-imports"], {
          valid: [
            {
              code: "import 'src/module/module.private.ts';",
              filename: "src/module/example.private.ts",
            },
          ],
          invalid: [],
        });
      });
  
      it("should fail for not same directory imports", () => {
        ruleTester.run("no-external-imports", rule.rules["no-external-imports"], {
          valid: [],
          invalid: [
            {
              code: "import 'src/absolute/path/to/module.private.ts';",
              filename: "src/example.private.ts",
              errors: [
                {
                  message: errorMessage,
                },
              ],
            },
          ],
        });
      });
    });

  })
});
