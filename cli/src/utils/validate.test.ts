import { describe, expect, it } from "vitest";

import { validateAppName } from "./validate";

const invalidNameMessage =
  "App name must consist of only lowercase alphanumeric characters, '-', and '_'";

describe("validateAppName", () => {
  it.each(["my-app", "my_app", ".", "my-app/", "apps/my-app", "@ws/my-app"])(
    "accepts %s",
    (input) => {
      expect(validateAppName(input)).toBeUndefined();
    },
  );

  it.each([undefined, "", "MyApp", "my app", "@ws/", "/"])(
    "rejects %s with the existing message",
    (input) => {
      expect(validateAppName(input)).toBe(invalidNameMessage);
    },
  );
});
