/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Mick Grierson, Matthew Yee-King, Marco Gillies
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var mtof = [0, 8.661957, 9.177024, 9.722718, 10.3, 10.913383, 11.562325, 12.25, 12.978271, 13.75, 14.567617, 15.433853, 16.351599, 17.323914, 18.354048, 19.445436, 20.601723, 21.826765, 23.124651, 24.5, 25.956543, 27.5, 29.135235, 30.867706, 32.703197, 34.647827, 36.708096, 38.890873, 41.203445, 43.65353, 46.249302, 49., 51.913086, 55., 58.27047, 61.735413, 65.406395, 69.295654, 73.416191, 77.781746, 82.406891, 87.30706, 92.498604, 97.998856, 103.826172, 110., 116.540939, 123.470825, 130.81279, 138.591309, 146.832382, 155.563492, 164.813782, 174.61412, 184.997208, 195.997711, 207.652344, 220., 233.081879, 246.94165, 261.62558, 277.182617, 293.664764, 311.126984, 329.627563, 349.228241, 369.994415, 391.995422, 415.304688, 440., 466.163757, 493.883301, 523.25116, 554.365234, 587.329529, 622.253967, 659.255127, 698.456482, 739.988831, 783.990845, 830.609375, 880., 932.327515, 987.766602, 1046.502319, 1108.730469, 1174.659058, 1244.507935, 1318.510254, 1396.912964, 1479.977661, 1567.981689, 1661.21875, 1760., 1864.655029, 1975.533203, 2093.004639, 2217.460938, 2349.318115, 2489.015869, 2637.020508, 2793.825928, 2959.955322, 3135.963379, 3322.4375, 3520., 3729.31, 3951.066406, 4186.009277, 4434.921875, 4698.63623, 4978.031738, 5274.041016, 5587.651855, 5919.910645, 6271.926758, 6644.875, 7040., 7458.620117, 7902.132812, 8372.018555, 8869.84375, 9397.272461, 9956.063477, 10548.082031, 11175.303711, 11839.821289, 12543.853516, 13289.75];
var context = new webkitAudioContext();
var noteColor = {
  'C': { R:50, G: 0, B:0 },
  'C#': { R:50, G: 0, B:0 },
  'D':{ R:150, G: 20, B:10 },
  'D#':{ R:150, G: 20, B:10 },
  'E':{ R:170, G: 50, B:20 },
  'F#':{ R:170, G: 60, B:30 },
  'G':{ R:170, G: 60, B:100 },
  'G#':{ R:170, G: 60, B:100 },
  "A":{ R:150, G: 60, B:150 },
  "A#":{ R:150, G: 100, B:150 },
  "B": { R:200, G: 100, B:200 },
};



