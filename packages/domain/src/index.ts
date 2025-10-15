// Shared domain types for monorepo

export type SearchType = "films" | "people";

export interface SearchQueryDTO {
  _id: string;
  query: string;
  type: SearchType;
  count?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TopSearchItem {
  searchQuery: {
    _id: string;
    query: string;
    type: SearchType;
  };
  percentage: number;
  timestamp: string;
}

export interface TopSearchIdsResponse {
  ids: string[];
}
