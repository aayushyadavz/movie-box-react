import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-yellow-300 font-semibold px-5 pt-8 pb-0">
        {title} ({movies.length})
      </h1>
      <div className="flex overflow-x-scroll custom-scrollbar">
        <div className="flex gap-3 px-5 py-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              name={movie.title}
              poster={movie.poster_path}
              date={movie.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
