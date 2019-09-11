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
          note(currentBeat % 32 < 16 ? "F1" : sample(["Ab1", "Bb1", "Eb1"]))
            .freq,
          5
        )
      ),
    volume: () => 0.5,
    attack: () => sample([0.1]),
    release: () => sample([NOTE_LENGTHS[4]])
  });
