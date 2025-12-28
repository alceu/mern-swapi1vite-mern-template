import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import ErrorBoundary from "./ErrorBoundary";

const ThrowNotFound = () => {
  throw new Error("not found");
};

const ThrowGeneric = () => {
  throw new Error("boom");
};

describe("ErrorBoundary", () => {
  it("shows not found message for not found errors", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowNotFound />
      </ErrorBoundary>
    );

    expect(screen.getByText("404 - Not Found")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("shows generic message for other errors", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowGeneric />
      </ErrorBoundary>
    );

    expect(screen.getByText("Sorry.. there was an error")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});

