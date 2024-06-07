import { afterAll, beforeAll } from "vitest";
import {
} from "vue-router-mock";
import nock from "nock";


// disable real HTTP request for non mocked requests
beforeAll(() => nock.disableNetConnect());

// enable real HTTP requests and clear the mocked requests
afterAll(() => {
  nock.enableNetConnect();
});
