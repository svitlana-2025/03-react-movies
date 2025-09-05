
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import styles from "./App.module.css";

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string): Promise<void> => {
        try {
            setMovies([]);
            setIsLoading(true);
            setError(false);
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error("No movies found for your request.");
            }
            setMovies(data);
        } catch {
            setError(true);
            toast.error("There was an error, please try again...");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectMovie = (movie: Movie): void => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = (): void => {
        setSelectedMovie(null);
    };

    return (
        <div className={styles.app}>
            <Toaster position="top-center" />
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;