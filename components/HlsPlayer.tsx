"use client";
import Hls from "hls.js";
import React, { useRef, useEffect } from "react";

export default function HlsPlayer({ src, sub }: { src: string; sub?: string }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls() as Hls;
      hls.attachMedia(video);
      hls.loadSource(src);
      hls.on(Hls.Events.ERROR, (event, error) => {
        console.error("HLS.js error");
      });

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    } else {
      console.warn("This browser does not support HLS playback.");
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls={true}
      width="100%"
      height="100%"
      crossOrigin="anonymous"
    >
      <track kind="subtitles" src={sub} label="English subtitles" default />
    </video>
  );
}
