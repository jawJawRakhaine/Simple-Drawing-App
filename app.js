const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let color = document.getElementById("color");
let size = document.getElementById("size");
let lineCap = document.getElementById("lineCap");
let eraser = document.getElementById("eraser");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 200;
let position = canvas.getBoundingClientRect();

let painting = false;

// restore variable
let restore = [];
let index = -1;

function startPainting(e) {
  painting = true;
  draw(e);
}
function finishedPainting(e) {
  painting = false;
  ctx.beginPath();
  // restore
  if (e.type !== "mouseout") {
    restore.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index++;
  }
}
function draw(e) {
  if (!painting) return;
  ctx.lineWidth = size.value;
  ctx.lineCap = lineCap.value;
  ctx.strokeStyle = color.value;
  ctx.lineTo(e.clientX - position.left, e.clientY - position.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - position.left, e.clientY - position.top);
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", finishedPainting);
canvas.addEventListener("mousemove", draw);
// touch events
canvas.addEventListener("touchstart", startPainting);
canvas.addEventListener("touchend", finishedPainting);
canvas.addEventListener("touchmove", draw);

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  // clear the canvas
  clearCanvas();
  restore = [];
  index = -1;
});

// clear the canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// undo canvas
const undoBtn = document.getElementById("undo");
undoBtn.addEventListener("click", () => {
  if (index <= 0) {
    clearCanvas();
  } else {
    index--;
    restore.pop();
    ctx.putImageData(restore[index], 0, 0);
  }
});

function erase() {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.strokeStyle = "rgba(0,0,0,1)";
}
eraser.addEventListener("click", erase);
