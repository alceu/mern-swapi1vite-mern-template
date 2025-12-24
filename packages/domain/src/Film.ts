export interface IFilmProperties {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
}

export interface IFilm {
  uid: string;
  properties: IFilmProperties;
}

export interface IFilmDto extends IFilm {
  _id: string;
}
