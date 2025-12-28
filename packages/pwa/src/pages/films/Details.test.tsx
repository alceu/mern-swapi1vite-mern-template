import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();
const locationMock = {
  state: { query: "luke", type: "films" },
};
const paramsMock = { id: "1" };
let capturedProps: any;

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
  useParams: () => paramsMock,
}));

vi.mock("@pwa/features/film/Details", () => ({
  default: (props: any) => {
    capturedProps = props;
    return <div data-testid="details" />;
  },
}));

import DetailsPage from "./Details";

describe("Film Details page", () => {
  it("wires navigation callbacks", () => {
    render(<DetailsPage />);

    capturedProps.onBackToSearch();
    expect(navigateMock).toHaveBeenCalledWith("/?query=luke&type=films");

    capturedProps.onCharacterClick("5");
    expect(navigateMock).toHaveBeenCalledWith("/people/5", {
      state: { fromSearch: true, query: "luke", type: "films" },
    });
  });
});

