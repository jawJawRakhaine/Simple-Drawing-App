const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let color = document.getElementById("color");
let size = document.getElementById("size");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 200;
let position = canvas.getBoundingClientRect();

let painting = false;
function startPainting(e) {
  painting = true;
  draw(e);
}
function finishedPainting() {
  painting = false;
  ctx.beginPath();
}
function draw(e) {
  if (!painting) return;
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
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

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
