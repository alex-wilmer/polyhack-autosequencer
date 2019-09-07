let playing;

export default ({ sched, clip, secondsPerBeat }) => {
  if (!playing) {
    // DOWNBEATS
    sched.start(clip, { delay: 0 });
    // UPBEATS
    sched.start(clip, { delay: secondsPerBeat / 2 });
    playing = true;
  } else {
    sched.stop();
    playing = false;
  }
};
