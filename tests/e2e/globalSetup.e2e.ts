import { type Page, test as base } from "@playwright/test";
import {
  movieGenresResponseMock,
  multiSearchResponseMock,
  nowPlayingMoviesResponseMock,
  popularMoviesResponseMock,
} from "../mockData";

// Extend basic test by providing a beforeEach and afterEach.
export const test = base.extend({
  page: async({ page: webPage }, use) => {
    /*************************************/
    // BEFORE EACH
    /*************************************/
    mockApiRequests(webPage);

    /*************************************/
    // CALL THE CURRENT TEST
    /*************************************/
    await use(webPage);

    /*************************************/
    // AFTER EACH
    /*************************************/
  },
});

/**********************************************************************************/
// MOCK API REQUESTS TO PREVENT CALL REAL REQUESTS IN BACKEND ON E2E TESTS
/**********************************************************************************/
export async function mockApiRequests(page: Page): Promise<void> {

  mockApiResponse(page, "*/**/genre/movie/list", movieGenresResponseMock);
  mockApiResponse(page, "*/**/movie/popular", popularMoviesResponseMock);
  mockApiResponse(page, "*/**/movie/now_playing", nowPlayingMoviesResponseMock);
  mockApiResponse(page, "*/**/search/multi?query=*", multiSearchResponseMock);

  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w45/*",
    "./tests/card_default_image_32x48.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w300/*",
    "./tests/card_default_image_275x412.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w500/*",
    "./tests/card_default_image_500x750.jpg");
}

async function mockApiResponse(page: Page, mockUrl: string, mockResponseData: object):
  Promise<void> {
  await page.route(mockUrl, async(route) => {
    console.log(`INTERCEPTED REQUEST DATA FROM URL: ${mockUrl}`);
    await route.fulfill({
      json: mockResponseData
    });
  });
}

async function mockApiImageResponse(page: Page, mockImageUrl: string, mockImagePath: string):
  Promise<void> {
  await page.route(mockImageUrl, async(route) => {
    console.log(`INTERCEPTED REQUEST IMAGE FROM URL: ${mockImageUrl}`);
    await route.fulfill({
      contentType: "image/jpeg",
      path: mockImagePath
    });
  });
}
