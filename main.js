
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


function createImage(context, imagePath, cpos, ypos, width, hright) {
  const myImage = new Image();
  myImage.src = "assets/img/Picture3.png";
  console.log("tree")
  myImage.onload = function () {
    context.drawImage(myImage, 30,200,100, 100);
  };
  const myImage4 = new Image();
  myImage4.src = "assets/img/Picture3.png";
  console.log("tree")
  myImage4.onload = function () {
    context.drawImage(myImage4, 600,200,100, 100);
  };
  const mytree1 = new Image();
  mytree1.src = "assets/img/Picture2.png";
  console.log("tree")
  mytree1.onload = function () {
    context.drawImage(mytree1, 10,10,100, 100);
  };
  const mytree5 = new Image();
  mytree5.src = "assets/img/Picture2.png";
  console.log("tree")
  mytree5.onload = function () {
    context.drawImage(mytree5, 600,10,100, 100);
  };
  const mytree2 = new Image();
  mytree2.src = "assets/img/tree.png";
  console.log("tree")
  mytree2.onload = function () {
    context.drawImage(mytree2,300,40,100,100);
  };
  const mytree6 = new Image();
  mytree6.src = "assets/img/tree.png";
  console.log("tree")
  mytree6.onload = function () {
    context.drawImage(mytree6,400,300,100,100);
  };
  const mytree3 = new Image();
  mytree3.src = "assets/img/Picture2.png";
  console.log("tree")
  mytree3.onload = function () {
    context.drawImage(mytree3,200,200,100,100);
  };
}
// let image = new Image('car.png',50,50,100,100);
// createImage(ctx,'car.png' ,234,-687 );
// 

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
  { x: 40, y:  canvas.height  - treeHeight - 200 },
  { x: 100, y: canvas.height - treeHeight - 100 },
  { x: 600, y: canvas.height - treeHeight - 50 },
  { x: 650, y: canvas.height - treeHeight - 200 },
  { x: 300, y: canvas.height - treeHeight - 300 },
  { x: 400, y: canvas.height - treeHeight - 300 }
];
trees.forEach(tree => {
  createImage(ctx, "car.png", tree.x, tree.y, treeWidth, treeHeight);
});

// Finish line properties
const finishLineY = 10;

// Event listeners for arrow key controls
document.addEventListener("keydown", (event) => {
  
update();
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
  
update();
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
function update(){
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  createImage(ctx, "car.png", carX, carY, treeWidth, treeHeight)

  // Draw trees
  trees.forEach(tree => {
    createImage(ctx, "tree.png", tree.x, tree.y, treeWidth, treeHeight)
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
}
  requestAnimationFrame(update);

// Load car image
const carImage = new Image();
carImage.src = "assets/img/car.png";
carImage.onload = function () {
  // Once the car image is loaded, start the game loop
  update();
};

// Draw car
function drawCar() {
  ctx.drawImage(carImage, carX, carY, carWidth, carHeight);
}

// Draw finish line
function drawFinishLine() {
  ctx.fillStyle = "red";
  ctx.fillRect(10, finishLineY, canvas.width - 20, 5);
}

// // ... (rest of your code)

// Update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  drawCar();

  // Draw trees
  trees.forEach(tree => {
    createImage(ctx, "tree.png", tree.x, tree.y, treeWidth, treeHeight);
  });

  // Draw finish line

  // Load finish image
const finishImage = new Image();
finishImage.src = "assets/img/finish.png";
finishImage.onload = function () {
  // Once the finish image is loaded, start the game loop
  update();
};

// Draw finish image
function drawFinishImage() {
  ctx.drawImage(finishImage, 10, finishLineY, canvas.width - 20, 5);
}
// Update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  requestAnimationFrame(update);
}


  drawFinishLine();

  // ... (collision checks and other logic)

  // Check if car crossed the finish line
  if (carY < finishLineY) {
    alert("Congratulations! You crossed the finish line.");
    document.location.reload();
  }
 }
