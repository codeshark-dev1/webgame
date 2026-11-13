//this file contains game logic only
//many helpers are used, these are found in the helpers.js file

//screen bounds + offset so no glitching out of screen
const screenWidth = window.innerWidth - 105; //magic offset! (previous player move amount was 7, multiplied by 15 gives 105... woooo magic)
const screenHeight = window.innerHeight - 105;

//step size of moveable objects (e.g. the player)
const moveStep = 12;

const player = document.getElementById("player");

const enemy = document.getElementById("enemy");
const lerpMoveMultiplier = 0.0005;

const coin = document.getElementById("coin");
const coinCounter = document.getElementById("score_counter");
let coinsCollected = 0;

initialize();

function initialize(){
    if (player == null || enemy == null || coin == null)
        return;

    //start player in middle of the screen
    move(player, screenWidth / 2, screenHeight / 2);

    randomizePosition(enemy);
    randomizePosition(coin);
    
    window.setInterval(moveAToB, 15, enemy, player);
}

function randomizePosition(elem){
    if (elem == null)
        return;

    const randX = maybeTurnNegative(Math.random() * (screenWidth - 50));
    const randY = maybeTurnNegative(Math.random() * (screenHeight - 50));

    move(elem, randX, randY);
}

function maybeTurnNegative(value){
    return Math.random() < 0.5 ? value : -value;
}

//work in progress name
//linearly interpolates position of elem1 to position of elem2
function moveAToB(elem1, elem2){
    if (elem1 == null || elem2 == null)
        return;

    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    //maybe not make it linear because its not really what I want but its fine for now
    let xMoveAmount = (rect2.x - rect1.x) * moveStep * lerpMoveMultiplier;
    let yMoveAmount = (rect2.y - rect1.y) * moveStep * lerpMoveMultiplier;
    move(elem1, xMoveAmount, yMoveAmount);
}

function move(elem, x, y){
    const rect = elem.getBoundingClientRect(); //maybe save rects as variables and pass to functions?
    const newX = clamp(rect.x + x, 0, screenWidth);
    const newY = clamp(rect.y + y, 0, screenHeight);

    elem.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

document.addEventListener("keydown", function (event){
    event.preventDefault();

    if (event.key == "r")
        window.location.reload();
    else if (player == null || coin == null || !event.key.startsWith("Arrow"))
        return;

    let xMoveAmount = 0;
    let yMoveAmount = 0;

    //todo: allow two key presses at once
    switch(event.key)
    {
        case "ArrowRight":
            xMoveAmount += moveStep;
            break;
        case "ArrowLeft":
            xMoveAmount -= moveStep;
            break;
        case "ArrowDown":
            yMoveAmount += moveStep;
            break;
        case "ArrowUp":
            yMoveAmount -= moveStep;
            break;
    }

    move(player, xMoveAmount, yMoveAmount);

    if (isColliding(player, coin)){
        randomizePosition(coin);
        coinsCollected++;
        updateCoinCounter();
    }
});