var frequencies = {
    'A0': 27.5,
    'A1': 55,
    'A2': 110,
    'A3': 220,
    'A4': 440,
    'A5': 880,
    'A6': 1760,
    'A7': 3520.00,
    'A#0': 29.1352,
    'A#1': 58.2705,
    'A#2': 116.541,
    'A#3': 233.082,
    'A#4': 466.164,
    'A#5': 932.328,
    'A#6': 1864.66,
    'A#7': 3729.31,
    'B0': 30.8677,
    'B1': 61.7354,
    'B2': 123.471,
    'B3': 246.942,
    'B4': 493.883,
    'B5': 987.767,
    'B6': 1975.53,
    'B7': 3951.07,
    'C1': 32.7032,
    'C2': 65.4064,
    'C3': 130.813,
    'C4': 261.626,
    'C5': 523.251,
    'C6': 1046.50,
    'C7': 2093,
    'C8': 4186.01,
    'C#1': 34.6478,
    'C#2': 69.2957,
    'C#3': 138.591,
    'C#4': 277.183,
    'C#5': 554.365,
    'C#6': 1108.73,
    'C#7': 2217.46,
    'D1': 36.7081,
    'D2': 73.4162,
    'D3': 146.832,
    'D4': 293.665,
    'D5': 587.330,
    'D6': 1174.66,
    'D7': 2349.32,
    'D#1': 38.8909,
    'D#2': 77.7817,
    'D#3': 155.563,
    'D#4': 311.127,
    'D#5': 622.254,
    'D#6': 1244.51,
    'D#7': 2489.02,
    'E1': 41.2034,
    'E2': 82.4069,
    'E3': 164.814,
    'E4': 329.628,
    'E5': 659.255,
    'E6': 1318.51,
    'E7': 2637.02,
    'F1': 43.6563,
    'F2': 87.3071,
    'F3': 174.614,
    'F4': 349.228,
    'F5': 698.456,
    'F6': 1396.91,
    'F7': 2793.83,
    'F#1': 46.2493,
    'F#2': 92.4986,
    'F#3': 184.997,
    'F#4': 369.994,
    'F#5': 739.989,
    'F#6': 1479.98,
    'F#7': 2959.96,
    'G1': 48.9994,
    'G2': 97.9989,
    'G3': 195.998,
    'G4': 391.995,
    'G5': 783.991,
    'G6': 1567.98,
    'G7': 3135.96,
    'G#1': 51.9131,
    'G#': 103.826,
    'G#3': 207.652,
    'G#4': 415.305,
    'G#5': 830.609,
    'G#6': 1661.22,
    'G#7': 3322.44
  };
