import { sample } from "lodash";
import { note } from "@tonaljs/tonal";
import synth from "../synth";

export default ({ ctx }) =>
  synth({
    ctx,
    type: () => "sawtooth",
    frequency: () => sample([note("F1").freq, note("F2").freq]),
    volume: () => 0.5,
    attack: () => 0.4,
    release: () => 0.1
  });
