var bg,playButton;
var cannonLeft = 20;
var gameState = "start";
var enemyDestroyed = 0;
var shootSound = new Audio('sounds/shootSound.m4a');
var burstSound = new Audio('sounds/burstSound.m4a');
var tank,tankImg,cannon,cannonImg,cannonGroup,start;
var truck,truck1,truck2,truck3,truck4,truck5,truck6,truckGroup;
var armybase,armybase1,armybase2,armybase3,armybase4,armybaseGroup;
var vehicle,vehicle1,vehicle2,vehicle3,vehicle4,vehicle5,vehicle6,vehicleGroup;
var helicopter,helicopter1,helicopter2,helicopter3,helicopter4,helicopter5,helicopter6,helicopterGroup;

function preload(){
    bgA1 = loadImage("images/bgA1.jpg");
    bgA2 = loadImage("images/bgA2.jpg");
    bgB1 = loadImage("images/bgB1.jpg");
    bgB2 = loadImage("images/bgB2.jpg");
    start = loadImage("images/start.png");
    truck1 = loadImage("images/truck1.png");
    truck2 = loadImage("images/truck2.png");
    truck3 = loadImage("images/truck3.png");
    truck4 = loadImage("images/truck4.png");
    truck5 = loadImage("images/truck5.png");
    truck6 = loadImage("images/truck6.png");
    tank1Img = loadImage("images/tank1.png");
    tank2Img = loadImage("images/tank2.png");
    cannonImg = loadImage("images/cannon.png");
    gameOver = loadImage("images/gameOver.png");
    vehicle1 = loadImage("images/vehicle1.png");
    vehicle2 = loadImage("images/vehicle2.png");
    vehicle3 = loadImage("images/vehicle3.png");
    vehicle4 = loadImage("images/vehicle4.png");
    vehicle5 = loadImage("images/vehicle5.png");
    vehicle6 = loadImage("images/vehicle6.png");
    gameOver = loadImage("images/gameOver.png");
    armybase1  = loadImage("images/armybase1.png");
    armybase2  = loadImage("images/armybase2.png");
    armybase3  = loadImage("images/armybase3.png");
    armybase4  = loadImage("images/armybase4.png");
    helicopter1 = loadImage("images/helicopter1.png");
    helicopter2 = loadImage("images/helicopter2.png");
    helicopter3 = loadImage("images/helicopter3.png");
    helicopter4 = loadImage("images/helicopter4.png");
    helicopter5 = loadImage("images/helicopter5.png");
    helicopter6 = loadImage("images/helicopter6.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight-143);

    tank = createSprite(750,450);
    tank.debug = false;
    tank.setCollider("rectangle",0,50,260,450);

    randomBackground = Math.round(random(1,2));
    
    truckGroup = new Group();
    cannonGroup = new Group();
    vehicleGroup = new Group();
    armybaseGroup = new Group();
    helicopterGroup = new Group();

    startButton = createButton('PLAY');
    startButton.position(700,535);
    startButton.style("height","35px");
    startButton.style("width","140px");
    startButton.style('font-size','28px');
    startButton.style('background','rgb(80, 255, 240)');
}

function draw(){
    camera.position.x = displayWidth/2;
    camera.position.y = tank.y-190;

    if(randomBackground === 1){
        background(bgA1);
    }
    else{
        background(bgB1);
    }
    if(randomBackground === 1){
        image(bgA2,0,-12200,displayWidth,displayHeight*15);
        tank.addImage(tank1Img);
        tank.scale = 0.45; 
        fill(108, 52, 131);
        textSize(37);
        text("Enemy Destroyed: "+enemyDestroyed,1130,camera.position.y-290);
        textSize(37);
        text("Cannon Left: "+cannonLeft,60,camera.position.y-290);
    }
    else{
        image(bgB2,0,-12200,displayWidth,displayHeight*15);
        tank.addImage(tank2Img);
        tank.scale = 0.6;
        fill(255);
        textSize(37);
        text("Enemy Destroyed: "+enemyDestroyed,1130,camera.position.y-290);
        textSize(37);
        text("Cannon Left: "+cannonLeft,50,camera.position.y-290);
    }


    if(gameState === "play"){
        startButton.hide();
        if(cannonGroup.isTouching(vehicleGroup)){
            vehicleGroup.scale = 5;
            cannonGroup[0].destroy();
            vehicleGroup[0].destroy();
            enemyDestroyed = enemyDestroyed+1;
            cannonLeft = cannonLeft + 1;
            burstSound.play();
        }
        if(cannonGroup.isTouching(armybaseGroup)){
            armybaseGroup.scale = 5;
            cannonGroup[0].destroy();
            armybaseGroup[0].destroy();
            enemyDestroyed = enemyDestroyed+1;
            cannonLeft = cannonLeft + 1;
            burstSound.play();
        }
        if(cannonGroup.isTouching(helicopterGroup)){
            helicopterGroup.scale = 5;
            cannonGroup[0].destroy();
            helicopterGroup[0].destroy();
            enemyDestroyed = enemyDestroyed+1;
            cannonLeft = cannonLeft + 1;
            burstSound.play();
        }
        if(cannonGroup.isTouching(truckGroup)){
            cannonGroup[0].destroy();
            truckGroup[0].destroy();
            enemyDestroyed = enemyDestroyed+1;
            cannonLeft = cannonLeft + 1;
            truckGroup.scale = 5;
            burstSound.play();
        } 

        if(tank.isTouching(helicopterGroup)){
            gameState = "over";
        }
        if(tank.isTouching(truckGroup)){
            gameState = "over";
        }
        if(tank.isTouching(vehicleGroup)){
            gameState = "over";
        }
        if(tank.isTouching(armybaseGroup)){
            gameState = "over";
        }
        if(cannonLeft===0){
            gameState ="over";
        }
        base();
        choper();
        movement();
        vehicles();
        armyTruck();
    }

    if(gameState === "over"){
        console.log("GAME OVER");
        overImg = createSprite(760,camera.position.y);
        overImg.addImage(gameOver);
        overImg.scale = 0.5;
        restartButton = createButton('RESTART');
        restartButton.position(700,550);
        restartButton.style("height","30px");
        restartButton.style("width","150px");
        restartButton.style('font-size','24px');
        restartButton.style('background','rgb(7,200, 200)');
        restartButton.mousePressed(()=>{
            location.reload();
            restartButton.hide();
        })    
    }
    drawSprites(); 
    
    if(gameState === "start"){
        if(keyCode === 83){
           gameState = "play";
        }   
        startButton.mousePressed(()=>{gameState = "play"});
        image(start,0,-100,windowWidth,windowHeight);
        textSize(35);
        fill('white');
        text("Press SPACE! To Shoot",510,535);
        text("Use Arrow Keys To move The Tank",510,580);
    }


}

function keyPressed(){
    if(gameState === "play"){
       if(keyCode === 32 && cannonLeft>0){
        cannonBall();
        cannonLeft = cannonLeft - 1;
        shootSound.play();
        }
    }
}

function movement(){
    if(keyIsDown(UP_ARROW)){
        tank.y = tank.y-10;
    }
    if(keyIsDown(RIGHT_ARROW)){
        tank.x = tank.x+5;
    }
    if(keyIsDown(LEFT_ARROW)){
       tank.x = tank.x-5;
    }
}

function cannonBall(){
    cannon = createSprite(tank.x-1,tank.y-160);
    cannon.addImage(cannonImg);
    cannon.scale = 0.06;
    cannon.velocity.y = -50;
    cannonGroup.add(cannon);
}

function choper(){
    if(frameCount%500 === 0){
        helicopter = createSprite(random(200,1200),camera.position.y-500,25,25);
        r1 = Math.round(random(1,6));
        switch(r1){
            case 1 : helicopter.addImage(helicopter1);helicopter.scale = 0.8;helicopter.setCollider("rectangle",0,0,360,160);
            break;
            case 2 : helicopter.addImage(helicopter2);helicopter.scale = 0.85;helicopter.setCollider("rectangle",0,-20,360,150);
            break;
            case 3 : helicopter.addImage(helicopter3);helicopter.scale = 0.8;helicopter.setCollider("rectangle",0,-20,360,150);
            break;
            case 4 : helicopter.addImage(helicopter4);helicopter.scale = 0.8;helicopter.setCollider("rectangle",0,-20,360,200);
            break;
            case 5 : helicopter.addImage(helicopter5);helicopter.scale = 0.85;helicopter.setCollider("rectangle",0,-20,360,120);
            break;
            case 6 : helicopter.addImage(helicopter6);helicopter.scale = 0.85;helicopter.setCollider("rectangle",0,-10,360,120);
            break;
            default : break;
        }
        helicopterGroup.add(helicopter);
        helicopter.debug = false;
    }
}

function base(){
    if(frameCount%1000 === 0){
        armybase = createSprite(random(200,1200),camera.position.y-600,25,25);
        r2 = Math.round(random(1,6));
        switch(r2){
            case 1 : armybase.addImage(armybase1);armybase.scale = 0.9;armybase.setCollider("rectangle",0,0,350,180);
            break;
            case 2 : armybase.addImage(armybase2);armybase.scale = 0.8;armybase.setCollider("rectangle",0,0,400,220);
            break;
            case 3 : armybase.addImage(armybase3);armybase.scale = 0.9;armybase.setCollider("rectangle",0,0,400,200);
            break;
            case 4 : armybase.addImage(armybase4);armybase.scale = 1;armybase.setCollider("rectangle",0,0,360,200);
            break;
            default : break;
        }
        armybaseGroup.add(armybase);
        armybase.debug = false;
    }
}

function vehicles(){
    if(frameCount%250 === 0){
        vehicle = createSprite(random(150,600),camera.position.y-500,30,30);
        r3 = Math.round(random(1,6));
        switch(r3){
            case 1 : vehicle.addImage(vehicle1);vehicle.scale = 0.7;vehicle.setCollider("rectangle",0,0,350,150);
            break;
            case 2 : vehicle.addImage(vehicle2);vehicle.scale = 0.8;vehicle.setCollider("rectangle",0,0,250,120);
            break;
            case 3 : vehicle.addImage(vehicle3);vehicle.scale = 1;vehicle.setCollider("rectangle",0,0,200,100);
            break;
            case 4 : vehicle.addImage(vehicle4);vehicle.scale = 1;vehicle.setCollider("rectangle",0,0,200,100);
            break;
            case 5 : vehicle.addImage(vehicle5);vehicle.scale = 0.28;vehicle.setCollider("rectangle",0,0,650,350);
            break;
            case 6 : vehicle.addImage(vehicle6);vehicle.scale = 0.6;vehicle.setCollider("rectangle",0,0,350,220);
            break;
            default : break;
        }
        vehicleGroup.add(vehicle);
        vehicle.debug = false;
    }
}

function armyTruck(){
    if(frameCount%200 === 0){
        truck = createSprite(random(150,1300),camera.position.y-400,30,30);
        r4 = Math.round(random(1,6));
        switch(r4){
            case 1 : truck.addImage(truck1);truck.scale = 0.5;truck.setCollider("rectangle",0,+20,400,250);
            break;
            case 2 : truck.addImage(truck2);truck.scale = 0.5;truck.setCollider("rectangle",0,0,400,300);
            break;
            case 3 : truck.addImage(truck3);truck.scale = 1.1;truck.setCollider("rectangle",0,0,200,100);
            break;
            case 4 : truck.addImage(truck4);truck.scale = 0.6;truck.setCollider("rectangle",0,+10,680,180);
            break;
            case 5 : truck.addImage(truck5);truck.scale = 0.8;truck.setCollider("rectangle",0,0,500,120);
            break;
            case 6 : truck.addImage(truck6);truck.scale = 0.5;truck.setCollider("rectangle",0,0,500,170);
            break;
            default : break;
        }
        truckGroup.add(truck);
        truck.debug = false;
    }
}
