let ctx = new AudioContext()

let trigger = ({
  type = 'sin',
  attack = 0, 
  release = 0,
  frequency = 1000,
  delays = 0,
  delayTime = 10,
}) => {
  let createDelay = ({
    time, 
    gain,
  }) => {
    let delayGain = ctx.createGain()
    delayGain.gain.value = gain
    delayGain.connect(ctx.destination)
    
    let delay = ctx.createDelay(10);
    delay.delayTime.value = time
    delay.connect(delayGain)
    
    return delay
  }
  
  let gain = ctx.createGain()
  
  if (attack || release) {
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + attack)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + release)
    gain.gain.setValueAtTime(0, ctx.currentTime + release)
  } 
  
  Array(delays).fill().map((_, i) => createDelay({
    time: (i + 1) / delayTime,
    gain: 1 / (i + 1 * 1.5), 
  })).forEach(d => gain.connect(d))
  
  gain.connect(ctx.destination)
  
  let osc = ctx.createOscillator()
  osc.type = type
  osc.frequency.value = frequency
  osc.connect(gain)
  osc.start(ctx.currentTime)
  
  return { osc, gain }
}

let lfo = ({
  osc, rate, freq, fn
}) => {
  requestAnimationFrame(t => {
    osc.frequency.value = Math[fn](t / rate) * freq
    
    lfo({ osc, rate, freq, fn })
  })
}  

trigger({ type: 'square', attack: 0, release: 0.2, frequency: 1000, delays: 10, delayTime: 20 })
trigger({ type: 'square', attack: 0.1, release: 0.3, frequency: 500, delays: 7, delayTime: 5 })
trigger({ type: 'square', attack: 0, release: 0.2, frequency: 1000, delays: 10, delayTime: 20 })
trigger({ type: 'square', attack: 0, release: 0.2, frequency: 1000, delays: 10, delayTime: 20 })
trigger({ type: 'sin', attack: 0.4, release: 0.5, frequency: 600 })
trigger({ type: 'sin', attack: 0.6, release: 0.7, frequency: 200 })

let t1 = trigger({ type: 'square', frequency: 600 })

lfo({
  osc: t1.osc,
  rate: 30,
  freq: 500,
  fn: 'sin'
})
// lfo(trigger({ type: 'triangle' }))
// 
// lfo(trigger({ type: 'square' }))
// lfo(trigger({ type: 'triangle' }))
// 
// lfo(trigger({ type: 'sin' }))
// lfo(trigger({ type: 'sin' }))
// lfo(trigger({ type: 'sin' }))

export default () => null;
