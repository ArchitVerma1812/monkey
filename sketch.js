var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var ground, groundImage;
var survivalTime = 0; 
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_collided=loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;


  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  monkey.addAnimation("collided",monkey_collided);
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  createCanvas(600, 500);
    background("black");
  monkey.collide(ground);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  stroke("red");
  textSize(20);
  fill("red");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("SurvivalTime: " + survivalTime, 100, 50);

  ground.x = ground.width / 2;

  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -17;

  }

  monkey.velocityY = monkey.velocityY + 0.8;

  if (FoodGroup.isTouching(monkey)) {
    score = score + 1;
    FoodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(monkey))
    {
      gameState=END;
      survivalTime=END;
    }
  
  if(gameState===END)
    {
      textSize(72);
      text("Game Over", 150, 300);
      monkey.changeAnimation("collided",monkey_collided);
      FoodGroup.destroyEach();
      ground.velocityY=0;
      obstaclesGroup.destroyEach();
      FoodGroup.velocityX=0;
      monkey.destroy();
      
      score=0;
    }

  bananas();
  obstacles();
  drawSprites();
}

function bananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(500, 200, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 120;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 315, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    obstacle.lifetime = 120;

    obstaclesGroup.add(obstacle);
  }


}