export default ({
  type = "sine",
  attack = 0,
  release = 0,
  frequency = 1000,
  ctx
}) => event => {
  let t = event.playbackTime;
  let gain = ctx.createGain();

  if (attack || release) {
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(1, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.01, t + attack + release);
    gain.gain.setValueAtTime(0, t + attack + release + 0.1);
  }

  gain.connect(ctx.destination);

  let osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.connect(gain);
  osc.start(t);

  return { osc, gain };
};
