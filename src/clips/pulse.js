import { sample } from "lodash";
import synth from "synth";
import octify from "utils/octify";
import { WAVE_SHAPES } from "config";

let pulse = e => {
  e.args.sched.insert(
    e.args.delay ? e.playbackTime + e.args.delay : e.playbackTime,
    synth({
      type: sample(WAVE_SHAPES),
      frequency: sample(octify(80, 3)),
      ...e.args
    })
  );

  e.args.sched.insert(e.playbackTime + e.args.secondsPerBeat, pulse, e.args);
};

export default pulse;
