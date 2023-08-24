const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");
const doneButton = document.getElementById("doneButton");
const configForm = document.getElementById("configForm");
const updateButton = document.getElementById("updateButton");

let squareSize = 20;
let numSquaresX = 28;
let numSquaresY = 28;

configForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCanvas();
});

updateButton.addEventListener("click", updateCanvas);

let drawing = false;
let drawingData = new Array(numSquaresY).fill(0).map(() => new Array(numSquaresX).fill(0));

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
doneButton.addEventListener("click", saveAndClose);

function updateCanvas() {
    numSquaresX = parseInt(document.getElementById("width").value);
    numSquaresY = parseInt(document.getElementById("height").value);

    squareSize = Math.min(canvas.width / numSquaresX, canvas.height / numSquaresY);

    canvas.width = numSquaresX * squareSize;
    canvas.height = numSquaresY * squareSize;

    drawingData = new Array(numSquaresY).fill(0).map(() => new Array(numSquaresX).fill(0));

    context.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
    createLabels();
}

function createGrid() {
    context.strokeStyle = "gray";
    context.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += squareSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    for (let y = 0; y <= canvas.height; y += squareSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }
}

function createLabels() {
    context.font = "10px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
            context.fillText(`${i},${j}`, i * squareSize + squareSize / 2, j * squareSize + squareSize / 2);
        }
    }
}

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function draw(event) {
    if (!drawing) return;

    const col = Math.floor(event.offsetX / squareSize);
    const row = Math.floor(event.offsetY / squareSize);

    context.fillStyle = "black";
    context.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);

    drawingData[row][col] = 1;
}

function stopDrawing() {
    drawing = false;
}

function saveAndClose() {
    const tensorValues = JSON.stringify(drawingData);
    const pyCode = `import torch\n\nmask = torch.tensor(${tensorValues})`;

    const blob = new Blob([pyCode], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "drawing_data.py";
    a.textContent = "Download Drawing Data";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}
