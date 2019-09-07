import { sample, range } from "lodash";
import { sched, ctx } from "init";
import trigger from "trigger";
import song from "song";
import { SECONDS_PER_BEAT } from "./config";

const waveShapes = ["square", "sine", "sawtooth", "triangle"];

let octify = (freq, numOctaves) => range(1, numOctaves).map(x => freq * x);

let pulse = e => {
  sched.insert(
    e.args.delay ? e.playbackTime + e.args.delay : e.playbackTime,
    trigger({
      ctx,
      type: sample(waveShapes),
      attack: SECONDS_PER_BEAT / 2,
      release: SECONDS_PER_BEAT / 2,
      frequency: sample(octify(80, 3))
    })
  );

  sched.insert(e.playbackTime + SECONDS_PER_BEAT, pulse, e.args);
};

document.body.onclick = _ =>
  song({ sched, clip: pulse, secondsPerBeat: SECONDS_PER_BEAT });

export default () => null;
