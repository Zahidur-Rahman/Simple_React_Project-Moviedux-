import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchList = (movieId) => {
    setWatchList(
      (prev) =>
        prev.includes(movieId)
          ? prev.filter((id) => id !== movieId)
          : [...prev, movieId] //callback function of filter method
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/watchlist">Watch List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>

            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchList={watchList}
                  movies={movies}
                  toggleWatchList={toggleWatchList}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
