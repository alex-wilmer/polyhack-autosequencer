import WebAudioScheduler from "web-audio-scheduler";
import loadSamples from "utils/loadSamples";
import play from "./play";

export let ctx = new AudioContext();
export let sched = new WebAudioScheduler({ context: ctx });

let main = async () => {
  let beats = await loadSamples();

  let currentBeat = 0;
  let incrementBeat = () => currentBeat++;
  let getCurrentBeat = () => currentBeat;

  document.body.onclick = () => {
    play({
      ctx,
      sched,
      handleTimelineProgress: incrementBeat,
      getCurrentBeat,
      beats
    });
  };
};

main();
