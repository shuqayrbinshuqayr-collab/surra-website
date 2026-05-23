/**
 * VideoBackground — resolves /manus-storage/ redirect to a direct signed URL
 * then sets it as the video src to avoid CORS issues with range requests.
 */
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;           // /manus-storage/... path
  opacity?: number;
  style?: React.CSSProperties;
}

export function VideoBackground({ src, opacity = 0.3, style }: VideoBackgroundProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    // Follow the 307 redirect to get the actual signed CloudFront URL
    fetch(src, { method: "HEAD", redirect: "follow" })
      .then((res) => {
        // res.url is the final URL after following redirects
        if (res.ok && res.url && res.url !== src) {
          setResolvedSrc(res.url);
        } else {
          // fallback: try direct
          setResolvedSrc(src);
        }
      })
      .catch(() => {
        setResolvedSrc(src);
      });
  }, [src]);

  if (!resolvedSrc) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        ...style,
      }}
    >
      <source src={resolvedSrc} type="video/mp4" />
    </video>
  );
}
