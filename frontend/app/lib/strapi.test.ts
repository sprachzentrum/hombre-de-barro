import { describe, expect, it } from "vitest";
import { safeHref } from "./strapi";

describe("safeHref", () => {
  it("accepts web and same-site links", () => {
    expect(safeHref("https://example.com/video")).toBe(
      "https://example.com/video"
    );
    expect(safeHref("/biblioteca/adobe")).toBe("/biblioteca/adobe");
    expect(safeHref("mailto:info@example.com")).toBe(
      "mailto:info@example.com"
    );
  });

  it("rejects executable and protocol-relative URLs", () => {
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(safeHref("data:text/html,test")).toBeNull();
    expect(safeHref("//evil.example/path")).toBeNull();
  });
});
