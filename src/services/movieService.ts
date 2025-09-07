
import axios from "axios";
import type { Movie } from "../types/movie";

// Інтерфейс для відповіді від TMDB API
interface TmdbResponse {
    results: Movie[];
    total_pages: number;
}

// Створюємо екземпляр axios з базовими налаштуваннями
const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2Q5ZDk1MTIzOTNmYzFlZjE4Njk3YjE5OGY0YmUxZCIsIm5iZiI6MTc1NzAwMjM5NS4wNjgsInN1YiI6IjY4YjliYTliZDgyNmM3ZDUwOTA2OGY1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhyXrJohbo24lgL5KZoGiZfS-5WeQQvLW5csHpZuxss`,
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