function Maxim(t) {

  this.loadFile = function(filename) {
    var audio = new XMLHttpRequest();
    var source = null;
    var myAudioBuffer = null;
    var playing=false;
    var isLooping=false;
    var startTime=0;
    var endTime = 0;
    var currentSpeed = 1.0;
    var sampleLength = 1.0;
    var volume = 1.0;
    var gainNode = null;
    var filter = null;
    var analyser = null;
    var analysing = true;
    var attack = 0;
    var release = 0;
    var envTime = 0;
    var flux = 0;
    var averageSpectrumPower = 0;
    var FFTData = null;
    var times = null;
    audio.open('GET', filename, true);
    audio.responseType = 'arraybuffer';
    audio.onload = function() {
      //      alert("sound loaded"); //test
      context.decodeAudioData(audio.response, function(buffer) {
        myAudioBuffer = buffer;
        //       alert("sound decoded"); //test
        source = context.createBufferSource();
        gainNode = context.createGainNode();
        filter = context.createBiquadFilter();
        analyser = context.createAnalyser();
        filter.type = 0;
        filter.frequency.value = 20000;
        envTime = 1.0;
        source.buffer = myAudioBuffer;
        source.playbackRate.value = currentSpeed;
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.gain.value = volume;
        gainNode.connect(context.destination);
        sampleLength = source.buffer.duration*1000;
      }
      );
    }

    audio.send();
    audio.isPlaying = function() {

      return playing;
    }

    audio.setLooping = function(t) {
      isLooping=t;
    }

    audio.cue = function(time) {

      startTime=time/1000;
    }

    audio.speed = function(speed) {
      if (source) {

        currentSpeed = speed;

        source.playbackRate.value = speed;
      }
    }

    audio.getLengthMs = function() {
      if (source) {
        //        alert(source.buffer.duration*1000);
        return sampleLength;
      }
    }

    audio.setAnalysing = function(analysing_) {
      //this.analysing = analysing_;
    }

    audio.volume = function(gain) {

      volume=gain;

      if (playing) {
        gainNode.gain.value = volume;
      }
    }

    audio.play = function() {
      if (source && !playing) {
        source = context.createBufferSource();
        gainNode = context.createGainNode()
          filter = context.createBiquadFilter();
        filter.type = 0;
        filter.frequency.value = 20000;
        envTime = 1.0;
        source.buffer = myAudioBuffer;
        source.playbackRate.value = currentSpeed;
        sampleLength = source.buffer.duration*1000;
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.value = volume;
        //          alert("source connected"); //test
        if (isLooping) source.loop = true;
        //          source.loopStart = startTime/1000;
        //          source.loopEnd = source.buffer.duration;
        source.noteGrainOn(0, startTime, source.buffer.duration-startTime);
        playing=true;
      }
      if (analysing==true && playing) {
        gainNode.connect(analyser);
        FFTData = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(FFTData);
        times = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(times);
      }
    }

    audio.stop = function() {
      if (source) {
        source.noteOff(0);
        playing=false;
      }
    }

    audio.setFilter = function(freq, res) {

      filter.frequency.value = freq;
      filter.Q.value = res;
    }

    audio.filterRamp = function(freq, envTime) {

      filter.frequency.cancelScheduledValues(context.currentTime);
      filter.frequency.linearRampToValueAtTime(filter.frequency.value, context.currentTime);   // THIS IS THE CHANGE FROM PREVIOUS CODE EXAMPLE
      filter.frequency.linearRampToValueAtTime(freq, context.currentTime + envTime/1000.);
    }

    //This function allows you to set the amplitude of the waveform
    audio.setAmplitude = function(amplitude) {

      gainNode.gain.cancelScheduledValues(context.currentTime);
      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(amplitude, context.currentTime + 10);
    }

    audio.ramp = function(amplitude, envTime) {

      gainNode.gain.cancelScheduledValues(context.currentTime);
      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(amplitude, context.currentTime + envTime/1000.);
    }

    audio.getAveragePower = function() {
      if (source) {
        averageSpectrumPower = 0
          for (var i=0;i<analyser.frequencyBinCount;i++) {

          averageSpectrumPower+=FFTData[i]
        }
        return (100+(averageSpectrumPower/analyser.frequencyBinCount))*0.01;
      }
    }
    audio.getPowerSpectrum = function() {
      if (source) {
        return FFTData;
      }
    }
    audio.getFrequencySpectrum = function() {
      if (source) {
        return times;
      }
    }

    audio.getFlux = function() {
      if (source) {
        flux=0;
        var FFTData1 = new Float32Array(analyser.frequencyBinCount);
        for (var i=0;i<analyser.frequencyBinCount;i++) {

          flux+=FFTData[i]-FFTData1[i];
        }
        FFTData1=FFTData;
        return (100+(flux/analyser.frequencyBinCount))*0.01;
      }
    }

  var rafID = null;
  var tracks = null;
  var buflen = 1024;
  var buf = new Uint8Array( buflen );
  var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

  audio.findNextPositiveZeroCrossing = function( start ) {
          var i = Math.ceil( start );
          var last_zero = -1;
          // advance until we're zero or negative
          while (i<buflen && (buf[i] > 128 ) )
            i++;
          if (i>=buflen)
            return -1;

          // advance until we're above MINVAL, keeping track of last zero.
          while (i<buflen && ((t=buf[i]) < MINVAL )) {
            if (t >= 128) {
              if (last_zero == -1)
                last_zero = i;
            } else
              last_zero = -1;
            i++;
          }

          // we may have jumped over MINVAL in one sample.
          if (last_zero == -1)
            last_zero = i;

          if (i==buflen)  // We didn't find any more positive zero crossings
            return -1;

          // The first sample might be a zero.  If so, return it.
          if (last_zero == 0)
            return 0;

          // Otherwise, the zero might be between two values, so we need to scale it.

          var t = ( 128 - buf[last_zero-1] ) / (buf[last_zero] - buf[last_zero-1]);
          return last_zero+t;
    }

    var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    audio.noteFromPitch = function ( frequency ) {
      var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
      return Math.round( noteNum ) + 69;
    }

    audio.frequencyFromNoteNumber = function( note ) {
      return 440 * Math.pow(2,(note-69)/12);
    }

    audio.centsOffFromPitch = function( frequency, note ) {
      return Math.floor( 1200 * Math.log( frequency / this.frequencyFromNoteNumber( note ))/Math.log(2) );
    }
    audio.getColorForNote = function(note){
      return noteColor[note];
    }
    audio.updatePitch = function( time ) {
      var cycles = new Array;
      analyser.getByteTimeDomainData( buf );

      var i=0;
      // find the first point
      var last_zero = this.findNextPositiveZeroCrossing( 0 );

      var n=0;
      // keep finding points, adding cycle lengths to array
      while ( last_zero != -1) {
        var next_zero = this.findNextPositiveZeroCrossing( last_zero + 1 );
        if (next_zero > -1)
          cycles.push( next_zero - last_zero );
        last_zero = next_zero;

        n++;
        if (n>1000)
          break;
      }

      // 1?: average the array
      var num_cycles = cycles.length;
      var sum = 0;
      var pitch = 0;

      for (var i=0; i<num_cycles; i++) {
        sum += cycles[i];
      }

      if (num_cycles) {
        sum /= num_cycles;
        pitch = context.sampleRate/sum;
      }

    // confidence = num_cycles / num_possible_cycles = num_cycles / (audioContext.sampleRate/)
      var confidence = (num_cycles ? ((num_cycles/(pitch * buflen / context.sampleRate)) * 100) : 0);


      // console.log(
      //   "Cycles: " + num_cycles +
      //   " - average length: " + sum +
      //   " - pitch: " + pitch + "Hz " +
      //   " - note: " + this.noteFromPitch( pitch ) +
      //   " - confidence: " + confidence + "% "
      //   );

      // possible other approach to confidence: sort the array, take the median; go through the array and compute the average deviation

      //detectorElem.className = (confidence>50)?"confident":"vague"
      // TODO: Paint confidence meter on canvasElem here.

      if (num_cycles == 0) {
        // pitchElem.innerText = "--";
        // noteElem.innerText = "-";
        // detuneElem.className = "";
        // detuneAmount.innerText = "--";
      } else {
        //pitchElem.innerText = Math.floor( pitch );
        var note =  this.noteFromPitch( pitch );
        //noteElem.innerText = noteStrings[note%12];
        var detune = this.centsOffFromPitch( pitch, note );
        if (detune == 0 ) {
          //detuneElem.className = "";
          //detuneAmount.innerText = "--";
        } else {
          //if (detune < 0)
            //detuneElem.className = "flat";
          //else
            //detuneElem.className = "sharp";
         // detuneAmount.innerText = Math.abs( detune );
        }
        var full;
        if (confidence > 1){
          var full = {
                pitch:pitch,
                note:note,
                noteName: noteStrings[note%12],
                octave:Math.floor(note/12),
                octaveRaw:note/12,
                confidence: confidence,
                sum : sum,
                detune: detune
          }
        }
        return full;
      }
      return "-";
    }


    return audio;
  }
}



