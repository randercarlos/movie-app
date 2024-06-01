import { beforeEach } from "node:test";
import { afterAll, beforeAll } from "vitest";
import nock from "nock";

// disable real HTTP request for non mocked requests
beforeAll(() => nock.disableNetConnect());

beforeEach(() => nock.cleanAll());

// enable real HTTP requests and clear the mocked requests
afterAll(() => {
  nock.enableNetConnect();
});
