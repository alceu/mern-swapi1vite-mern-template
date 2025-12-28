import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();
const setSearchParamsMock = vi.fn();
const searchParams = new URLSearchParams("type=films&query=leia");
let capturedProps: any;

vi.mock("react-router-dom", () => ({
  useSearchParams: () => [searchParams, setSearchParamsMock],
  useNavigate: () => navigateMock,
}));

vi.mock("@pwa/features/search/Container", () => ({
  default: (props: any) => {
    capturedProps = props;
    return <div data-testid="search-container" />;
  },
}));

import SearchPage from "./Search";

describe("SearchPage", () => {
  it("passes search params to the container and handles callbacks", () => {
    render(<SearchPage />);

    expect(capturedProps.type).toBe("films");
    expect(capturedProps.query).toBe("leia");

    capturedProps.onSearchSubmit({
      searchType: "people",
      searchQuery: "lu",
    });

    const updateParams = setSearchParamsMock.mock.calls[0][0];
    const nextParams = updateParams(new URLSearchParams("type=films&query=leia"));
    expect(nextParams.get("type")).toBeNull();
    expect(nextParams.get("query")).toBe("lu");

    capturedProps.onResultClick("1", "people");
    expect(navigateMock).toHaveBeenCalledWith("/people/1", {
      state: { fromSearch: true, query: "leia", type: "films" },
    });
  });
});