//This is the constructor for our waveform generator.
Synth = function() {
  var that = this;
  this.phase = 0;
  this.context = context;
  this.node = context.createJavaScriptNode(512, 2, 2);
  this.node.onaudioprocess = function(audioContext) {
    that.process(audioContext);
    console.log(audioContext.sampleRate);
    };
    this.sample_rate = 44100;
  this.frequency = 220;
  this.amplitude = 1.0;
  this.gainNode = context.createGainNode();
  this.delayGain = context.createGainNode();
  this.filter = context.createBiquadFilter();
  this.delay = context.createDelayNode(2);
  this.delayAmt = 0.75;
  this.delayGain.gain.value = 0.75;
  this.filter.type = 0;
  this.envTime = 1.0;
  this.isPlaying = false;
  this.waveFormSize = 514;
  this.wave = new Array(this.waveFormSize);

  for (var i = 0; i < this.waveFormSize + 1 ; i++) {

    this.wave[i]=Math.sin(i/(this.waveFormSize-2) * (Math.PI * 2));
  }
}

Synth.prototype.waveTableSize = function(size) {

  this.waveFormSize=size;
}

Synth.prototype.loadWaveTable = function(waveTable) {

  for (var i = 0; i < this.waveFormSize ; i++) {

    this.wave[i] = waveTable[i];
  }
  //  alert("all done");
}


