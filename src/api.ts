const API_KEY = 'ae452669a925a691eac59feff070d758';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail {
  adult: boolean;
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
}

export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface ITvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface ITvDetail {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
}

export function getMovies(): Promise<IGetMoviesResult> {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLatestMovie(): Promise<IMovie> {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedMovies(): Promise<IGetMoviesResult> {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovies(): Promise<IGetMoviesResult> {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(id: string): Promise<IMovieDetail> {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTvLatest(): Promise<ITv> {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTvAiringToday(): Promise<ITvResult> {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvPopular(): Promise<ITvResult> {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTvTopRated(): Promise<ITvResult> {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvDetail(id: string): Promise<ITvDetail> {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getSearchTv(query: string): Promise<ITvResult> {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}`).then(
    (response) => response.json()
  );
}

export function getSearchMovie(query: string): Promise<IGetMoviesResult> {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}`
  ).then((response) => response.json());
}
