import { sample } from "lodash";
import synth from "synth";
import octify from "utils/octify";
import { WAVE_SHAPES } from "config";

let pulse = e => {
  e.args.sched.insert(
    e.args.delay ? e.playbackTime + e.args.delay : e.playbackTime,
    synth({
      ctx: e.args.ctx,
      type: sample(WAVE_SHAPES),
      attack: e.args.attack,
      release: e.args.release,
      frequency: sample(octify(80, 3))
    })
  );

  e.args.sched.insert(e.playbackTime + e.args.secondsPerBeat, pulse, e.args);
};

export default pulse;
