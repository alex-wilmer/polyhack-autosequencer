import { ctx, sched } from "init";
import { SECONDS_PER_BEAT } from "config";
import load from "audio-loader";
import pulse from "clips/pulse";
import beat from "clips/beat";

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

  document.body.onclick = _ => {
    play(pulse, {
      ctx,
      sched,
      secondsPerBeat: SECONDS_PER_BEAT,
      attack: SECONDS_PER_BEAT / 4,
      release: SECONDS_PER_BEAT / 4
    });

    play(pulse, {
      ctx,
      sched,
      secondsPerBeat: SECONDS_PER_BEAT,
      delay: SECONDS_PER_BEAT / 2,
      attack: SECONDS_PER_BEAT / 4,
      release: SECONDS_PER_BEAT / 4
    });

    play(beat, {
      ctx,
      buffer: beatBuffer
    });
  };
};

main();
