import { ISearchQuery, ISearchQueryDto } from "./Search";

export interface ITopSearch<T = ISearchQuery> {
  searchQuery: T;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITopSearchDto extends Omit<ITopSearch<ISearchQueryDto>, 'createdAt' | 'updatedAt'> {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
