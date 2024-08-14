import { type Page, test as base } from "@playwright/test";
import {
  actorDetailsResponseMock,
  movieDetailsResponseMock,
  movieGenresResponseMock,
  multiSearchResponseMock,
  nowPlayingMoviesResponseMock,
  popularActorsResponseMock,
  popularMoviesResponseMock,
  popularTvShowsResponseMock,
  topRatedTvShowsResponseMock,
  tvShowDetailsResponseMock,
  tvShowGenresResponseMock,
} from "#/mockData";

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

// multiSearchResponseMock.results = Array(2)
//   .fill(multiSearchResponseMock.results)
//   .flat();
// popularMoviesResponseMock.results = Array(10)
//   .fill(popularMoviesResponseMock.results)
//   .flat();
// nowPlayingMoviesResponseMock.results = Array(10)
//   .fill(nowPlayingMoviesResponseMock.results)
//   .flat();

// popularTvShowsResponseMock.results = Array(10)
//   .fill(popularTvShowsResponseMock.results)
//   .flat();
// topRatedTvShowsResponseMock.results = Array(10)
//   .fill(topRatedTvShowsResponseMock.results)
//   .flat();

popularActorsResponseMock.results = Array(3)
  .fill(popularActorsResponseMock.results)
  .flat();


/**********************************************************************************/
// MOCK API REQUESTS TO PREVENT CALL REAL REQUESTS IN BACKEND ON E2E TESTS
/**********************************************************************************/
export async function mockApiRequests(page: Page): Promise<void> {

  // Mocks multisearch endpoint
  mockApiResponse(page, "*/**/search/multi?query=*", multiSearchResponseMock);

  // Mocks movies endpoints
  mockApiResponse(page, "*/**/genre/movie/list", movieGenresResponseMock);
  mockApiResponse(page, "*/**/movie/popular", popularMoviesResponseMock);
  mockApiResponse(page, "*/**/movie/now_playing", nowPlayingMoviesResponseMock);
  mockApiResponse(page, new RegExp("movie/\\d+"), movieDetailsResponseMock);

  // Mocks tv shows endpoints
  mockApiResponse(page, "*/**/genre/tv/list", tvShowGenresResponseMock);
  mockApiResponse(page, "*/**/tv/popular", popularTvShowsResponseMock);
  mockApiResponse(page, "*/**/tv/top_rated", topRatedTvShowsResponseMock);
  mockApiResponse(page, new RegExp("tv/\\d+"), tvShowDetailsResponseMock);

  // Mocks actors endpoints
  mockApiResponse(page, "*/**/person/popular?page=*", popularActorsResponseMock);
  mockApiResponse(page,
    new RegExp("person/\\d+\\?append_to_response=images,external_ids,combined_credits")
    , actorDetailsResponseMock);

  // Mocks movies, tv shows and actors images endpoints
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w45/*",
    "./tests/card_default_image_32x48.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w185/*",
    "./tests/card_default_image_185x270.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w300/*",
    "./tests/card_default_image_275x412.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w400/*",
    "./tests/card_default_image_275x412.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/w500/*",
    "./tests/card_default_image_500x750.jpg");
  mockApiImageResponse(page, "https://image.tmdb.org/t/p/original/*",
    "./tests/card_default_image_500x750.jpg");
}

async function mockApiResponse(page: Page, mockUrl: string | RegExp, mockResponseData: object):
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
