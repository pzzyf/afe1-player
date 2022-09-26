import { AppDispatch } from "..";
import { getLike, getLyric } from "@/service/music";
import { changeMusicList, changeCurrentMusic, changeCurrentLyric } from ".";

// 第一次
export const fetchHotRecommend = () => async (dispatch: AppDispatch) => {
  const {
    playlist: { tracks },
  } = await getLike();
  // 给歌曲对象上添加index下标
  for (let i = 0; i < tracks.length; i++) {
    tracks[i]["index"] = i;
  }
  // 保存
  dispatch(changeMusicList(tracks));
  // 默认当前歌曲是第一个对象
  dispatch(changeCurrentMusic(tracks[1]));
  // 获取并修改currentLyric歌词
  dispatch(fetchLyric(tracks[1].id));
};

// 根据id获取歌词
export const fetchLyric = (id: number) => async (dispatch: AppDispatch) => {
  const {
    lrc: { lyric },
  } = await getLyric(id);
  dispatch(changeCurrentLyric(lyric));
};
