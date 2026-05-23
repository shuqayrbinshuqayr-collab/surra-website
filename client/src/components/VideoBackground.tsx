/**
 * VideoBackground — plays a video as a full-cover background.
 *
 * Uses <video src> directly without any fetch/CORS logic.
 * The browser follows the /manus-storage/ 307 redirect automatically
 * for media elements (no CORS preflight needed for video playback).
 */
import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export function VideoBackground({ src, opacity = 0.55, style }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = src;
    video.load();
    const play = () => video.play().catch(() => {});
    video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}
