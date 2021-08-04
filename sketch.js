//declaring the variables
var boy;
var boyImg;
var cash ;
var cashImg;
var bg;
var rock,rockImg;
var dog,dogImg;
var cone,coneImg;
var cone;
var cash;
var rock;
var dog;
var END;

// create database and position variable here
var database ;
var position ; 
var updateHeight;

function preload(){
  //loading the images 
   bg =loadImage("bg.jpg");
   boyImg =loadImage("boy.png");
   cashImg=loadImage("cash.png");
   coneImg=loadImage("cone.png");
   rockImg=loadImage("rock.png");
   dogImg=loadImage("dog.png");
  }

function setup() {
 database=firebase.database();

  // creating the canvas
  createCanvas(1500,700);

  //creating the sprites
  boy=createSprite(250,450,150,150);
  boy.addImage(boyImg);
  boy.scale=0.6;
  
  cash=createSprite(600,550,150,150);
  cash.addImage(cashImg);
  cash.scale=0.4;
  cash.visible = false ;
  
  cone=createSprite(800,270,150,150);
  cone.addImage(coneImg);
  cone.scale=0.4;
  cone.visible = false ;

  dog=createSprite(700,630,150,150);
  dog.addImage(dogImg);
  dog.scale=0.4;
  dog.visible = false ;

  rock=createSprite(830,380,150,150);
  rock.addImage(rockImg);
  rock.scale=0.4;
  rock.visible = false ;

  var boyPosition=database.ref('boy/height')
  boyPosition.on("value",readHeight)
  
   
}

function draw() {

 //loading background
  background(bg);
  
  // to move the boy
  if(keyDown(LEFT_ARROW)){
    boy.x=boy.x-10;
  }
  else if(keyDown(RIGHT_ARROW)){
    boy.x=boy.x+10;
  }
  if(keyDown(UP_ARROW)){
    boy.y=boy.y-10;
  }
  else if(keyDown(DOWN_ARROW)){
    boy.y=boy.y+10;
  }

  //to see the x and y position 
  // text(mouseX+','+mouseY,10,75) 
    
// to randomly make the obstacles and the cash appear
if(frameCount===40){
  cash.visible= true ; 
  cash.velocityX=-1;
}
if(frameCount===100){
  cone.visible= true ; 
  cone.velocityX=-1;
  }
if(frameCount===250){
  dog.visible= true ; 
  dog.velocityX=-1;
  }
if(frameCount===300){
  rock.visible= true ; 
  rock.velocityX=-1;
  }


// to detect when the game is over

 if(cash.isTouching(boy)){
   cash.destroy();
}

if(cone.isTouching(boy)){
  cone.velocityX = 0 ;
  cone.destroyEach();
  console.log("YOU LOST REFRESH THE PAGE AND TRY AGAIN ")
  END();
}

if(dog.isTouching(boy)){
  dog.velocityX = 0 ;
  dog.destroyEach(); 
  console.log("YOU LOST REFRESH THE PAGE AND TRY AGAIN ")
  END();
}

if(rock.isTouching(boy)){
  rock.velocityX = 0 ;
  rock.destroyEach();
  console.log("YOU LOST REFRESH THE PAGE AND TRY AGAIN ")
  END();
  }


// text instruction
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move the boy.Try not to stay too close to the obstacles!!!if the screen is blank that means YOU LOST",40,40);

  drawSprites();
}

function updateHeight(x,y){
 database.ref('boy/height').set({
 'x': height.x + x ,
 'y': height.y + y
})}

function readHeight(data){
 height = data.val();
 boy.x = height.x;
 boy.y = height.y; 
}
  // game end funtion 
  
  function END(){

    // changing visiblity
    cash.visible = false ;
    cone.visible = false ;
    rock.visible = false ;
    dog.visible = false ;
  
    // to destroy the objects when the game is over
    rock.destroyEach();
    cash.destroyEach();
    cone.destroyEach();
    dog.destroyEach();

    // changing the velocity to zero
    dog.velocityX=0;
    rock.velocityX=0;
    cone.velocityX=0;
    cash.velocityX=0;

    // text to let the player know that they lost
    fill("green")
    textSize(45)
    text("GAME OVER",600,165)

      }
  
  
  
  



 

