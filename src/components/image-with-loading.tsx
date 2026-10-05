"use client";

import { useState } from "react";

type ImageWithLoadingProps = {
  src: string;
  alt?: string;
};

export function ImageWithLoading({
  src,
  alt = "",
}: ImageWithLoadingProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-loader ${loaded ? "is-loaded" : ""}`}>
      {!loaded && <div className="image-skeleton" />}

      <img
        src={src}
        alt={alt}
        className="image-loader-content"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}