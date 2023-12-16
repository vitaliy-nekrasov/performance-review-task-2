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