import { describe, it, expect } from "vitest";
import { isPrivateFile } from "../src/isPrivateFile";

describe("isPrivateFile", () => {
  describe("prefix only", () => {
    const options = {
      prefix: "_",
      suffix: "",
    }
    it("should return true for valid private file prefixes", () => {
      const validPaths = [
        "_file",
        "_file.js",
        "_file.jsx",
        "_file.ts",
        "_file.tsx",
      ];

      validPaths.forEach((path) => {
        expect(isPrivateFile(path, options)).toBe(true);
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
        expect(isPrivateFile(path, options)).toBe(false);
      });
    });
  });
  describe("suffix only", () => {
    const options = {
      prefix: "",
      suffix: "private",
    }
    it("should return true for valid private file suffixes", () => {
      const validPaths = [
        "file.private",
        "file.private.js",
        "file.private.jsx",
        "file.private.ts",
        "file.private.tsx",
      ];

      validPaths.forEach((path) => {
        expect(isPrivateFile(path, options)).toBe(true);
      });
    });

    it.only("should return false for invalid suffixes", () => {
      const invalidPaths = [
        "file",
        "file.js",
        "file.jsx",
        "file.ts",
        "file.tsx",
      ];

      invalidPaths.forEach((path) => {
        expect(isPrivateFile(path, options)).toBe(false);
      });
    });
  });
  describe("prefix and suffix provided", () => {
    const options = {
      prefix: "_",
      suffix: "private",
    }
    it("should return true for valid private file patterns", () => {
      const validPaths = [
        "_file.private",
        "_file.private.js",
        "_file.private.jsx",
        "_file.private.ts",
        "_file.private.tsx",
      ];

      validPaths.forEach((path) => {
        expect(isPrivateFile(path, options)).toBe(true);
      });
    });

    it("should return false for invalid patterns", () => {
      const invalidPaths = [
        "_file",
        "_file.js",
        "_file.jsx",
        "_file.ts",
        "_file.tsx",
        "file.private",
        "file.private.js",
        "file.private.jsx",
        "file.private.ts",
        "file.private.tsx",
      ];

      invalidPaths.forEach((path) => {
        expect(isPrivateFile(path, options)).toBe(false);
      });
    });
  });
});
