import { ITopSearchDto, ISearchQueryDto } from "@swapi-mern/domain";

export interface ComposedTopSearch extends Omit<ITopSearchDto, "searchQuery"> {
  searchQuery: ISearchQueryDto;
}
