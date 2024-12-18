import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return; // To avoid error for the next line

  const randomIndex = Math.floor(Math.random() * movies.length);
  const mainMovie = movies[randomIndex];

  const { original_title, overview, release_date, id } = mainMovie;
  return (
    <div className="flex flex-col md:flex-row w-screen">
      <div className="md:w-1/2 bg-gradient-to-b from-black">
        <VideoTitle
          title={original_title}
          overview={overview}
          releaseDate={release_date}
        />
      </div>
      <div className="md:w-1/2 md:bg-gradient-to-b from-black">
        <VideoBackground movieId={id} />
      </div>
    </div>
  );
};

export default MainContainer;
