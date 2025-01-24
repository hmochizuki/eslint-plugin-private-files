import { describe, it, expect } from "vitest";
import { isPrivateFile } from "../src/index";

describe("isPrivateFile", () => {
  it("should return true for valid private file suffixes", () => {
    const validPaths = [
      "file.private",
      "file.private.js",
      "file.private.jsx",
      "file.private.ts",
      "file.private.tsx"
    ];

    validPaths.forEach(path => {
      expect(isPrivateFile(path, "private")).toBe(true);
    });
  });

  it("should return false for invalid suffixes", () => {
    const invalidPaths = [
      "file",
      "file.txt",
      "file.md",
      "file.json"
    ];

    invalidPaths.forEach(path => {
      expect(isPrivateFile(path, "private")).toBe(false);
    });
  });
});
