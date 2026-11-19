"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroVisualProps = {
  live: boolean;
  label: string;
};

export function HeroVisual({ live, label }: HeroVisualProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!live || !video || !root) return;

    const sync = (visible: boolean) => {
      if (visible) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { threshold: 0.12 },
    );
    io.observe(root);

    const onVis = () => sync(!document.hidden && isInView(root));
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      video.pause();
    };
  }, [live]);

  return (
    <div
      ref={rootRef}
      className="hero-visual"
      role="img"
      aria-label={label}
    >
      <Image
        className="hero-poster"
        src="/visuals/hero-poster.png"
        alt=""
        fill
        sizes="100vw"
        unoptimized
        priority
        draggable={false}
      />
      {live ? (
        <video
          ref={videoRef}
          className={videoReady ? "hero-loop is-ready" : "hero-loop"}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/visuals/hero-poster.png"
          onPlaying={() => setVideoReady(true)}
          aria-hidden
        >
          <source src="/visuals/hero-loop.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

function isInView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}
