const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".buttom__tool");
const sizeButtoms = document.querySelector(".buttom__size");
const buttomClear = document.querySelector(".buttom__clear");

let brushSize = 10;

canvas.addEventListener("mousedown", (event) => {
    const { clientX, clientY } = event;
    draw(clientX, clientY);
});

const draw = (x, y) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(x, y, brushSize, brushSize);
};
