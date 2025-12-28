export type SearchType = "films" | "people";

export const SEARCH_TYPES = ["films", "people"] as const;

export const isSearchType = (value: string): value is SearchType =>
  SEARCH_TYPES.includes(value as SearchType);

export interface ISearchQuery {
  query: string;
  type: SearchType;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISearchQueryDto
  extends Omit<ISearchQuery, "createdAt" | "updatedAt"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
