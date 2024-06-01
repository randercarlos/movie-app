import { describe, expect, it } from "vitest";
import { formatDate, formatNumber, getEndpointWithQueryParams, resolvedPromises }
  from "@/utils/helper";

describe("helper.ts", () => {
  describe("getEndpointWithQueryParams()", () => {
    it("mount endpoint without query params correctly", () => {
      const endpoint = "any_endpoint";
      const fullEndpoint = getEndpointWithQueryParams(endpoint);

      expect(fullEndpoint).toBe("any_endpoint");
    });

    it("mount endpoint with query params correctly", () => {
      const endpoint = "any_endpoint";
      const searchParams = new URLSearchParams({
        paramA: "valueA",
        paramB: "valueB",
        paramC: "valueC",
        paramD: "valueD",
        paramE: "valueE",
      });

      const fullEndpoint = getEndpointWithQueryParams(endpoint, searchParams);

      expect(fullEndpoint).toBe("any_endpoint?paramA=valueA&paramB=valueB&paramC=valueC&" +
        "paramD=valueD&paramE=valueE");
    });
  });

  describe("formatNumber()", () => {
    it("format number with default min and max digits", () => {
      const number = 12323445;
      const formattedNumber = formatNumber(number);

      expect(formattedNumber).toBe("12,323,445.00");
    });

    it("format number with min digits", () => {
      const number = 12323445.12;
      const formattedNumber = formatNumber(number, 2);

      expect(formattedNumber).toBe("12,323,445.12");
    });

    it("format number with 2 digits with min and max digits", () => {
      const number = 12323445.12;
      const formattedNumber = formatNumber(number, 3, 4);

      expect(formattedNumber).toBe("12,323,445.120");
    });

    it("format number with 4 digits with min and max digits", () => {
      const number = 12323445.1238;
      const formattedNumber = formatNumber(number, 3, 4);

      expect(formattedNumber).toBe("12,323,445.1238");
    });

    it("format number with max digits if min digits is greather than max digits",
      () => {
        const number = 12323445.56;
        const formattedNumber = formatNumber(number, 7, 4);

        expect(formattedNumber).toBe("12,323,445.5600");
      });

    it("format a not number must return 0", () => {
      const number = "dsfdfdf";
      const formattedNumber = formatNumber(number);

      expect(formattedNumber).toBe("0.00");
    });
  });

  describe("formatDate()", () => {
    it("format date with default format", () => {
      const date = "2024-06-01";
      const formattedDate = formatDate(date);

      expect(formattedDate).toBe("06/01/2024");
    });

    it("format date with custom format", () => {
      const date = "2024-06-01";
      const formattedDate = formatDate(date, "DD/MM/YYYY");

      expect(formattedDate).toBe("01/06/2024");
    });
  });

  describe("resolvedPromises()", () => {
    it("resolved promises in default time", async() => {
      const start = Date.now();

      await resolvedPromises();

      const end = Date.now();
      const elapsed = end - start;

      // Allowing some buffer time to account for slight delays in execution
      expect(elapsed).toBeGreaterThanOrEqual(200);
      expect(elapsed).toBeLessThan(200 + 100);
    });

    it("resolved promises in custom time", async() => {
      const waitFor = 500;
      const start = Date.now();

      await resolvedPromises(waitFor);

      const end = Date.now();
      const elapsed = end - start;

      // Allowing some buffer time to account for slight delays in execution
      expect(elapsed).toBeGreaterThanOrEqual(waitFor);
      expect(elapsed).toBeLessThan(waitFor + 100);
    });
  });
});
