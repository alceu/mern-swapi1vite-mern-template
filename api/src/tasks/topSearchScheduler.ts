import cron from "node-cron";

import { calculateAndPersistAllTopQueries } from "@api/services/TopSearchService";

export function initTopSearchScheduler() {
  cron.schedule("*/5 * * * *", () => {
    console.log("Running scheduled task: calculateAndPersistAllTopQueries");
    calculateAndPersistAllTopQueries();
  });
}
