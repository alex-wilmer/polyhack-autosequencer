import WebAudioScheduler from "web-audio-scheduler";
import { sample, range } from "lodash";
import trigger from "./trigger";

const SECONDS_PER_BEAT = 60.0 / 127;
const waveShapes = ["square", "sin", "sawtooth", "triangle"];

let ctx = new AudioContext();
let sched = new WebAudioScheduler({ context: ctx });

let octify = (freq, numOctaves) => range(1, numOctaves).map(x => freq * x);

let pulse = e => {
  sched.insert(
    e.args.delay ? e.playbackTime + e.args.delay : e.playbackTime,
    trigger({
      ctx,
      type: sample(waveShapes),
      attack: SECONDS_PER_BEAT / 2,
      release: SECONDS_PER_BEAT / 2,
      frequency: sample(octify(60, 3))
    })
  );

  sched.insert(e.playbackTime + SECONDS_PER_BEAT, pulse, e.args);
};

let song = (() => {
  let playing;
  return () => {
    if (!playing) {
      // DOWNBEATS
      sched.start(pulse, { delay: 0 });
      // UPBEATS
      sched.start(pulse, { delay: SECONDS_PER_BEAT / 2 });
      playing = true;
    } else {
      sched.stop();
      playing = false;
    }
  };
})();

document.body.onclick = _ => song();

export default () => null;
