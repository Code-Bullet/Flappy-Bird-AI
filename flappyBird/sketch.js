var panSpeed = 8;
var gravity = 3;
var player;

var pipes;
var pipes2;
var ground;
var pauseBecauseDead;
var birdSprite;
var topPipeSprite;
var bottomPipeSprite;
var backgroundSprite;
var groundSprite;

var dieOff = false;

//-------------------------------------------------------------------------------- neat globals

var nextConnectionNo = 1000;
var population;
var speed = 60;

var superSpeed = 1;
var showBest = false; //true if only show the best of the previous generation
var runBest = false; //true if replaying the best ever game
var humanPlaying = false; //true if the user is playing

var humanPlayer;


var showBrain = false;
var showBestEachGen = false;
var upToGen = 0;
var genPlayerTemp; //player

var showNothing = false;

var randomPipeHeights = [];
var isChristmas = true;

function preload() {
  if (isChristmas) {
    birdSprite = loadImage("images/christmasBerd.png");
  } else {
    birdSprite = loadImage("images/fatBird.png");
  }
  topPipeSprite = loadImage("images/full pipe top.png");
  bottomPipeSprite = loadImage("images/full pipe bottom.png");
  backgroundSprite = loadImage("images/background.png");
  groundSprite = loadImage("images/groundPiece.png");

}

function setup() {
  window.canvas = createCanvas(600, 800);

  player = new Player();
  // pipes = new PipePair(true);
  // pipes2 = new PipePair(false, pipes);
  // pipes2.setX(1.5 * canvas.width + pipes2.topPipe.width / 2);
  ground = new Ground();

  pauseBecauseDead = false;

  population = new Population(1000);
  humanPlayer = new Player();
}

function draw() {
  // background(135, 206, 250);
  drawToScreen();
  if (showBestEachGen) { //show the best of each gen
    showBestPlayersForEachGeneration();
  } else if (humanPlaying) { //if the user is controling the ship[
    showHumanPlaying();
  } else if (runBest) { // if replaying the best ever game
    showBestEverPlayer();
  } else { //if just evolving normally
    if (!population.done()) { //if any players are alive then update them
      population.updateAlive();
    } else { //all dead
      //genetic algorithm
      population.naturalSelection();
    }
  }
  // writeInfo();
}
//-----------------------------------------------------------------------------------
function showBestPlayersForEachGeneration() {
  if (!genPlayerTemp.dead) { //if current gen player is not dead then update it

    genPlayerTemp.look();
    genPlayerTemp.think();
    genPlayerTemp.update();
    genPlayerTemp.show();
  } else { //if dead move on to the next generation
    upToGen++;
    if (upToGen >= population.genPlayers.length) { //if at the end then return to the start and stop doing it
      upToGen = 0;
      showBestEachGen = false;
    } else { //if not at the end then get the next generation
      genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
    }
  }
}
//-----------------------------------------------------------------------------------
function showHumanPlaying() {
  if (!humanPlayer.dead) { //if the player isnt dead then move and show the player based on input
    humanPlayer.look();
    humanPlayer.update();
    humanPlayer.show();
  } else { //once done return to ai
    humanPlaying = false;
  }
}
//-----------------------------------------------------------------------------------
function showBestEverPlayer() {
  if (!population.bestPlayer.dead) { //if best player is not dead
    population.bestPlayer.look();
    population.bestPlayer.think();
    population.bestPlayer.update();
    population.bestPlayer.show();
  } else { //once dead
    runBest = false; //stop replaying it
    population.bestPlayer = population.bestPlayer.cloneForReplay(); //reset the best player so it can play again
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//draws the display screen
function drawToScreen() {
  if (!showNothing) {
    //pretty stuff
    image(backgroundSprite, 0, 0, canvas.width, canvas.height);
    // showAll();
    // updateAll();
    drawBrain();


  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function drawBrain() { //show the brain of whatever genome is currently showing
  var startX = 350; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  var startY = 550;
  var w = 300;
  var h = 200;

  if (runBest) {
    population.bestPlayer.brain.drawGenome(startX, startY, w, h);
  } else
  if (humanPlaying) {
    showBrain = false;
  } else if (showBestEachGen) {
    genPlayerTemp.brain.drawGenome(startX, startY, w, h);
  } else {
    population.players[0].brain.drawGenome(startX, startY, w, h);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//writes info about the current player
function writeInfo() {
  fill(255);
  stroke(255);
  textAlign(LEFT);
  textSize(30);
  textSize(50);
  textAlign(CENTER);
  if (showBestEachGen) {
    text(genPlayerTemp.score, canvas.width / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textAlign(LEFT);
    textSize(30);

    text("Gen: " + (genPlayerTemp.gen + 1), 20, 50);
  } else if (humanPlaying) {
    text(humanPlayer.score, canvas.width / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  } else if (runBest) {
    text(population.bestPlayer.score, canvas.width / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textSize(30);

    textAlign(LEFT);
    text("Gen: " + population.gen, 20, 50);
  } else if (showBest) {
    text(population.players[0].score, canvas.width / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textAlign(LEFT);
    textSize(30);
    text("Gen: " + population.gen, 20, 50);

  } else {
    var bestCurrentPlayer = population.getCurrentBest();

    text(bestCurrentPlayer.score, canvas.width / 2, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    textSize(30);
    textAlign(LEFT);

    text("Gen: " + population.gen, 20, 50);

  }
}



function keyPressed() {
  switch (key) {
    case ' ':
      //toggle showBest
      if (humanPlaying) {
        humanPlayer.flap();
      } else {
        showBest = !showBest;
      }

      break;
    case 'F': //speed up frame rate
      speed += 10;
      frameRate(speed);
      print(speed);
      break;
    case 'S': //slow down frame rate
      if (speed > 10) {
        speed -= 10;
        frameRate(speed);
        print(speed);
      }
      break;
    case 'B': //run the best
      runBest = !runBest;
      break;
    case 'G': //show generations
      showBestEachGen = !showBestEachGen;
      upToGen = 0;
      genPlayerTemp = population.genPlayers[upToGen].clone();
      break;
    case 'N': //show absolutely nothing in order to speed up computation
      showNothing = !showNothing;
      break;
    case 'P': //play
      humanPlaying = !humanPlaying;
      humanPlayer = new Player();
      break;
  }
  //any of the arrow keys
  switch (keyCode) {

    case RIGHT_ARROW: //right is used to move through the generations

      if (showBestEachGen) { //if showing the best player each generation then move on to the next generation
        upToGen++;
        if (upToGen >= population.genPlayers.length) { //if reached the current generation then exit out of the showing generations mode
          showBestEachGen = false;
        } else {
          genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
        }
      }
      break;
  }
}
