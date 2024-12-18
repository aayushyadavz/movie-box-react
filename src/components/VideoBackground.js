import React from "react";
import { useSelector } from "react-redux";
import useMovieVideos from "../hooks/useMovieVideos";

const VideoBackground = ({ movieId }) => {
  const trailerKey = useSelector((store) => store.movies?.trailerVideos);

  useMovieVideos(movieId); // coustom hook

  return (
    <div className="pt-28 w-full p-6">
      <iframe
        className="w-full aspect-video rounded-xl pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
