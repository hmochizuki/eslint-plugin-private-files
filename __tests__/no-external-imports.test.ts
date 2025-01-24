import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import rule, { errorMessage } from "../src/index";

const ruleTester = new RuleTester();

describe("no-external-imports", () => {
  describe("relative imports", () => {
    it("should pass for valid imports", () => {
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
    it("should fail for invalid relative imports", () => {
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
    it("should pass for valid absolute imports", () => {
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

    it("should fail for invalid absolute imports", () => {
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
});
