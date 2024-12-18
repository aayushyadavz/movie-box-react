import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ name, poster, date }) => {
  return (
    <div className="w-40 cursor-pointer transition ease-in-out hover:translate-x hover:scale-110 duration-200">
      <img
        className="rounded-xl"
        alt="Movie Poster"
        src={IMG_CDN_URL + poster}
      />
      <p className="text-white line-clamp-1 font-semibold my-2">{name}</p>
      <p className="text-white text-xs">
        Date: <span className="text-yellow-300">{date}</span>
      </p>
    </div>
  );
};

export default MovieCard;
