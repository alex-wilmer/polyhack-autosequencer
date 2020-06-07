export let beatLengthInSeconds = x => 60 / x;
export let BPM = 125;
export let SECONDS_PER_BEAT = beatLengthInSeconds(BPM);
export let SIXTEENTH_NOTE = SECONDS_PER_BEAT / 4;
export let EIGHTH_NOTE = SECONDS_PER_BEAT / 2;
export let QUARTER_NOTE = SECONDS_PER_BEAT;
export let HALF_NOTE = SECONDS_PER_BEAT * 2;
export let WHOLE_NOTE = SECONDS_PER_BEAT * 4;
let NOTE_LENGTHS = [];
NOTE_LENGTHS[1] = WHOLE_NOTE;
NOTE_LENGTHS[2] = HALF_NOTE;
NOTE_LENGTHS[4] = QUARTER_NOTE;
NOTE_LENGTHS[8] = EIGHTH_NOTE;
NOTE_LENGTHS[16] = SIXTEENTH_NOTE;
export { NOTE_LENGTHS };
export let WAVE_SHAPES = ["sine", "square", "sawtooth", "triangle"];