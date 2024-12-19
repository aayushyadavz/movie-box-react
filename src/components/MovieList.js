import React from "react";
import MovieCard, { withRatingLabel } from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const MovieCardWithRating = withRatingLabel(MovieCard);

  return (
    movies && (
      <div>
        <h1 className="text-xs sm:text-base text-yellow-300 font-semibold px-5 sm:pt-6 pt-3 pb-0">
          {title} ({movies.length})
        </h1>
        <div className="flex overflow-x-scroll custom-scrollbar">
          <div className="flex gap-3 px-5 py-4 sm:py-7 md:py-8">
            {movies?.map((movie) =>
              title === "Top Rated" ? (
                <MovieCardWithRating
                  key={movie.id}
                  name={movie.title}
                  poster={movie.poster_path}
                  date={movie.release_date}
                  rating={movie.vote_average}
                />
              ) : (
                <MovieCard
                  key={movie.id}
                  name={movie.title}
                  date={movie.release_date}
                  poster={movie.poster_path}
                />
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
