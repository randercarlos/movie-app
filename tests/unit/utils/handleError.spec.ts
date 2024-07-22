import { describe, expect, it, vi } from "vitest";
import { handleError } from "@/utils/handleError";
import { push } from "notivue";

describe("handleError.ts", () => {
  describe("handleError()", () => {
    it("handles error displaying error logs and notification error notifications", () => {
      const consoleErrorSpy = vi.spyOn(console, "error");
      const notivuePushErrorSpy = vi.spyOn(push, "error");

      handleError("Fail on execute this method...", new Error());

      expect(consoleErrorSpy).toHaveBeenCalledTimes(4);
      expect(notivuePushErrorSpy).toHaveBeenCalledWith({
        title: "Error",
        message: "Fail on execute this method..."
          + " Try again later. If error persists, contact support."
      });

      // reset both mocks
      consoleErrorSpy.mockReset();
      notivuePushErrorSpy.mockReset();

      // create a error with stack property undefined to reach 100% code coverage on tests
      const error = new Error();
      error.stack = undefined;
      handleError("Fail on execute this method...", error);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(4);
      expect(notivuePushErrorSpy).toHaveBeenCalledWith({
        title: "Error",
        message: "Fail on execute this method..."
          + " Try again later. If error persists, contact support."
      });

      consoleErrorSpy.mockRestore();
      notivuePushErrorSpy.mockRestore();
    });
  });
});
