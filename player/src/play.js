import { sample } from "lodash";
import { NOTE_LENGTHS } from "config";
import fire from "utils/fire";
import sampler from "vst/sampler";
import spacey from "vst/synth/patches/spacey";

export default ({
  ctx,
  sched,
  handleTimelineProgress,
  getCurrentBeat,
  _8BarBeats
}) => {
  fire({
    sched,
    repeat: () => {
      handleTimelineProgress();
      return NOTE_LENGTHS[4];
    }
  });

  fire({
    ctx,
    sched,
    patch: spacey,
    getCurrentBeat,
    repeat: () => sample([NOTE_LENGTHS[4], NOTE_LENGTHS[8], NOTE_LENGTHS[16]])
  });

  fire({
    sched,
    repeat: () => NOTE_LENGTHS[1] * 8,
    patch: () =>
      sampler({
        ctx,
        buffer: () => sample(_8BarBeats)
      })
  });
};
