import { useApiService } from "@/composables/useApiService";
import { useFetch } from "@vueuse/core";
import { describe, expect, it } from "vitest";

describe("useApiService.ts", () => {
  it("create apiService with the correct configuration", async() => {
    const { apiService } = useApiService();

    expect(apiService).toBeTypeOf(typeof useFetch);
  });
});
