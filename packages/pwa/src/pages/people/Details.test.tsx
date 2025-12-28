import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();
const locationMock = {
  state: { query: "leia", type: "people" },
};
const paramsMock = { id: "2" };
let capturedProps: any;

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
  useParams: () => paramsMock,
}));

vi.mock("@pwa/features/person/Details", () => ({
  default: (props: any) => {
    capturedProps = props;
    return <div data-testid="details" />;
  },
}));

import DetailsPage from "./Details";

describe("People Details page", () => {
  it("wires navigation callbacks", () => {
    render(<DetailsPage />);

    capturedProps.onBackToSearch();
    expect(navigateMock).toHaveBeenCalledWith("/?query=leia");

    capturedProps.onMovieClick("7");
    expect(navigateMock).toHaveBeenCalledWith("/films/7", {
      state: { fromSearch: true, query: "leia", type: "people" },
    });
  });
});

