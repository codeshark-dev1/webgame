//this file contains game logic only
//many helpers are used, these are found in the helpers.js file

//screen bounds + offset so no glitching out of screen
const screenWidth = window.innerWidth - 105; //magic offset! (previous player move amount was 7, multiplied by 15 gives 105... woooo magic)
const screenHeight = window.innerHeight - 105;
const collisionsUpdateDelay = 50;

//step size of moveable objects (e.g. the player)
const playerMoveSpeed = 400;

const player = document.getElementById("player");

const enemy = document.getElementById("enemy");
const enemyMoveStep = 1.5;
const enemyMoveDelay = 6; //ms

const coin = document.getElementById("coin");
const coinCounter = document.getElementById("score_counter");
let coinsCollected = 0;

//VISUAL EFFECTS
const playerTrailColors = ["#1863db", "#40C9FF", "#5c53ff"]
const enemyTrailColors = ["#db1822", "#ff3f48", "#850a10"];

initialize();

function initialize(){
    if (player == null || enemy == null || coin == null)
        return;

    //start player in middle of the screen
    move(player, screenWidth / 2, screenHeight / 2);

    randomizePosition(enemy);
    randomizePosition(coin);
    
    //start moving enemy to the player
    window.setInterval(moveAToB, enemyMoveDelay, enemy, player);
    //start handling collisions checks
    window.setInterval(handleCollisions, collisionsUpdateDelay);
}

function spawnTrail(elem, colors){
    //https://www.youtube.com/watch?v=lywTnNbRmlM
    
    const rect = elem.getBoundingClientRect();

    const trail = document.createElement("div");
    trail.className = "trail";
    const color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = color;

    const spread = 20;
    const offsetX = (Math.random() - 0.5) * spread;
    const offsetY = (Math.random() - 0.5) * spread;

    trail.style.left = (rect.x + 50 + offsetX) + 'px';
    trail.style.top = (rect.y + 50 + offsetY) + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 800);
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
function moveAToB(elem1, elem2){
    if (elem1 == null || elem2 == null)
        return;

    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    const dirX = rect2.x > rect1.x ? 1 : rect2.x == rect1.x ? 0 : -1;
    const dirY = rect2.y > rect1.y ? 1 : rect2.y == rect1.y ? 0 : -1;
    move(elem1, dirX * enemyMoveStep, dirY * enemyMoveStep);
}

function move(elem, x, y){
    const rect = elem.getBoundingClientRect(); //maybe save rects as variables and pass to functions?
    const newX = clamp(rect.x + x, 0, screenWidth);
    const newY = clamp(rect.y + y, 0, screenHeight);

    elem.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

function handleCollisions(){
    spawnTrail(enemy, enemyTrailColors);

    if (isColliding(player, enemy)){
        window.location.reload(); //for now
        //later: proper game over + save highscore and stuff
    }

    if (isColliding(player, coin)){
        randomizePosition(coin);
        coinsCollected++;
        updateCoinCounter();
    }
}

//keep track of state of each key
const keys = {};
document.addEventListener("keydown", e => {keys[e.key] = true; });
document.addEventListener("keyup", e => {keys[e.key] = false; });

let lastFrame = performance.now();
function gameLoop(){
    const now = performance.now();
    const deltaTime = (now - lastFrame) / 1000;
    lastFrame = now;

    let dx = 0;
    let dy = 0;

    if (keys["ArrowRight"]) dx += playerMoveSpeed * deltaTime;
    if (keys["ArrowLeft"]) dx -= playerMoveSpeed * deltaTime;
    if (keys["ArrowDown"]) dy += playerMoveSpeed * deltaTime;
    if (keys["ArrowUp"]) dy -= playerMoveSpeed * deltaTime;

    if (dx || dy){
        move(player, dx, dy);
        spawnTrail(player, playerTrailColors);
    }

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);