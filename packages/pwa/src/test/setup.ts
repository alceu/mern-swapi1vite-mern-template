import "@testing-library/jest-dom";

if (!process.env.VITE_SWAPI_API_URL) {
  process.env.VITE_SWAPI_API_URL = "http://localhost";
}

if (!process.env.VITE_SEARCHES_STATS_API_URL) {
  process.env.VITE_SEARCHES_STATS_API_URL = "http://localhost";
}
