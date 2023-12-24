import axios, { AxiosResponse } from "axios";
import { RootInterface, Result } from "../models/models";

const API_KEY = "1c308592d719c7668d47adc63622f209";
const baseURL = "https://api.themoviedb.org/3/";

export async function getTrendingMovies(): Promise<Result[]> {
  const resp: AxiosResponse<RootInterface> = await axios.get(
    `${baseURL}trending/movie/week?api_key=${API_KEY}`
  );
  const result: Result[] = await resp.data.results;
  return result;
}

export async function getMoviesById(id: string | undefined) {
  const resp = await axios.get(`${baseURL}movie/${id}?api_key=${API_KEY}`);
  const result = await resp.data;
  return result;
}

export async function getMoviesCast(id: string | undefined) {
  const resp = await axios.get(
    `${baseURL}movie/${id}/credits?api_key=${API_KEY}`
  );
  const result = await resp.data.cast;
  return result;
}

export async function getMoviesReviews(id: string | undefined) {
  const resp = await axios.get(
    `${baseURL}movie/${id}/reviews?api_key=${API_KEY}`
  );
  const result = await resp.data.results;
  return result;
}