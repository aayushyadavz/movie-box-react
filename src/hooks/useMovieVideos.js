import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addtrailerVideos } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

// fetching the trailer video and updating the store with youtube video key
const useMovieVideos = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();

    const filterData = data.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : data.results; // If there are multiple types with a trailer, then the trailer is equal to the first trailer; otherwise, it is the first object from that array.
    dispatch(addtrailerVideos(trailer.key));
  };

  useEffect(() => {
    getMovieVideos();
    // eslint-disable-next-line
  }, []);
};

export default useMovieVideos;
