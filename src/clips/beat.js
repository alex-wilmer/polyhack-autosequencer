export default e => {
  let amp = e.args.ctx.createGain();
  let source = e.args.ctx.createBufferSource();
  source.buffer = e.args.buffer;
  source.connect(e.args.ctx.destination);
  source.start();

  amp.connect(e.args.ctx.destination);
};
