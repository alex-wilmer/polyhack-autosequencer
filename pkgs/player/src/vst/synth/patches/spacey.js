import { note } from "@tonaljs/tonal";
import { sample } from "lodash";
import { NOTE_LENGTHS, WAVE_SHAPES } from "config";
import octify from "utils/octify";
import synth from "../synth";

export default ({ currentBeat, ctx }) =>
  synth({
    ctx,
    type: () => sample(WAVE_SHAPES),
    frequency: () =>
      sample(
        octify(
          note(currentBeat % 32 < 16 ? "F3" : sample(["Ab3", "Bb3", "Eb3"]))
            .freq,
          5
        )
      ),
    volume: () => 0.2,
    attack: () => sample([0.1]),
    release: () => sample([NOTE_LENGTHS[4]])
  });