//This function is the waveform generator's buffer method
//Hack here to create new waveforms
Synth.prototype.process = function(audioContext) {
  var data = audioContext.outputBuffer.getChannelData(0);
  for (var i = 0; i < data.length; i++) {
    var remainder;
    this.phase += (this.waveFormSize-2) / (this.sample_rate / this.frequency);
    if (this.phase >= (this.waveFormSize-3) ) this.phase -= (this.waveFormSize-2) ;
    remainder = this.phase - Math.floor(this.phase);
    data[i]=(1-remainder) * this.wave[1+Math.floor(this.phase)] + remainder * this.wave[2+Math.floor(this.phase)];
  }
  //  console.log('data = ' + this.frequency);
}

//This function allows you to 'play' the waveform
Synth.prototype.play = function() {
  this.node.connect(this.filter);
  this.filter.connect(this.gainNode);
  this.gainNode.connect(this.context.destination);
  this.gainNode.connect(this.delay);
  this.delay.connect(this.delayGain);
  this.delayGain.connect(this.delay);
  this.delay.connect(this.context.destination);
  this.isPlaying=true;
}

//This function allows you to set the frequency of the waveform
Synth.prototype.setFrequency = function(frequency) {
  this.frequency = frequency;
}

//This function allows you to set the amplitude of the waveform
Synth.prototype.setAmplitude = function(amplitude) {

  this.gainNode.gain.cancelScheduledValues(context.currentTime);
  this.gainNode.gain.linearRampToValueAtTime(this.gainNode.gain.value, context.currentTime);
  this.gainNode.gain.linearRampToValueAtTime(amplitude, context.currentTime + 10);
}

Synth.prototype.ramp = function(amplitude, envTime) {

  this.gainNode.gain.cancelScheduledValues(context.currentTime);
  this.gainNode.gain.linearRampToValueAtTime(this.gainNode.gain.value, context.currentTime);
  this.gainNode.gain.linearRampToValueAtTime(amplitude, context.currentTime + envTime/1000.);
}

//This allows us to stop the waveform generator
Synth.prototype.stop = function() {
  this.node.disconnect();
  this.isPlaying=false;
}

Synth.prototype.setDelayTime = function(t) {

  this.delay.delayTime.value = t;
}

Synth.prototype.setDelayAmount = function(t) {

  this.delayGain.gain.value = t;

  //  this.delayGain.gain.cancelScheduledValues(context.currentTime);
  //  this.delayGain.gain.linearRampToValueAtTime(this.delayGain.gain.value, context.currentTime);
  //  this.delayGain.gain.linearRampToValueAtTime(this.delayGain.gain.value, context.currentTime,100);
}

Synth.prototype.setFilter = function(freq, res) {

  this.filter.frequency.value = freq;
  this.filter.Q.value = res;
}

Synth.prototype.filterRamp = function(freq, envTime) {

  this.filter.frequency.cancelScheduledValues(context.currentTime);
  this.filter.frequency.linearRampToValueAtTime(this.filter.frequency.value, context.currentTime);   // THIS IS THE CHANGE FROM PREVIOUS CODE EXAMPLE
  this.filter.frequency.linearRampToValueAtTime(freq, context.currentTime + envTime/1000.);
  //  this.filter.frequency.value = freq;
  //  this.filter.Q.value = res;
}


SpecPoint = function(){
  this.freq = 0;
  this.value = 0;
  this.first = 0;

};


SpecPoint.prototype.compareTo = function(b){
  console.log(this.value,b.value);
};


