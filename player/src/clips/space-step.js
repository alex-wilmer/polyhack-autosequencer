import { note } from "@tonaljs/tonal";
import { sample } from "lodash";
import { NOTE_LENGTHS, WAVE_SHAPES } from "config";
import octify from "utils/octify";
import pulse from "utils/pulse";
import synth from "patches/synth";

export default ({ sched }) =>
  pulse({
    sched,
    repeat: () => sample([NOTE_LENGTHS[4], NOTE_LENGTHS[8], NOTE_LENGTHS[16]]),
    patch: () =>
      synth({
        ctx,
        type: () => sample(WAVE_SHAPES),
        frequency: () =>
          sample(
            octify(
              note(
                global.currentBeat % 32 < 16
                  ? "F1"
                  : sample(["Ab1", "Bb1", "Eb1"])
              ).freq,
              5
            )
          ),
        volume: () => 0.5,
        attack: () => sample([0.1]),
        release: () => sample([NOTE_LENGTHS[4]])
      })
  });
