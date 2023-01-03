var context = new AudioContext();

var buffer; // local sample file

var master = context.createGain();
master.connect(context.destination);

var data;
var drawingData = [];
var voices = [];
var voicesMono = [];
var isLoaded = false;
var x = 0;
var y = 0;

// env
var attack = 0.2;
var release = 0.2;
var density = 0.2;
var spread = 0.2;
var trans = 1;

class Grain {
  constructor(buffer, positionX, attack, release, spread) {
    var that = this; // scope issues

    this.now = context.currentTime;

    this.source = context.createBufferSource();
    this.source.playbackRate.value = this.source.playbackRate.value * trans;
    this.source.buffer = buffer;

    this.gain = context.createGain();

    this.gain.connect(master);

    this.positionX = positionX;
    this.offset = this.positionX / buffer.duration;

    this.amp = 1.0;

    this.attack = attack;
    this.release = release;

    if (this.release < 0) {
      this.release = 0.1;
    }

    this.spread = spread;

    this.randomOffset = Math.random() * this.spread - this.spread / 2;

    this.source.start(
      this.now,
      Math.max(0, this.offset + this.randomOffset),
      this.attack + this.release
    );

    this.gain.gain.setValueAtTime(0.0, this.now);
    this.gain.gain.linearRampToValueAtTime(this.amp, this.now + this.attack);
    this.gain.gain.linearRampToValueAtTime(0, this.now + (this.attack + this.release));

    this.source.stop(this.now + this.attack + this.release + 0.1);
    var tms = (this.attack + this.release) * 1000;
    setTimeout(() => {
      that.gain.disconnect();
    }, tms + 200);
  }
}

function playGrains() {
  this.grains = [];
  this.grainsCount = 0;
  var that = this;
  this.play = () => {
    var g = new Grain(buffer, 0, attack, release, spread);
    that.grains[that.grainsCount] = g;
    that.grainsCount += 1;

    if (that.grainsCount > 10) {
      that.grainsCount = 0;
    }

    this.dens = density;
    this.interval = (this.dens * 500) + 70;
    that.timeout = setTimeout(that.play, this.interval);
  }
  this.play();
}

export function stop() {
  clearTimeout(this.timeout);
}

fetch("http://127.0.0.1:5173/granulas/accel_test.wav")
.then((res) => res.arrayBuffer())
.then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
.then((buffer) => {
  data = buffer.getChannelData(0);
  isLoaded = true;
}, (error) => {
  console.log(error);
});
