'use client';
import { RefObject, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

type VideoProps = {
  src: string;
};

export const Video = ({ src }: VideoProps) => {
  const playerRef = useRef<HTMLVideoElement>();

  return (
    <ReactHlsPlayer
      playerRef={playerRef as RefObject<HTMLVideoElement>}
      src={src}
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
    />
  );
};
