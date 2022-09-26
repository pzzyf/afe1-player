import { request_util } from "..";

export function getLike() {
  return request_util.get({
    url: "playlist/detail?id=3778678",
  });
}

export function getLyric(id: number) {
  return request_util.get({
    url: "/lyric",
    params: {
      id,
    },
  });
}

export function getMusic(ids: number) {
  return request_util.get({
    url: "./song/detail",
    params: {
      ids,
    },
  });
}

export function getMusicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
