import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const data = await response.json();
    console.log(data);

    dispatch(addPopularMovies(data.results)); // adding results array in redux store
  };

  useEffect(() => {
    getPopularMovies();
    // eslint-disable-next-line
  }, []);
};

export default usePopularMovies;
