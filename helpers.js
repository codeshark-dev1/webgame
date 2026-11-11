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

//TODO: move these to dedicated helpers file
function isNumber(number) {
  return typeof number === 'number' && !isNaN(number)
}

function clamp(number, lower, upper) {
  if (!isNumber(number) || !isNumber(lower) || !isNumber(upper)) {
    throw new Error('All inputs must be valid numbers.')
  }
  
  return Math.min(Math.max(number, lower), upper);
}

function updateCoinCounter(){
    coinCounter.innerHTML = "Score: " + String(coinsCollected);
}