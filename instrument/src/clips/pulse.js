let pulse = ({ sched, delay, patch = () => {}, repeat }) => e => {
  sched.insert(delay ? e.playbackTime + delay : e.playbackTime, patch);
  sched.insert(e.playbackTime + repeat(), pulse({ sched, delay, patch, repeat }));
};

export default pulse;
