import React from 'react';

const VideoPlayer = ({ videoSrc, poster, controls = true }) => {
  return (
    <div className="max-w-2xl mx-auto ">
      <video
        className="w-full rounded-lg "
        controls={controls}
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
