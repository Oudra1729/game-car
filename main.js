const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");





//Image
class Image {
    constructor(imagePath,xpod,ypos ,width, height){
        this.imagePath=imagePath;
        this.xPos= xpod ;
        this.yPos= ypos;
        this.height=height;
        this.width= width;

    }
}
function createImage(cotexte,imagePath,cpos,ypos,width,hright){
    let myImage = document.createElement('img');
    myImage.src = imagePath;
    myImage.onload= function(){
        context.drawImage(this, cpos, ypos, width, hright);
    };
    }
let image = new Image('car.png',50,50,100,100);
createImage(ctx,'car.png' ,234,-687 );
//

const treeImage = new Image();
treeImage.src = "maxresdefault.png";

// Car properties
const carWidth = 50;
const carHeight = 30;
let carX = 50;
let carY = canvas.height - carHeight - 10;

// Control properties
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

// Trees (obstacles) properties
const treeWidth = 30;
const treeHeight = 50;
const trees = [
    { x: 300, y: canvas.height - treeHeight - 150 },
    { x: 40, y: canvas.height - treeHeight - 200 },
    { x: 100, y: canvas.height - treeHeight - 100 },
    { x: 600, y: canvas.height - treeHeight - 50 },
    { x: 650, y: canvas.height - treeHeight - 200 },
    { x: 300, y: canvas.height - treeHeight - 300},
    { x: 400, y: canvas.height - treeHeight - 300 }
];
trees.forEach(tree => {
    ctx.drawImage(treeImage, tree.x, tree.y, treeWidth, treeHeight);
    });

// Finish line properties
const finishLineY = 10;

// Event listeners for arrow key controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
    upPressed = true;
    } else if (event.key === "ArrowDown") {
    downPressed = true;
    } else if (event.key === "ArrowLeft") {
    leftPressed = true;
    } else if (event.key === "ArrowRight") {
    rightPressed = true;
    }
});

// In the trees.forEach loop for collision detection, update the collision check to use image coordinates
trees.forEach(tree => {
    if (
        carX < tree.x + treeWidth &&
        carX + carWidth > tree.x &&
        carY < tree.y + treeHeight &&
        carY + carHeight > tree.y
    ) {
        alert("Game Over! You hit a tree.");
        document.location.reload();
    }
    });

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
    upPressed = false;
    } else if (event.key === "ArrowDown") {
    downPressed = false;
    } else if (event.key === "ArrowLeft") {
    leftPressed = false;
    } else if (event.key === "ArrowRight") {
    rightPressed = false;
    }
});

// Update function
function update() {
  // Clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

  // Update car position based on controls
    if (upPressed) {
    carY -= 2;
    } else if (downPressed) {
    carY += 2;
    } else if (leftPressed) {
    carX -= 2;
    } else if (rightPressed) {
    carX += 2;
    }

  // Draw car
    ctx.fillStyle = "blue";
    ctx.fillRect(carX, carY, carWidth, carHeight);

  // Draw trees
    ctx.fillStyle = "green";
    trees.forEach(tree => {
    ctx.fillRect(tree.x, tree.y, treeWidth, treeHeight);
    });

  // Draw finish line
    ctx.fillStyle = "red";
    ctx.fillRect(10, finishLineY, canvas.width, 5);

  // Check for collisions with trees
    trees.forEach(tree => {
    if (
        carX < tree.x + treeWidth &&
        carX + carWidth > tree.x &&
        carY < tree.y + treeHeight &&
        carY + carHeight > tree.y
    ) {
        alert("Game Over! You hit a tree.");
        document.location.reload();
    }
    });

  // Check if car crossed the finish line
    if (carY < finishLineY) {
    alert("Congratulations! You crossed the finish line.");
    document.location.reload();
    }

    requestAnimationFrame(update);
}

update();




