import cron from "node-cron";

import { calculateAndPersistAllTopQueries } from "@api/services/TopSearch";

export function initTopSearchScheduler() {
  cron.schedule("*/5 * * * *", () => {
    console.log("Running scheduled task: calculateAndPersistAllTopQueries");
    calculateAndPersistAllTopQueries();
  });
}
