export default ({ ctx, buffer }) => e => {
  let amp = ctx.createGain();
  let source = ctx.createBufferSource();
  source.buffer = buffer();
  source.connect(ctx.destination);
  source.start();
  amp.connect(ctx.destination);
};
