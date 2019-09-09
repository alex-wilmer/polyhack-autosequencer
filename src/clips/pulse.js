let pulse = ({ sched, delay, patch }) => e => {
  sched.insert(delay ? e.playbackTime + delay : e.playbackTime, patch);

  // e.args.sched.insert(e.playbackTime + e.args.secondsPerBeat, pulse, e.args);
};

export default pulse;
