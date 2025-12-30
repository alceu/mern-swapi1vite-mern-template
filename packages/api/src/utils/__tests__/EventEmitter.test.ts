import { describe, expect, it } from "@jest/globals";
import { EventEmitter } from "node:events";

import eventEmitter from "@api/utils/EventEmitter";

describe("event emitter", () => {
  it("exports a shared EventEmitter instance", () => {
    expect(eventEmitter).toBeInstanceOf(EventEmitter);
  });
});
