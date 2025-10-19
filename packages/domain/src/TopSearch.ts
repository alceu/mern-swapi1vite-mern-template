export interface ITopSearch<T = string> {
  searchQuery: T;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITopSearchDto
  extends Omit<ITopSearch<string>, "createdAt" | "updatedAt"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
