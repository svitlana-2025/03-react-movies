import axios from "axios";
import type { Movie } from "../types/movie";


interface TmdbResponse {
    results: Movie[];
    total_pages: number;
}


const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2Q5ZDk1MTIzOTNmYzFlZjE4Njk3YjE5OGY0YmUxZCIsIm5iZiI6MTc1NzAwMjM5NS4wNjgsInN1YiI6IjY4YjliYTliZDgyNmM3ZDUwOTA2OGY1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhyXrJohbo24lgL5KZoGiZfS-5WeQQvLW5csHpZuxss`,
    },
});


export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const { data } = await apiClient.get<TmdbResponse>("/search/movie", {
        params: { query },
    });
    return data.results;
};