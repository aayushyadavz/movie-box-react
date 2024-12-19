import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ name, poster, date }) => {
  return (
    <div className="w-24 sm:w-36 md:w-40 cursor-pointer transition ease-in-out hover:translate-x hover:scale-110 duration-200">
      <img
        className="rounded-xl"
        alt="Movie Poster"
        src={IMG_CDN_URL + poster}
      />
      <p className="text-white line-clamp-1 font-semibold sm:my-2 my-1">
        {name}
      </p>
      <p className="text-white text-[9px] sm:text-xs">
        Date: <span className="text-yellow-300">{date}</span>
      </p>
    </div>
  );
};

// Higher Order Component
const withRatingLabel = (MovieCard) => {
  return (props) => {
    const { rating } = props;

    return (
      <div className="relative">
        <label className="absolute top-0 m-2 bg-black bg-opacity-50 rounded text-white px-1 shadow-md">
          <i className="fa-solid fa-star mr-1 text-yellow-300"></i>
          {rating.toFixed(1)}
        </label>
        <MovieCard {...props} />
      </div>
    );
  };
};

export default MovieCard;
export { withRatingLabel };
