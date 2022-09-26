import { useAppSelector } from "@/store";
import { getMusicUrl } from "@/service/music";

interface Singers {
  id: number;
  name: string;
  tns: [];
  alias: [];
}

export default function useMusicInfo() {
  const { currentMusic, musicList } = useAppSelector((state) => state.music);
  const { id, al, ar, name } = currentMusic;
  const url = id && getMusicUrl(id);

  let singers = "";
  ar &&
    ar.map((item: Singers, index: number) => {
      singers += item.name;
      singers += ar.length === index + 1 ? "" : "/";
    });

  return { al, singers, name, url, currentMusic, musicList };
}
