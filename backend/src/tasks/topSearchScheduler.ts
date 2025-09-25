import cron from "node-cron";
import { calculateAndPersistTopQueries } from "@services/TopSearchService";

export function initTopSearchScheduler() {
  cron.schedule("*/5 * * * *", () => {
    console.log("Running scheduled task: calculateAndPersistTopQueries");
    calculateAndPersistTopQueries();
  });
}
