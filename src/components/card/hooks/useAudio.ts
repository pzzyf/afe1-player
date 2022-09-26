import { changeCurrentMusic, fetchLyric } from "@/store/music";
import { useAppDispatch } from "@/store";
import { useRef, useState, useEffect, SyntheticEvent } from "react";

export const InitValue = 0.66;
export default function useDuration(musicList: any[], currentMusic: any) {
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(InitValue);

  const audioRef = useRef<HTMLAudioElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const setPlaying = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const switchMusic = async (type: "pre" | "next") => {
    let currentIndex = currentMusic.index;
    currentIndex += type === "pre" ? -1 : 1;
    if (currentIndex < 0) currentIndex = musicList.length - 1;
    if (currentIndex === currentIndex.length) currentIndex = 0;
    const Music = musicList[currentIndex];
    dispatch(changeCurrentMusic(Music));
    dispatch(fetchLyric(Music.id));
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };

  const canplay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    // 修改duration
    setDuration((e.target as HTMLAudioElement).duration * 1000);
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  };
  return {
    duration,
    setDuration,
    canplay,
    volume,
    isPlaying,
    switchMusic,
    setPlaying,
    audioRef,
    setVolume,
  };
}
