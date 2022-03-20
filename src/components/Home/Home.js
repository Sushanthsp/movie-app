import React, { useEffect } from "react";
import "./home.scss";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies,fetchAsyncShows } from "../../features/movies/movieSlice";

function Home() {

  const dispatch = useDispatch();
  const movieSearch = "Harry";
  const showSearch = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieSearch))
    dispatch(fetchAsyncShows(showSearch))
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img">
        <MovieListing />
      </div>
    </div>
  );
}

export default Home;
