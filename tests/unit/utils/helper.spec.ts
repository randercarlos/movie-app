import { describe, expect, it, vi } from "vitest";
import { addQueryStringToURL, calculateAge,
  formatDate,
  formatNumber,
  getEndpointWithQueryParams,
  getYearFromDate,
  isValidDate,
  resolvedPromises,
  truncateString}
  from "@/utils/helper";
import type { Moment } from "moment";
import moment from "moment";
import { log } from "@/utils/helper";

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
    it("format date with default date format", () => {
      const mapInputToResult: Record<string, Moment | string | null | undefined>[] = [
        {
          "dateInput": moment("2024-06-01", "YYYY-MM-DD"),
          "dateResult": "06/01/2024"
        },
        {
          "dateInput": "2024-06-01",
          "dateResult": "06/01/2024"
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      mapInputToResult.forEach((inputToResult) =>
        expect(formatDate(inputToResult.dateInput)).toBe(inputToResult.dateResult));
    });

    it("format date with custom date format", () => {
      const mapInputToResult: Record<string, Moment | string | null | undefined>[] = [
        {
          "dateInput": moment("2024-06-01", "YYYY-MM-DD"),
          "dateResult": "01/06/2024"
        },
        {
          "dateInput": "2024-06-01",
          "dateResult": "01/06/2024"
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      const dateFormat = "DD/MM/YYYY";
      mapInputToResult.forEach((inputToResult) =>
        expect(formatDate(inputToResult.dateInput, dateFormat)).toBe(inputToResult.dateResult));
    });
  });

  describe("resolvedPromises()", () => {
    it("resolved promises in default time", { retry: 3 }, async() => {
      const start = Date.now();

      await resolvedPromises();

      const end = Date.now();
      const elapsed = end - start;

      // Allowing some buffer time to account for slight delays in execution
      expect(elapsed).toBeGreaterThanOrEqual(200);
      expect(elapsed).toBeLessThan(200 + 100);
    });

    it("resolved promises in custom time", { retry: 3 }, async() => {
      const waitFor = 1000;
      const start = Date.now();

      await resolvedPromises(waitFor);

      const end = Date.now();
      const elapsed = end - start;

      // Allowing some buffer time to account for slight delays in execution
      expect(elapsed).toBeGreaterThanOrEqual(waitFor);
      expect(elapsed).toBeLessThan(waitFor + 100);
    });
  });

  describe("getYearFromDate()", () => {
    it("get year from date with default date format", () => {
      const mapInputToResult: Record<string, Moment | string | null | undefined>[] = [
        {
          "dateInput": moment("2024-06-01", "YYYY-MM-DD"),
          "dateResult": "2024"
        },
        {
          "dateInput": "2024-06-01",
          "dateResult": "2024"
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      mapInputToResult.forEach((inputToResult) =>
        expect(getYearFromDate(inputToResult.dateInput)).toBe(inputToResult.dateResult));
    });

    it("get year from date with custom date format", () => {
      const mapInputToResult: Record<string, Moment | string | null | undefined>[] = [
        {
          "dateInput": moment("01/06/2024", "DD/MM/YYYY"),
          "dateResult": "2024"
        },
        {
          "dateInput": "01/06/2024",
          "dateResult": "2024"
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      const dateFormat = "DD/MM/YYYY";
      mapInputToResult.forEach((inputToResult) =>
        expect(getYearFromDate(inputToResult.dateInput, dateFormat))
          .toBe(inputToResult.dateResult));
    });
  });

  describe("calculateAge()", () => {
    it("tries calculate age from date with default date format", () => {
      const mapInputToResult = [
        {
          "dateInput": moment("2000-01-01", "YYYY-MM-DD"),
          "dateResult": moment().diff(moment("2000-01-01", "YYYY-MM-DD"), "years")
        },
        {
          "dateInput": "2000-01-01",
          "dateResult": moment().diff(moment("2000-01-01", "YYYY-MM-DD"), "years")
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      mapInputToResult.forEach((inputToResult) =>
        expect(calculateAge(inputToResult.dateInput)).toBe(inputToResult.dateResult));
    });

    it("tries calculate age from date with custom date format", () => {
      const dateFormat = "DD/MM/YYYY";
      const mapInputToResult = [
        {
          "dateInput": moment("01/01/2000", dateFormat),
          "dateResult": moment().diff(moment("01/01/2000", dateFormat), "years")
        },
        {
          "dateInput": "01/01/2000",
          "dateResult": moment().diff(moment("01/01/2000", dateFormat), "years")
        },
        {
          "dateInput": null,
          "dateResult": null
        },
        {
          "dateInput": undefined,
          "dateResult": null
        }
      ];

      mapInputToResult.forEach(inputToResult => {
        expect(calculateAge(inputToResult.dateInput, dateFormat)).toBe(inputToResult.dateResult);
      });
    });
  });

  describe("isValidDate()", () => {
    it("checks if date input is a valid date with default date format", () => {
      const mapInputToResult = [
        {
          "dateInput": moment("2024-07-10", "YYYY-MM-DD"),
          "dateResult": true
        },
        {
          "dateInput": "2024-07-10",
          "dateResult": true
        },
        {
          "dateInput": moment("2024-15-40", "YYYY-MM-DD"),
          "dateResult": false
        },
        {
          "dateInput": "2024-15-40",
          "dateResult": false
        },
        {
          "dateInput": null,
          "dateResult": false
        },
        {
          "dateInput": undefined,
          "dateResult": false
        }
      ];

      mapInputToResult.forEach((inputToResult) =>
        expect(isValidDate(inputToResult.dateInput)).toBe(inputToResult.dateResult));
    });

    it("checks if date input is a valid date with custom date format", () => {
      const dateFormat = "DD/MM/YYYY";
      const mapInputToResult = [
        {
          "dateInput": moment("10/07/2024", dateFormat),
          "dateResult": true
        },
        {
          "dateInput": "10/07/2024",
          "dateResult": true
        },
        {
          "dateInput": moment("40/15/2024", dateFormat),
          "dateResult": false
        },
        {
          "dateInput": "40/15/2024",
          "dateResult": false
        },
        {
          "dateInput": null,
          "dateResult": false
        },
        {
          "dateInput": undefined,
          "dateResult": false
        }
      ];

      mapInputToResult.forEach(inputToResult => {
        expect(isValidDate(inputToResult.dateInput, dateFormat)).toBe(inputToResult.dateResult);
      });
    });
  });

  describe("truncateString()", () => {
    it("returns the original string if its length is less than or equals the max. number of chars.",
      () => {
        const string = "Isso é uma string de teste";

        expect(truncateString(string, 30)).toBe(string);
        expect(truncateString(string, 26)).toBe(string);
      });

    it("returns the original string if max. number of chars is less than or equals zero", () => {
      const string = "Isso é uma string de teste";

      expect(truncateString(string, -2)).toBe(string);
    });

    it("returns the truncate string if its length is greather than the max. number of chars. "
      + "with default limit string", () => {
      const string = "Isso é uma string de teste";

      expect(truncateString(string, 20)).toBe("Isso é uma string de...");
      expect(truncateString(string, 1)).toBe("I...");
    });

    it("returns the truncate string if its length is greather than the max. number of chars. "
      + "with custom limit string", () => {
      const string = "Isso é uma string de teste";
      const limitString = "___";

      expect(truncateString(string, 20, limitString)).toBe("Isso é uma string de___");
      expect(truncateString(string, 1, limitString)).toBe("I___");
    });
  });

  describe("addQueryStringToURL()", () => {
    it("adds a query string to a URL",
      () => {
        const URL = "http://localhost:3000/api/v1/clients";
        const queryStringKey = "approved";
        const queryStringValue = true;

        expect(addQueryStringToURL(URL, queryStringKey, String(queryStringValue)))
          .toBe("http://localhost:3000/api/v1/clients?approved=true");
      });
  });

  describe("log()", () => {
    it("shows data in console.log()", () => {
      const consoleLogSpy = vi.spyOn(console, "log");

      log("Test message");

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);

      consoleLogSpy.mockRestore();
    });
  });

});
