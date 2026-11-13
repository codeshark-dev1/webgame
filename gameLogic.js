//this file contains game logic only
//many helpers are used, these are found in the helpers.js file

//screen bounds + offset so no glitching out of screen
const screenWidth = window.innerWidth - 105; //magic offset! (previous player move amount was 7, multiplied by 15 gives 105... woooo magic)
const screenHeight = window.innerHeight - 105;

const moveAmount = 12;
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const coin = document.getElementById("coin");
const coinCounter = document.getElementById("score_counter");
var coinsCollected = 0;

console.log("Screen size: " + screenWidth + " " + screenHeight);

//start player in middle of the screen
initialize();

function initialize(){
    move(player, screenWidth / 2, screenHeight / 2);

    randomizePosition(enemy);
    randomizePosition(coin);
}

function move(elem, x, y){
    const rect = elem.getBoundingClientRect();
    const newX = clamp(rect.x + x, 0, screenWidth);
    const newY = clamp(rect.y + y, 0, screenHeight);

    elem.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

function randomizePosition(elem){
    let randX = Math.random() * (screenWidth - 50);
    randX = maybeTurnNegative(randX);

    let randY = Math.random() * (screenHeight - 50);
    randY = maybeTurnNegative(randY);

    move(elem, randX, randY);
    console.log(`Moving ${elem.id}, to ${randX}, ${randY}`);
}

function maybeTurnNegative(value){
    return Math.random() < 0.5 ? value : -value;
}

function handleEnemyMovement(){
    //1) get rects of player and enemy
    //2) calculate where to move to go towards player
    //3) move enemy in that direction
}

document.addEventListener("keydown", function (event){
    event.preventDefault();

    if (event.key == "r")
        window.location.reload();
    else if (!event.key.startsWith("Arrow"))
        return;

    let xMoveAmount = 0;
    let yMoveAmount = 0;

    //todo: allow two key presses at once
    switch(event.key)
    {
        case "ArrowRight":
            xMoveAmount += moveAmount;
            break;
        case "ArrowLeft":
            xMoveAmount -= moveAmount;
            break;
        case "ArrowDown":
            yMoveAmount += moveAmount;
            break;
        case "ArrowUp":
            yMoveAmount -= moveAmount;
            break;
    }

    move(player, xMoveAmount, yMoveAmount);

    if (isColliding(player, coin)){
        randomizePosition(coin);
        coinsCollected++;
        updateCoinCounter();
    }
});