const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var link;
var rabbit;
var button;

var backgroundImg;
var rabbitImg;
var fruitImg

var blinkAnim;
var eatAnim;
var sadAnim;

function preload(){
backgroundImg = loadImage('background.png')
rabbitImg = loadImage('Rabbit-01.png')
fruitImg = loadImage('melon.png')
blinkAnim = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eatAnim = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sadAnim = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
blinkAnim.playing = true
eatAnim.playing = true
sadAnim.playing = true
eatAnim.looping = false
sadAnim.looping = false
}

function setup() 
{

  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:245,y:30});
  blinkAnim.frameDelay = 20
  eatAnim.frameDelay = 20
  sadAnim.frameDelay = 20
  rabbit = createSprite(250,650,100,100)
  rabbit.addAnimation('blink',blinkAnim)
  rabbit.addAnimation('eat',eatAnim)
  rabbit.addAnimation('sad',sadAnim)
  rabbit.changeAnimation('blink')

  rabbit.scale=0.2
  button = createImg('cut_button.png')
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)

  
var options= {
density:0.001
}
  fruit = Bodies.circle(300,300,15,options);
  Matter.Composite.add(rope.body,fruit)

link = new Link (rope,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(backgroundImg,width/2,height/2,500,700)
  ground.show();
  rope.show()
  if(collide(fruit,rabbit)==true){
   rabbit.changeAnimation('eat',eatAnim)
  }
  else{
    rabbit.changeAnimation('sad')
  }

  if(collide(fruit,ground.body)==true){
    rabbit.changeAnimation('sad',sadAnim)
    console.log("sad")
  }
  
  if(fruit!=null){
  image(fruitImg,fruit.position.x,fruit.position.y,50,50)
  }
  
  Engine.update(engine);
  

 
  drawSprites()
}

function drop(){
  link.detatch()
  link = null
  rope.break()

}

function collide(body,sprite){
  if(body!=null){
    var dis = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(dis<=80){
    World.remove(world,fruit)
    fruit = null
    console.log(dis)
    return true
    
 }  
 else{
  console.log(dis)
  return false
 }
  }
}
