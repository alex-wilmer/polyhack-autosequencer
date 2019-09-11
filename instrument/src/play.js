import io from "socket.io-client";
import { note } from "@tonaljs/tonal";
import { sample, range } from "lodash";
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
  let playing = false;
  let beatBuffers = await Promise.all(range(7).map(x => load(`beats/${x}.wav`)));
  let currentBeat = 0
  let incrementBeat = () => currentBeat++

  document.body.onclick = _ => {
    if (!playing) {
      playing = true;

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
          patch: () => synth({
            ctx,
            type: () => sample(WAVE_SHAPES),
            frequency: () => sample(octify(note(currentBeat % 32 < 16 ? 'F1' : sample(['Ab1', 'Bb1', 'Eb1'])).freq, 5)),
            volume: () => 0.5,
            attack: () => sample([0.1]),
            release: () => sample([QUARTER_NOTE]),
          })
        })
      );

      sched.start(pulse({
        sched,
        repeat: () => WHOLE_NOTE * 8,
        patch: () => sampler({
          ctx,
          buffer: () => sample(beatBuffers) 
        })
      }));
    } else {
      sched.stop(true)
      playing = false;
    }
  };
};

main();
