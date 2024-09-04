import axios, { AxiosResponse } from "axios";
import { RootInterface, Result } from "../models/models";

const API_KEY = "630bad0f090cd848fcec8ebe6943deeb";
const baseURL = "https://api.themoviedb.org/3/";

export async function getTrendingMovies(page: number): Promise<Result[]> {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzBiYWQwZjA5MGNkODQ4ZmNlYzhlYmU2OTQzZGVlYiIsIm5iZiI6MTcyNTQ1MTYzNi45NTAxLCJzdWIiOiI2NmQ4NGJiMzMyMjE1NmQ0MWE5ZDJjNGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iMSHIiBP9MxkTrzAeqVevxMoI7e7_yavJ1tyomH0Hjo",
    },
  };
  const resp: AxiosResponse<RootInterface> = await axios.get(
    `${baseURL}/movie/popular?&language=en-US&page=${page}`, options
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