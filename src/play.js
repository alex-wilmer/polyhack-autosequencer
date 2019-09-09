import { ctx, sched } from "init";
import { SECONDS_PER_BEAT, WAVE_SHAPES } from "config";
import { sample } from "lodash";
// import load from "audio-loader";
import pulse from "clips/pulse";
// import beat from "patches/beat";
import synth from "patches/synth";
import octify from "utils/octify";

const QUARTER_BEAT = SECONDS_PER_BEAT / 4;
const HALF_BEAT = SECONDS_PER_BEAT / 2;

let main = async () => {
  // let beatBuffer = await load("beat.wav");

  document.body.onclick = _ => {
    sched.start(
      pulse({
        sched,
        patch: synth({
          type: sample(WAVE_SHAPES),
          frequency: sample(octify(80, 3)),
          ctx,
          secondsPerBeat: SECONDS_PER_BEAT,
          attack: QUARTER_BEAT,
          release: QUARTER_BEAT
        })
      })
    );

    sched.start(
      pulse({
        sched,
        delay: HALF_BEAT,
        patch: synth({
          ctx,
          type: sample(WAVE_SHAPES),
          frequency: sample(octify(80, 3)),
          secondsPerBeat: SECONDS_PER_BEAT,
          attack: QUARTER_BEAT,
          release: QUARTER_BEAT
        })
      })
    );

    // play(beat, {
    //   ctx,
    //   buffer: beatBuffer
    // });
  };
};

main();
