import { range } from "lodash";
import load from "audio-loader";

export default async () => {
  let _8BarBeats = await Promise.all(
    range(7).map(x => load(`beats/8bars/${x}.wav`))
  );

  let _32BarBeats = await Promise.all(
    range(0).map(x => load(`beats/32bars/${x}.wav`))
  );

  return {
    _8BarBeats,
    _32BarBeats
  };
};
