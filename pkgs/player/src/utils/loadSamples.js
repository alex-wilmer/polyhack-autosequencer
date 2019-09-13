import { range } from "lodash";
import load from "audio-loader";

let SAMPLES = 7;

export default async () => {
  let beats = await Promise.all(
    range(SAMPLES).map(x => load(`beats/32bars/${x + 1}.wav`))
  );

  return beats;
};
