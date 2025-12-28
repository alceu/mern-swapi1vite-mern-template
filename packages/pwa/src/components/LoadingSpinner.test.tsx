import React from "react";
import { render, screen } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders the default loading label", () => {
    render(<LoadingSpinner />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders custom children and className", () => {
    render(<LoadingSpinner className="extra">Fetching</LoadingSpinner>);

    expect(screen.getByText("Fetching")).toBeInTheDocument();
    expect(screen.getByText("Fetching")).toHaveClass("extra");
  });
});

