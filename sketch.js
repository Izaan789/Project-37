var dog,sadDog,happyDog;
var database;
var foodStock,foodS = 0;
var lastFed,fedtime,feed,addfood;
var food1;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  food1 = new Food();

  feed = createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })

  
  textSize(15)
  fill("red")
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30)
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM",350,30)
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,30)
  }

  food1.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val()
  food1.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  food1.updateFoodStock(food1.getFoodStock()-1)
  database.ref('/').update({
    Food:food1.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}