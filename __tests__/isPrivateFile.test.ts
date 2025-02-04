import { describe, it, expect } from "vitest";
import { isPrivateFile } from "../src/isPrivateFile";

describe("isPrivateFile", () => {
  describe("prefix", () => {
    it("should return true for valid private file prefixes", () => {
      const validPaths = [
        "_file",
        "_file.js",
        "_file.jsx",
        "_file.ts",
        "_file.tsx",
      ];

      validPaths.forEach((path) => {
        expect(isPrivateFile(path, { prefix: "_" })).toBe(true);
      });
    });

    it("should return false for invalid prefixes", () => {
      const invalidPaths = [
        "file",
        "file.js",
        "file.jsx",
        "file.ts",
        "file.tsx",
      ];

      invalidPaths.forEach((path) => {
        expect(isPrivateFile(path, { prefix: "_" })).toBe(false);
      });
    });
  });
  describe("suffix", () => {
    it("should return true for valid private file suffixes", () => {
      const validPaths = [
        "file.private",
        "file.private.js",
        "file.private.jsx",
        "file.private.ts",
        "file.private.tsx",
      ];

      validPaths.forEach((path) => {
        expect(isPrivateFile(path, { suffix: "private" })).toBe(true);
      });
    });

    it("should return false for invalid suffixes", () => {
      const invalidPaths = [
        "file",
        "file.js",
        "file.jsx",
        "file.ts",
        "file.tsx",
      ];

      invalidPaths.forEach((path) => {
        expect(isPrivateFile(path, { suffix: "private" })).toBe(false);
      });
    });
  });
});
