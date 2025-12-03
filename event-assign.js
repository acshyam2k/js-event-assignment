let gridSize = 16;

const button = document.createElement("button");
button.textContent = "Set Grid Size";
button.className = "grid-button";
document.body.appendChild(button);

const gridContainer = document.createElement("div");
gridContainer.className = "grid";
document.body.appendChild(gridContainer);

// prompt for new grid size and rebuild
button.addEventListener("click", () => {
  const answer = prompt("Enter grid size (1-100):", String(gridSize));
  if (answer === null) return; // user cancelled
  let n = Number(answer);
  if (!Number.isFinite(n) || Number.isNaN(n)) return;
  n = Math.floor(n);
  n = Math.max(1, Math.min(100, n));
  gridSize = n;
  createGrid(gridSize);
});

// simple pointer drawing: paint cell on pointerdown and while dragging
let isDrawing = false;
gridContainer.addEventListener("pointerdown", (e) => {
  if (!e.target.classList || !e.target.classList.contains("cell")) return;
  isDrawing = true;
  e.target.style.background = "black";
  try {
    gridContainer.setPointerCapture(e.pointerId);
  } catch (err) {}
});
gridContainer.addEventListener("pointermove", (e) => {
  if (!isDrawing) return;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el && el.classList && el.classList.contains("cell"))
    el.style.background = "black";
});
document.addEventListener("pointerup", (e) => {
  if (isDrawing) isDrawing = false;
  try {
    gridContainer.releasePointerCapture(e.pointerId);
  } catch (err) {}
});

// initial build
createGrid(gridSize);

function createGrid(size) {
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    frag.appendChild(cell);
  }
  gridContainer.appendChild(frag);
}
