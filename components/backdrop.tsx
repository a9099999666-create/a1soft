"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type BackdropProps = {
  live: boolean;
  label: string;
};

export function Backdrop({ live, label }: BackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!live || !video) return;

    const play = () => void video.play().catch(() => {});
    const stop = () => video.pause();

    const onVis = () => {
      if (document.hidden) stop();
      else play();
    };

    play();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [live]);

  return (
    <div className="backdrop" role="img" aria-label={label}>
      {live ? (
        <video
          ref={videoRef}
          className="backdrop-media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/visuals/hero-poster.png?v=signal"
        >
          <source src="/visuals/hero-loop.mp4?v=signal" type="video/mp4" />
        </video>
      ) : (
        <Image
          className="backdrop-media"
          src="/visuals/hero-poster.png?v=signal"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          priority
        />
      )}
      <div className="backdrop-veil" />
    </div>
  );
}
