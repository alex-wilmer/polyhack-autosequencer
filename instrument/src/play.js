import io from "socket.io-client";
import { note } from "@tonaljs/tonal";
import { sample } from "lodash";
import load from "audio-loader";
import pulse from "clips/pulse";
import sampler from "patches/sampler";
import synth from "patches/synth";
import octify from "utils/octify";
import { SIXTEENTH_NOTE, EIGHTH_NOTE, QUARTER_NOTE, WHOLE_NOTE, WAVE_SHAPES } from "config";
import { ctx, sched } from "init";

  // let socket = io("https://782aad82.ngrok.io");

  // socket.on("x", e => {
  //   console.log("user coordinates", e);
  // });

  // document.body.addEventListener("touchstart", e => {
  //   socket.emit("touchstart", "test");
  // });
  // document.body.addEventListener("touchmove", e => {
  //   socket.emit("x", "test");
  // });
  // document.body.addEventListener("touchend", e => {
  //   socket.emit("x", "test");
  // });
  // document.body.addEventListener("touchcancel", e => {
  //   socket.emit("x", "test");
  // });

let main = async () => {
  let beatBuffer = await load("beat.wav");

  let currentBeat = 1
  let incrementBeat = () => currentBeat++

  document.body.onclick = _ => {
    sched.start(
      pulse({
        sched,
        repeat: () => {
          incrementBeat()
          return QUARTER_NOTE
        },
      })
    )

    sched.start(
      pulse({
        sched,
        repeat: () => sample([QUARTER_NOTE, EIGHTH_NOTE, SIXTEENTH_NOTE]),
        patch: synth({
          ctx,
          type: () => sample(WAVE_SHAPES),
          frequency: () => sample(octify(note('F1').freq, 5)),
          volume: () => 0.5,
          attack: () => sample([0.1, 0.2, 0.3]),
          release: () => sample([EIGHTH_NOTE]),
        })
      })
    );

    sched.start(pulse({
      sched,
      repeat: () => WHOLE_NOTE * 8,
      patch: sampler({
        ctx,
        buffer: beatBuffer
      })
    }));
  };
};

main();
