var spaceship,spaceshipImg;
var bg,bgImg;
var edges;
var bullet,bulletGroup;
var alien,alienImg,alienGroup;
var laser,laserImg,laserGroup;
var blast,blast1,blastImg,blast1Img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg;

function preload(){
  spaceshipImg=loadImage("images/spaceship.png");

  bgImg=loadImage("images/background.jpg");

  alienImg=loadImage("images/alien.png");

  laserImg=loadImage("images/laser.png");

  blast1Img=loadImage("images/blast1.png");

  gameOverImg=loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(1200,650);

  bg=createSprite(200,200,10,10);
  bg.addImage("bg",bgImg);
  bg.scale=2;
  bg.velocityY= -5;

  spaceship=createSprite(675,550,10,10);
  spaceship.addImage("spaceship",spaceshipImg);
  spaceship.scale=0.4;

  gameOver=createSprite(600,325);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible=false;

  edges=createEdgeSprites();

  alienGroup= new Group();
  laserGroup= new Group();
  bulletGroup= new Group();

  //spaceship.debug=true;
  //laser.debug=true;
}

function draw() {
  
background("bg");

if (gameState === PLAY){

  spaceship.bounceOff(edges);

if(bg.y<0){
  bg.y=150;
}

if(keyDown("RIGHT_ARROW")){
  spaceship.x += 6;
}

if(keyDown("LEFT_ARROW")){
  spaceship.x -= 6;
}

if(keyDown("space")){
  bullet=createSprite(spaceship.x,spaceship.y-30,5,100);
  bullet.velocityY= -10;
  bullet.shapeColor="red";
  bullet.lifeTime=498;
  bulletGroup.add(bullet);
}

if(laserGroup.isTouching(spaceship)){

  blast=createSprite(spaceship.x,spaceship.y);
  blast.addImage("blast",blast1Img);
  blast.lifetime=5;
  alienGroup.destroyEach();
  bulletGroup.destroyEach();
  laserGroup.destroyEach();

  gameState=END;
}

if(bulletGroup.isTouching(alienGroup)){
  alienGroup.destroyEach();

  blast=createSprite(alien.x,alien.y);
  blast.addImage("blast",blast1Img);
  blast.lifetime=5;

  laser.destroy();
  bulletGroup.destroyEach();

  console.log("abc");
}
}

else if(gameState === END){
  bg.velocityY=0;
  spaceship.destroy();

  alienGroup.destroyEach();
  bulletGroup.destroyEach();
  laserGroup.destroyEach();

  gameOver.visible=true;
}

enemy();

drawSprites();

fill("red");
textSize(25);
text("FIRST PART OF THE GAME",30,20);
}

function enemy(){
if(frameCount %100 === 0){
  alien=createSprite(random(spaceship.x,1000),random(20,spaceship.y-200));
  alien.addImage("alien",alienImg);
  alien.depth=bg.depth+1;
  alien.scale=0.2;
  alien.lifeTime=200;
  alienGroup.add(alien);

  laser=createSprite(alien.x,alien.y,10,10);
  laser.addImage("laser",laserImg);
  laser.velocityX=random(-20,-4);
  laser.velocityY=18;
  laser.scale=1.5;
  laser.lifeTime=200;
  laserGroup.add(laser);
}
}