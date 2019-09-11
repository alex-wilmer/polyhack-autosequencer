// import io from "socket.io-client";
import { sample, range } from "lodash";
import load from "audio-loader";
import fire from "utils/fire";
import sampler from "vst/sampler";
import { NOTE_LENGTHS } from "config";
import { ctx, sched } from "init";
import spacey from "vst/synth/patches/spacey";

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
  let beatBuffers = await Promise.all(
    range(7).map(x => load(`beats/${x}.wav`))
  );

  global.currentBeat = 0;
  let incrementBeat = () => global.currentBeat++;
  let getCurrentBeat = () => global.currentBeat;

  document.body.onclick = _ => {
    if (!playing) {
      playing = true;

      fire({
        sched,
        repeat: () => {
          incrementBeat();
          return NOTE_LENGTHS[4];
        }
      });

      fire({
        ctx,
        sched,
        patch: spacey,
        getCurrentBeat,
        repeat: () =>
          sample([NOTE_LENGTHS[4], NOTE_LENGTHS[8], NOTE_LENGTHS[16]])
      });

      fire({
        sched,
        repeat: () => NOTE_LENGTHS[1] * 8,
        patch: () =>
          sampler({
            ctx,
            buffer: () => sample(beatBuffers)
          })
      });
    } else {
      sched.stop(true);
      playing = false;
    }
  };
};

main();
