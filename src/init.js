import WebAudioScheduler from "web-audio-scheduler";

let ctx = new AudioContext();
let sched = new WebAudioScheduler({ context: ctx });

export { ctx, sched };
