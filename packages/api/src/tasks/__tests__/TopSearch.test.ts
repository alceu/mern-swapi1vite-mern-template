import { describe, expect, it, jest } from "@jest/globals";

import { initTopSearchScheduler } from "@api/tasks/TopSearch";
import { calculateAndPersistAllTopQueries } from "@api/services/TopSearch";

jest.mock("node-cron", () => ({
  schedule: jest.fn(),
}));

jest.mock("@api/services/TopSearch", () => ({
  calculateAndPersistAllTopQueries: jest.fn(),
}));

import cron from "node-cron";

describe("initTopSearchScheduler", () => {
  it("schedules top search calculation", () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    initTopSearchScheduler();

    expect(cron.schedule).toHaveBeenCalledWith(
      "*/5 * * * *",
      expect.any(Function)
    );

    const scheduledCallback = (cron.schedule as jest.Mock)
      .mock.calls[0][1] as () => void;
    scheduledCallback();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Running scheduled task: calculateAndPersistAllTopQueries"
    );
    expect(calculateAndPersistAllTopQueries).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
