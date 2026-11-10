const moveAmount = 7;
const player = document.getElementById("player");
//same for enemy
const coin = document.getElementById("coin");

//screen bounds + offset so no glitching out of screen
const screenWidth = window.innerWidth - moveAmount * 15;
const screenHeight = window.innerHeight - moveAmount * 15;

//start player in middle of the screen
player.style.transform = `translate(${String(screenWidth / 2)}px, ${String(screenHeight / 2)}px)`;
randomizePosition(coin);

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
    rect = objectToMove.getBoundingClientRect();
    newX = clamp(rect.x + x, 0, screenWidth);
    newY = clamp(rect.y + y, 0, screenHeight);

    objectToMove.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

function randomizePosition(target){
    randX = Math.random() * (screenWidth + 1);
    randY = Math.random() * (screenHeight + 1);
    target.style.transform = `translate(${String(randX)}px, ${String(randY)}px)`;
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
});