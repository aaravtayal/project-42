var PLAY= 1;
var END = 0;
var gameState = PLAY;
var monkey, monkeyImage;
var ground;
var banana, bananaImage;
var rock, rockImage;
var foodGroup, obstacleGroup;
var survivalTime;
var bananas;
var invisibleGround;
var stop, stopImage;
var hits;


function preload(){
  
  
  monkeyImage =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  stopImage = loadImage("sprite_1.png");
 
}

   

function setup() 
 {
     ground = createSprite(300,470,900,20);
     ground.shapeColor = "brown"
     ground.velocityX = -6;
   
     invisibleGround = createSprite(300,473,900,20);
     invisibleGround.shapeColor = "brown"
   //  inground.velocityX = -6;


     monkey = createSprite(100,400,20,20);
     monkey.addAnimation("monkey",monkeyImage);
     monkey.scale = 0.2;

      survivalTime = 0;
      bananas = 0;
      hits = 0;

    foodGroup = new Group(); 
    obstaclesGroup = new Group();
 }


function draw() 
 {
    
     createCanvas(600,490);
     background("cyan");

     monkey.setCollider("rectangle",10,20,300,500);
   
 if (gameState === PLAY)
   {
      survivalTime = survivalTime + Math.round(frameCount%30 === 0);
          
      if (keyDown("space") && monkey.y >= 340)
        {
           monkey.velocityY =-12;
        }  
      monkey.velocityY =  monkey.velocityY+0.5
      
      if (foodGroup.isTouching(monkey))
       {
          foodGroup.destroyEach();
          bananas = bananas+1       
          monkey.scale = monkey.scale+0.01;
       }  
  
      ground.x = ground.width/2;
      monkey.collide(invisibleGround);
      
      food();
      obstacles();
      
   } 
  
      if (hits === 2)
        {
           gameState = END;
           monkey.addImage("monkey",stopImage);
        }
  
      if (gameState === END)
        {
           monkey.velocityY = 0;
           ground.velocityX = 0;
           textSize(30);
           fill("red");
           text("GAME OVER!",225,150);
           obstaclesGroup.setVelocityXEach(0);
           foodGroup.setVelocityXEach(0);
           obstaclesGroup.setLifetimeEach(-1);
           foodGroup.setLifetimeEach(-1);
        }
   
   if (monkey.isTouching(obstaclesGroup))
     {
       hits = hits+1
       obstaclesGroup.destroyEach();
       monkey.scale = +0.1;
    }  
   
     obstaclesGroup.depth = ground.depth;
     obstaclesGroup.depth = obstacles.depth+1;
   
  
    drawSprites();
    textSize(20);
    fill("black");
    stroke("black");
    text("survivaltime:"+survivalTime,225,40);
  
    textSize(15);
    stroke("black")
    text("bananas:"+bananas,250,70);
   
   textSize(15);
   stroke("black");
   text("HITS:"+hits,255,100);

 }

function food ()
 {
   if (frameCount%110 === 0)
     {
         banana = createSprite(600,200,20,20);
         banana.velocityX = -(5+survivalTime/5);
         banana.addImage("banana",bananaImage);
         banana.scale = 0.15;
         banana.lifetime = 115;
         foodGroup.add(banana);
     }   
 }

function obstacles ()
 {
    if (frameCount%510 === 0)
      {
        rock = createSprite(600,425,20,20);
        rock.velocityX = -(5+survivalTime/5);
        rock.addImage("rock",rockImage);
        rock.scale = 0.2;
        rock.lifetime = 115;
        obstaclesGroup.add(rock);
      }
 }
