const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".buttom__tool");
const sizeButtoms = document.querySelector(".buttom__size");
const buttomClear = document.querySelector(".buttom__clear");

let brushSize = 30;

let isPainting = false;

let activeTool = "brush";

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    draw(clientX, clientY);
    isPainting = true;

    if (activeTool == "brush") {
        draw(clientX, clientY);
    }

    if (activeTool == "rubber") {
        erase(clientX, clientY);
    }
});

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        if (activeTool == "brush") {
            draw(clientX, clientY);
        }

        if (activeTool == "rubber") {
            erase(clientX, clientY);
        }
    }
});

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPainting = false;
});

const draw = (x, y) => {
    ctx.beginPath();

    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};

const selectTool = ({ target }) => {
    const selectTool = target.closest("buttom");
    const action = selectTool.getAttribute("data-action");
    if (action) {
        activeTool = action;
    }
};

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool);
});
