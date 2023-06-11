import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL =
  "http://www.omdbapi.com?apikey=" + process.env.REACT_APP_API_URL;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Sherlock Holmes");
  }, []);

  return (
    <div className="app">
      <h1>KayaMovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      <div className="footer">
        <div>
          <span>
            Created by
            <a
              href="https://kayacuneyt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cüneyt Kaya
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
