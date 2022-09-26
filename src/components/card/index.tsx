import React, { memo, useEffect, useState } from "react";
import { PanWrapper, CardWrapper } from "./style";
import { fetchHotRecommend } from "@/store/music";
import useMusicInfo from "./hooks/useMusic";
import useLyric from "./hooks/useLyric";
import useAudio, { InitValue } from "./hooks/useAudio";
import Slider from "../slider";

import { useAppDispatch } from "@/store";

const Card = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHotRecommend());
  }, [dispatch]);

  const [active, setactive] = useState(false);

  const {
    al,
    singers,
    name: songName,
    url,
    currentMusic,
    musicList,
  } = useMusicInfo();

  const { updateTime, currentLyricIndex, lyricList, lyricBox } = useLyric();

  const {
    switchMusic,
    isPlaying,
    setPlaying,
    audioRef,
    setVolume,
    volume,
    duration,
    canplay,
  } = useAudio(musicList, currentMusic);

  const handleValue = (e: any) => {
    setVolume(e);
  };

  const onTimeSliderChange = (e: any) => {
    const time = (duration * e).toFixed();
    updateTime(time, true);
    audioRef.current && (audioRef.current.currentTime = parseInt(time) / 1000);
  };

  const timePercent = ((audioRef.current?.currentTime ?? 0) * 1000) / duration;

  let volumeValue = volume;
  // useEffect(() => {
  //   console.log(typeof singers);
  // });
  return (
    <>
      <PanWrapper className={active ? "active" : "deactive"}>
        <div
          className={
            "w-80px h-80px rounded-full p-13px bg-pan img-pan " +
            (isPlaying ? "" : "pause")
          }
          onClick={() => setactive(!active)}
        >
          <img className="rounded-full" src={al?.picUrl} />
        </div>
        <audio
          src={url}
          ref={audioRef}
          onTimeUpdate={(e) => updateTime(e)}
          onEnded={() => switchMusic("next")}
          onError={() => switchMusic("next")}
          onCanPlay={(e) => canplay(e)}
        />
      </PanWrapper>
      <CardWrapper
        className={active ? "active" : ""}
        style={{
          backgroundImage: `url(${al?.picUrl})`,
        }}
      >
        {[5, 10, 2].map((item) => {
          <img
            key={item}
            src={al?.picUrl}
            className={`blur-${item}px absolute rounded-md h-full w-full`}
          ></img>;
        })}
        <div className="w-250px flex flex-col items-center h-full z-50">
          <div className="h-40px text-15px text-center text-white leading-60px mb-20px z-55">
            {songName}
          </div>
          <p className="h-40px text-12px text-center text-[hsla(0,0%,100%,.6)] leading-20px mb-20px w-140px ">
            歌手：{singers}
          </p>
          <div className="flex-1 overflow-hidden relactive px-15px">
            <div ref={lyricBox}>
              {lyricList.map((item, index) => (
                <p
                  className={
                    "text-12px text-center leading-[1.5] text-[hsla(0,0%,100%,.6)]" +
                    (currentLyricIndex === index ? "active-lyric" : "")
                  }
                  key={item.time + item.content}
                >
                  {item.content}
                </p>
              ))}
            </div>
          </div>
          <div className="h-40px w-300px flex items-center">
            <div onClick={() => setPlaying()} className="icon ml-5px">
              {isPlaying ? (
                <i className="iconfont icon-pause text-[13px]" />
              ) : (
                <i className="iconfont icon-play text-[13px]" />
              )}
            </div>
            <div className="w-240px px-15px flex justify-center">
              <Slider
                direction="row"
                initialValue={0}
                change={(percent) => onTimeSliderChange(percent)}
                value={timePercent}
              />
            </div>
            <div className="icon mr-5px relative">
              <i className="iconfont icon-laba volume-slider-hover" />
              <div className="absolute h-80px py-10px px-10px flex flex-col items-center bottom-20px opacity-0 hover:opacity-100">
                <Slider
                  direction="col"
                  initialValue={InitValue}
                  value={volumeValue}
                  change={(percent) => handleValue(percent)}
                />
              </div>
            </div>
          </div>
        </div>

        <i
          className="iconfont icon-left arrow left-5px"
          onClick={() => switchMusic("pre")}
        />
        <i
          className="iconfont icon-right arrow right-5px"
          onClick={() => switchMusic("next")}
        />
      </CardWrapper>
    </>
  );
});

export default Card;
