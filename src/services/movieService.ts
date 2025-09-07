
import axios from "axios";
import type { Movie } from "../types/movie";

interface TmdbResponse {
    results: Movie[];
    total_pages: number;
}

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
});

/**
 * Функція для пошуку фільмів за ключовим словом.
 * @param query - Рядок для пошуку.
 * @returns Проміс, що повертає масив фільмів.
 */
export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const { data } = await apiClient.get<TmdbResponse>("/search/movie", {
        params: { query },
    });
    return data.results;
};


