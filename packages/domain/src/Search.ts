export type SearchType = "films" | "people";

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
