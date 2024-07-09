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

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function gameEngine(){
    // UPDATING SNAKE SIZE AND FOOD
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

    }
});
