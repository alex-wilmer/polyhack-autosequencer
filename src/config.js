export let beatLengthInSeconds = x => 60 / x;
export const BPM = 127;
export const SECONDS_PER_BEAT = beatLengthInSeconds(BPM);
