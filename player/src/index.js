import WebAudioScheduler from "web-audio-scheduler";
import loadSamples from "utils/loadSamples";
import play from "./play";

let ctx = new AudioContext();
let sched = new WebAudioScheduler({ context: ctx });

let main = async () => {
  let { _8BarBeats } = await loadSamples();

  let currentBeat = 0;
  let incrementBeat = () => currentBeat++;
  let getCurrentBeat = () => currentBeat;

  document.body.onclick = () => {
    play({
      ctx,
      sched,
      handleTimelineProgress: incrementBeat,
      getCurrentBeat,
      _8BarBeats
    });
  };
};

main();
