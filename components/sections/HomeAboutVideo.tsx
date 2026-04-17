"use client";

import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function HomeAboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden flex-shrink-0"
      style={{ aspectRatio: "709/921" }}
    >
      <video
        ref={videoRef}
        poster="/videos/about-hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      >
        <source src="/videos/about-hero.webm" type="video/webm" />
        <source src="/videos/about-hero.mp4" type="video/mp4" />
      </video>
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => void togglePlay()}
        >
          <div className="w-16 h-16 rounded-full bg-brand-bg/80 flex items-center justify-center">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <FontAwesomeIcon icon={faCirclePlay as any} className="text-brand-primary w-8 h-8" />
          </div>
        </div>
      )}
    </div>
  );
}
