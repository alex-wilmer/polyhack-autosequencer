import { sample } from "lodash";
import { NOTE_LENGTHS } from "config";
import fire from "utils/fire";
import sampler from "vst/sampler";
import { spacey, hardbass } from "vst/synth/patches";

export default ({
  ctx,
  sched,
  handleTimelineProgress,
  getCurrentBeat,
  beats
}) => {
  // ONLY USED TO KEEP TRACK OF THE CURRENT BEAT
  // fire({
  //   sched,
  //   repeat: () => {
  //     handleTimelineProgress();
  //     return NOTE_LENGTHS[4];
  //   }
  // });

  fire({
    ctx,
    sched,
    patch: spacey,
    getCurrentBeat,
    repeat: () => sample([NOTE_LENGTHS[4], NOTE_LENGTHS[8], NOTE_LENGTHS[16]])
  });

  // fire({
  //   ctx,
  //   sched,
  //   patch: hardbass,
  //   getCurrentBeat,
  //   volume: () => 1.2,
  //   repeat: () => NOTE_LENGTHS[4]
  // });

  // fire({
  //   sched,
  //   repeat: () => NOTE_LENGTHS[1] * 32,
  //   patch: () =>
  //     sampler({
  //       ctx,
  //       buffer: () => sample(beats)
  //     })
  // });
};
