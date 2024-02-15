const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".buttom__tool");
const sizeButtoms = document.querySelector(".buttom__size");
const buttomClear = document.querySelector(".buttom__clear");

let brushSize = 30;

ctx.fillStyle = "#000";

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    draw(clientX, clientY);
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
