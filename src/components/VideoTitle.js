import React from "react";

const VideoTitle = ({ title, overview, releaseDate }) => {
  return (
    <div className="font-parkinsans pt-48 w-full pl-4">
      <h1 className="text-5xl font-semibold text-yellow-300">{title}</h1>
      <p className="text-sm my-3 text-white">{overview}</p>
      <p className="font-medium text-white">
        Release Date:{" "}
        <span className="ml-1 text-yellow-300">{releaseDate}</span>
      </p>
    </div>
  );
};

export default VideoTitle;
