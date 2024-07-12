// constants ans variables
let inputDrn = {x:0,y:0};
let gameOver = new Audio('./assests/game-over-arcade-6435.mp3');
let eatSound = new Audio('./assests/snake-hissing-6092.mp3');
let speed =2;
lastPaintTime=0;
let snakeSize=[
    {x:7,y:3}
]
food = {x:23,y:7}
let snakeElement;
let foodElement;

let grids = document.getElementById('grids');
let score=0;
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeSize.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 50 || snake[0].x <=0 || snake[0].y >= 50 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // UPDATING SNAKE SIZE AND FOOD
    if(isCollide(snakeSize)){
        gameOver.play()
        inputDrn =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeSize = [{x: 13, y: 15}];
        speed=2;
        score=0; 
    }

    if(snakeSize[0].y===food.y&&snakeSize[0].x===food.x){
        snakeSize.unshift({x:snakeSize[0].x+inputDrn.x,y:snakeSize[0].y+inputDrn.y});
        score+=1;
        speed+=1;
        scoreBox.innerHTML="Score:"+score;
        let a = 2;
        let b = 48;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake
    for(let i=snakeSize.length-2;i>=0;i--){
        snakeSize[i+1]={...snakeSize[i]};
    }
    snakeSize[0].x +=inputDrn.x;
    snakeSize[0].y+=inputDrn.y;

    // display snake
    grids.innerHTML = "";
    snakeSize.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        grids.appendChild(snakeElement);

    });
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        grids.appendChild(foodElement);


}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDrn ={x:0,y:1}  
    switch(e.key){
        case 'ArrowUp':
            eatSound.play();
            inputDrn.x=0;
            inputDrn.y=-1;
            break;
        case 'ArrowDown':
            eatSound.play();
            inputDrn.x=0;
            inputDrn.y=1;
            break;
        case 'ArrowRight':
            eatSound.play();
            inputDrn.x=1;
            inputDrn.y=0;
            break;
        case 'ArrowLeft':
            eatSound.play();
            inputDrn.x=-1;
            inputDrn.y=0;
            break;
        default:
                break;

    }
});
