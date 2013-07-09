//The MIT License (MIT) - See Licence.txt for details

//Copyright (c) 2013 Mick Grierson, Matthew Yee-King, Marco Gillies


//When running on the iPad or iPhone, you won't see anything unless you tap the screen.
//If it doesn't appear to work first time, always try refreshing the browser.


Maxim maxim;
AudioPlayer player;
float power=0;
//float threshold = 0.35;// vary this until the square appears on the beats
float threshold = 0.35;// vary this until the square appears on the beats
int wait = 0;
boolean playit = false;
int xPos = 0;
boolean logIt = false;
void setup() {
  //The size is iPad Portrait.
  //If you want landscape, you should swap the values.
  // comment out if you are on android! 
  size(768, 1024); 
  frameRate(20); // this is the framerate. Tweak for performance.
  maxim = new Maxim(this);
  player = maxim.loadFile("major.wav");
  player.setLooping(true);
  player.setAnalysing(true);
  rectMode(CENTER);
}
 
void draw() {
  background(0);   
 
  
//  noFill();
  
  if (playit) {
    fill(255);
    player.play(); 
    power = player.getAveragePower();
     
    ellipse(mouseX,mouseY,power*500,power*500);
    
    // get the analysis output from the player
    spec = player.getFrequencySpectrum();
    console.log(player.updatePitch());
    // we will draw 1x1 pixel dots
    
      // iterate over the values in the spectrum, plotting them down the screen
      var max = {};
      
      float maxSpec = -99999999;
      int maxPos = 0;
      if (!logIt){
        var specArray = new Array();
        var i = 0;
        
        for (i=0; i< spec.length; i++) {
          // set the colour based on the power in this band
          SpecPoint p = new SpecPoint();
          p.freq = i;
          p.value = spec[i];
          specArray.push(p);
        }
        specArray.sort(function(a,b){
            //console.log(b,a);
            return b.value -  a.value ;
        });

        var peaks = [];
          for (var p = 0; p < 8; p++) {
            if (specArray[p]) {
              var point = specArray[p];
              point.first =  point.value;
              peaks.push(point);
            }
          }


        console.log(peaks[0]);
        //logIt = true;
      

    }
    
  }
 }
 
 


void mousePressed() {
  
    playit = !playit;
    
    if (playit) {

         player.play(); 
 
    } else {
     
     player.stop(); 
      
    }
  
}




  