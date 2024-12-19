import React from "react";

const VideoTitle = ({ title, overview, releaseDate }) => {
  return (
    <div className="font-parkinsans pt-20 sm:pt-32 w-full pl-4 pr-4 md:pr-0">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold text-yellow-300">
        {title}
      </h1>
      <p className="text-[9px] sm:text-xs md:text-sm my-2 sm:my-3 text-white opacity-75">
        {overview}
      </p>
      <p className="text-[10px] sm:text-sm md:text-lg font-medium text-white">
        Release Date:{" "}
        <span className="ml-1 text-yellow-300">{releaseDate}</span>
      </p>
    </div>
  );
};

export default VideoTitle;
