import './styles.css';

const output = document.getElementById('output');
const list = document.getElementById('list');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rectList = [];

function addRectToList(rect) {
  rectList.push(rect);
  const listItem = document.createElement('li');
  listItem.setAttribute('data-index', rectList.length - 1);
  listItem.innerHTML = `<pre>${JSON.stringify(rect)}</pre>`;
  list.appendChild(listItem);
}

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

function handleResultHover(e) {
  const listItem = e.target.closest('li');
  if (!listItem) return;
  const index = listItem.dataset.index;
  const { originX, originY, endX, endY } = rectList[index];
  clearCanvas();
  drawSquare(originX, originY, endX, endY);
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
  canvas.addEventListener(
    'mouseup',
    () => {
      if (endX && endY) {
        const rect = {
          originX,
          originY,
          endX,
          endY
        };
        const outputText = JSON.stringify(rect);
        addRectToList(rect);
        output.innerHTML = `<span>${outputText}</span>`;
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
    },
    { once: true }
  );
}

canvas.addEventListener('mousedown', handleMouseDown);
list.addEventListener('mouseover', handleResultHover);
