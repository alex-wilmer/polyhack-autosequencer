export let beatLengthInSeconds = x => 60 / x;
export let BPM = 125;
export let SECONDS_PER_BEAT = beatLengthInSeconds(BPM);
export let SIXTEENTH_NOTE = SECONDS_PER_BEAT / 4;
export let EIGHTH_NOTE = SECONDS_PER_BEAT / 2;
export let QUARTER_NOTE = SECONDS_PER_BEAT;
export let HALF_NOTE = SECONDS_PER_BEAT * 2;
export let WHOLE_NOTE = SECONDS_PER_BEAT * 4;
export let WAVE_SHAPES = ["square", "sine", "sawtooth", "triangle"];
