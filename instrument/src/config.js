export let beatLengthInSeconds = x => 60 / x;
export const BPM = 125;
export const SECONDS_PER_BEAT = beatLengthInSeconds(BPM);
export const WAVE_SHAPES = ["square", "sine", "sawtooth", "triangle"];
