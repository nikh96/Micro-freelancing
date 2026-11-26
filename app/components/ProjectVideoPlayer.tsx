"use client";

import { useState, useRef } from "react";

interface Props {
  src?: string;
  title?: string;
}

export default function ProjectVideoPlayer({
  src = "/omni-ad.mp4",
  title = "Omni Video Generation Commercial",
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 50);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  return (
    <div className="pt-1">
      {/* Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={togglePlay}
        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 text-text-primary text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer"
        aria-label={isPlaying ? "Pause Video" : "Play Video"}
      >
        {isPlaying ? (
          <>
            <svg
              className="w-3.5 h-3.5 fill-current text-brand-red"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <span>Pause Video</span>
          </>
        ) : (
          <>
            <svg
              className="w-3.5 h-3.5 fill-current text-brand-red transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Video</span>
          </>
        )}
      </button>

      {/* Video Container: Appears smoothly only when Play is clicked */}
      {isPlaying && (
        <div className="mt-3.5 w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 bg-black/90 shadow-2xl transition-all duration-300">
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full aspect-video object-contain bg-black"
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}
    </div>
  );
}
