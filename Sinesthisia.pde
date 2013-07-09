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
string full = "";
var RGBColor;
void setup() {
  //The size is iPad Portrait.
  //If you want landscape, you should swap the values.
  // comment out if you are on android!
  size(768, 1024);
  frameRate(20); // this is the framerate. Tweak for performance.
  maxim = new Maxim(this);
  player = maxim.loadFile("godsun.mp3");
  player.setLooping(true);
  player.setAnalysing(true);
  rectMode(CENTER);
  background(0);
  colorMode(HSB);
}

void draw() {

  if (playit) {

    player.play();
    power = map(player.getAveragePower(), 0, 1, 1, 10);


    if (power < 0){
      power *=-1;
    }

    // get the analysis output from the player
    spec = player.getFrequencySpectrum();
    string full = player.updatePitch();
    if (full && full.noteName  ){
      RGBColor = player.getColorForNote(full.noteName);

        if (full.octave >= 4 && full.octave  <= 5 && full.confidence > 80) {
          // textSize(32);
          // text(full.noteName, 10, 30);
          // fill(0, 102, 153);
        }
        else if (full.octave >= 6 && full.octave <= 7 && full.confidence > 96 ){
          // textSize(32);
          // text(full.noteName, 10, 30);
          // fill(10, 0.5);
          // console.log(full.noteName);
        }
        else if (full.octave >=7)
        {
          console.log('platos !!' + full.noteName + full.octaveRaw);
        }
        else if (full.octave < 6 ){
            console.log('bombo !!' + full.noteName + full.octaveRaw);
        }
        else {
            console.log(full.octaveRaw +   full.noteName + "@hat?");
        }

    }else {

         // console.log(full);

    }
    if (RGBColor){
      fill(RGBColor.R,RGBColor.G, RGBColor.B);
      ellipse(mouseX,mouseY,power*100,power*100);
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




