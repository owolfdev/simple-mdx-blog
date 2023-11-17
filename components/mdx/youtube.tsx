import React from "react";

const YouTube = ({ videoId }: { videoId: string }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      width="560"
      height="315"
      src={videoSrc}
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};

export default YouTube;
