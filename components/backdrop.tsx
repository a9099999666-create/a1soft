"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BackdropProps = {
  live: boolean;
  label: string;
};

export function Backdrop({ live, label }: BackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!live || !video) return;

    let raf = 0;

    const play = () => {
      void video.play().catch(() => {});
    };

    const wrap = () => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      if (video.currentTime >= duration - 0.06) {
        video.currentTime = 0.03;
      }
    };

    const tick = () => {
      wrap();
      raf = requestAnimationFrame(tick);
    };

    const onReady = () => {
      setReady(true);
      play();
    };

    const onVis = () => {
      if (document.hidden) {
        video.pause();
        cancelAnimationFrame(raf);
        return;
      }
      play();
      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);
    video.addEventListener("ended", wrap);
    document.addEventListener("visibilitychange", onVis);

    if (video.readyState >= 2) onReady();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
      video.removeEventListener("ended", wrap);
      document.removeEventListener("visibilitychange", onVis);
      video.pause();
    };
  }, [live]);

  return (
    <div className="backdrop" role="img" aria-label={label}>
      <Image
        className="backdrop-media backdrop-poster"
        src="/visuals/hero-poster.jpg"
        alt=""
        fill
        sizes="100vw"
        unoptimized
        priority
      />
      {live ? (
        <video
          ref={videoRef}
          className={ready ? "backdrop-media is-ready" : "backdrop-media"}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/visuals/hero-loop.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="backdrop-veil" />
    </div>
  );
}
