import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopratedMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const data = await response.json();
    console.log(data);

    dispatch(addTopRatedMovies(data.results)); // adding results array in redux store
  };

  useEffect(() => {
    getTopratedMovies();
    // eslint-disable-next-line
  }, []);
};

export default useTopRatedMovies;
