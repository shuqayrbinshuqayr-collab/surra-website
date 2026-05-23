/**
 * VideoBackground — resolves /manus-storage/ signed URL then plays video.
 *
 * Strategy:
 * 1. Use fetch GET with Range:bytes=0-0 to follow the 307 redirect.
 *    resp.url gives us the final CloudFront signed URL.
 * 2. Set that signed URL directly on <video src> WITHOUT crossOrigin attribute.
 *    This avoids CORS issues since CloudFront doesn't send ACAO headers.
 */
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;           // /manus-storage/... path
  opacity?: number;
  style?: React.CSSProperties;
}

export function VideoBackground({ src, opacity = 0.3, style }: VideoBackgroundProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>("");
  const resolvedRef = useRef<string>("");

  useEffect(() => {
    // Reset when src changes
    setResolvedSrc("");
    resolvedRef.current = "";

    let cancelled = false;

    (async () => {
      try {
        // GET with Range follows 307 redirect; resp.url = final CloudFront URL
        const resp = await fetch(src, {
          method: "GET",
          headers: { Range: "bytes=0-0" },
          redirect: "follow",
        });
        if (cancelled) return;

        const finalUrl = resp.url;
        if (finalUrl && finalUrl !== src && !finalUrl.startsWith(window.location.origin)) {
          resolvedRef.current = finalUrl;
          setResolvedSrc(finalUrl);
        } else {
          // Fallback: use original path (same-origin, no CORS issue)
          resolvedRef.current = src;
          setResolvedSrc(src);
        }
      } catch {
        if (!cancelled) {
          resolvedRef.current = src;
          setResolvedSrc(src);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [src]);

  if (!resolvedSrc) return null;

  return (
    <video
      key={resolvedSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // NO crossOrigin attribute — lets browser fetch CloudFront without CORS preflight
      src={resolvedSrc}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
