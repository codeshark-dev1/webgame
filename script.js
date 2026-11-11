const moveAmount = 7;
const player = document.getElementById("player");
//same for enemy
const coin = document.getElementById("coin");

//screen bounds + offset so no glitching out of screen
const screenWidth = window.innerWidth - moveAmount * 15;
const screenHeight = window.innerHeight - moveAmount * 15;

//start player in middle of the screen
move(player, screenWidth / 2, screenHeight / 2);
randomizePosition(coin);

function isColliding(elem1, elem2){
    //the entire game consists of circles
    const c1 = elem1.querySelector("circle");
    const c2 = elem2.querySelector("circle");
    
    if (c1 == null || c2 == null)
        return false;

    //get required values
    const r1 = Number(c1.getAttribute("r"));
    const r2 = Number(c2.getAttribute("r"));
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    //calculate distances
    const xDist = Math.pow(rect2.x - rect1.x, 2);
    const yDist = Math.pow(rect2.y - rect1.y, 2);
    const rSum = Math.pow(r1 + r2, 2);

    //check if circles are colliding
    return xDist + yDist <= rSum;
}

//TODO: move this to dedicated helpers file
function isNumber(number) {
  return typeof number === 'number' && !isNaN(number)
}

function clamp(number, lower, upper) {
  if (!isNumber(number) || !isNumber(lower) || !isNumber(upper)) {
    throw new Error('All inputs must be valid numbers.')
  }
  
  return Math.min(Math.max(number, lower), upper)
}

function move(objectToMove, x, y){
    const rect = objectToMove.getBoundingClientRect();
    const newX = clamp(rect.x + x, 0, screenWidth);
    const newY = clamp(rect.y + y, 0, screenHeight);

    objectToMove.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

function randomizePosition(target){
    const randX = Math.random() * (screenWidth + 1);
    const randY = Math.random() * (screenHeight + 1);
    move(target, randX, randY);
}

document.addEventListener("keydown", function (event){
    if (event.defaultPrevented)
        return; //do nothing if the event was already handled

    //todo: allow two key presses at once
    switch(event.key)
    {
        case "ArrowRight":
            move(player, moveAmount, 0);
            break;
        case "ArrowLeft":
            move(player, -moveAmount, 0);
            break;
        case "ArrowDown":
            move(player, 0, moveAmount);
            break;
        case "ArrowUp":
            move(player, 0, -moveAmount);
            break;
    }

    console.log(isColliding(player, coin));
});