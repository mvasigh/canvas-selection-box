import './styles.css';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawSquare(originX, originY, endX, endY) {
  requestAnimationFrame(() => {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(originX, originY, endX - originX, endY - originY);
  });
}

function handleMouseDown(e) {
  addMouseMoveListener(e.offsetX, e.offsetY);
}

function addMouseMoveListener(originX, originY) {
  let endX, endY;
  function handleMouseMove(e) {
    clearCanvas();
    endX = e.offsetX;
    endY = e.offsetY;
    drawSquare(originX, originY, endX, endY);
  }
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', () => {
    if (endX && endY) {
      console.log({
        originX,
        originY,
        endX,
        endY
      });
    }
    canvas.removeEventListener('mousemove', handleMouseMove);
  });
}

canvas.addEventListener('mousedown', handleMouseDown);
