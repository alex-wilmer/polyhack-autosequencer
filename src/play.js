import { ctx, sched } from "init";
import { SECONDS_PER_BEAT } from "config";
import load from "audio-loader";
import pulse from "clips/pulse";
import beat from "clips/beat";

const QUARTER_BEAT = SECONDS_PER_BEAT / 4;
const HALF_BEAT = SECONDS_PER_BEAT / 2;

let main = async () => {
  let beatBuffer = await load("beat.wav");

  let play = (clip, opts) => {
    // TODO: fix start / stop
    let playing;

    if (!playing) {
      sched.start(clip, opts);
      playing = true;
    } else {
      sched.stop();
      playing = false;
    }
  };

  document.body.onclick = async _ => {
    play(pulse, {
      ctx,
      sched,
      secondsPerBeat: SECONDS_PER_BEAT,
      attack: QUARTER_BEAT,
      release: QUARTER_BEAT
    });

    play(pulse, {
      ctx,
      sched,
      secondsPerBeat: SECONDS_PER_BEAT,
      delay: HALF_BEAT,
      attack: QUARTER_BEAT,
      release: QUARTER_BEAT
    });

    play(beat, {
      ctx,
      buffer: beatBuffer
    });
  };
};

main();
