const moveAmount = 7;
const player = document.getElementById("player");
//same for enemy

alert(window.innerWidth);

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
    newX = rect.x + x;
    newY = rect.y + y;

    objectToMove.style.transform = `translate(${String(newX)}px, ${String(newY)}px)`;
}

document.addEventListener("keydown", function (event){
    if (event.defaultPrevented)
        return; //do nothing if the event was already handled

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