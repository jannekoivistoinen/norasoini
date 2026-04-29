"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export default function HomeAboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);

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
    <div>
      <div className="relative px-0 sm:px-8 md:px-16 lg:px-24 aspect-video overflow-hidden rounded-2xl">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="metadata"
          onPlay={() => {
            setPlaying(true);
            setHasUserStarted(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src="/videos/about-hero.webm" type="video/webm" />
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        {hasUserStarted && (
          <>
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 z-[9] bg-black/20 transition-opacity duration-300 ease-out",
                playing ? "opacity-0" : "opacity-100",
              )}
            />
            {playing ? (
              <button
                type="button"
                aria-label="Pause video"
                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                onClick={() => void togglePlay()}
              />
            ) : (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                onClick={() => void togglePlay()}
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-brand-bg/80 flex items-center justify-center">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <FontAwesomeIcon
                    icon={faCirclePlay as any}
                    className="text-brand-primary w-8 h-8"
                  />
                </div>
              </div>
            )}
          </>
        )}
        {!playing && !hasUserStarted && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            onClick={() => void togglePlay()}
          >
            <Image
              src="/videos/about-hero-poster.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-[101%] transition-transform duration-500"
              priority
              fetchPriority="high"
            />
            <div className="relative z-10 w-16 h-16 rounded-full bg-brand-bg/80 flex items-center justify-center">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <FontAwesomeIcon
                icon={faCirclePlay as any}
                className="text-brand-primary w-8 h-8"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
