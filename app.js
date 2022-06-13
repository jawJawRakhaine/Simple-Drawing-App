window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth - 200;
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
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "orange";
    ctx.lineTo(e.clientX - position.left, e.clientY - position.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - position.left, e.clientY - position.top);
  }

  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", finishedPainting);
  canvas.addEventListener("mousemove", draw);
});
