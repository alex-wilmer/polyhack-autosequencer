import WebAudioScheduler from "web-audio-scheduler";
import { sample, range } from "lodash";

const SECONDS_PER_BEAT = 60.0 / 127;

let ctx = new AudioContext();
let sched = new WebAudioScheduler({ context: ctx });

let trigger = ({
  type = "sin",
  attack = 0,
  release = 0,
  frequency = 1000
}) => e => {
  let t = e.playbackTime;
  let gain = ctx.createGain();

  if (attack || release) {
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(1, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.01, t + attack + release);
    gain.gain.setValueAtTime(0, t + attack + release + 0.1);
  }

  gain.connect(ctx.destination);

  let osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  osc.start(t);

  return { osc, gain };
};

let octify = (freq, numOctaves) => [
  freq,
  ...range(numOctaves).map(x => freq * (x + 1))
];

let randomNote = notes => sample(notes);

let pulse = e => {
  sched.insert(
    e.args.delay ? e.playbackTime + e.args.delay : e.playbackTime,
    trigger({
      type: "square",
      attack: SECONDS_PER_BEAT / 2,
      release: SECONDS_PER_BEAT / 2,
      frequency: randomNote(octify(60, 3))
    })
  );

  sched.insert(e.playbackTime + SECONDS_PER_BEAT, pulse, e.args);
};

let playing = false;
document.body.onclick = () => {
  if (!playing) {
    sched.start(pulse, { delay: 0 });
    sched.start(pulse, { delay: SECONDS_PER_BEAT / 2 });
    playing = true;
  } else {
    sched.stop();
    playing = false;
  }
};

export default () => null;
