export default ({
  ctx,
  type = () => "sine",
  attack = () => 0,
  release = () => 0,
  volume = () => 1,
  frequency = () => 1000,
  osc = ctx.createOscilator()
}) => e => {
  let t = e.playbackTime;
  let gain = ctx.createGain();

  if (attack() || release()) {
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume(), t + attack());
    gain.gain.exponentialRampToValueAtTime(0.01, t + attack() + release());
    gain.gain.setValueAtTime(0, t + attack() + release() + 0.1);
  } else {
    gain.gain.value = volume();
  }

  gain.connect(ctx.destination);

  osc.type = type();
  osc.frequency.value = frequency();
  osc.connect(gain);
  osc.start(t);

  return { osc, gain };
};
