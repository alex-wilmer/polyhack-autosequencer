import { noop } from "lodash";
let nullPatch = () => noop;

let fire = ({
  ctx,
  sched,
  patch = nullPatch,
  repeat,
  getCurrentBeat = noop
}) => {
  let _fire = e => {
    sched.insert(e.playbackTime, patch({ currentBeat: getCurrentBeat(), ctx }));
    sched.insert(e.playbackTime + repeat(), _fire);
  };

  sched.start(_fire);
};

export default fire;
