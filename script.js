const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");
const buttonSave = document.querySelector(".button__save");

let brushSize = 30;
let isPainting = false;
let activeTool = "brush";

// Inicialização
ctx.fillStyle = inputColor.value;
ctx.strokeStyle = inputColor.value;
ctx.lineJoin = "round";
ctx.lineCap = "round";

// Função para destacar botão ativo
function setActiveButton(buttons, activeButton) {
    buttons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Eventos de cor
inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
    ctx.strokeStyle = target.value;
});

// Eventos do canvas
canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    
    if (activeTool === "brush") {
        draw(e.clientX, e.clientY);
    } else if (activeTool === "rubber") {
        erase(e.clientX, e.clientY);
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (isPainting) {
        if (activeTool === "brush") {
            draw(e.clientX, e.clientY);
        } else if (activeTool === "rubber") {
            erase(e.clientX, e.clientY);
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isPainting = false;
    ctx.beginPath(); // Importante para evitar linhas indesejadas
});

canvas.addEventListener("mouseleave", () => {
    isPainting = false;
    ctx.beginPath();
});

// Funções de desenho
const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"; // Restaura o modo normal após usar a borracha
    
    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = x - canvasRect.left;
    const canvasY = y - canvasRect.top;
    
    ctx.beginPath();
    ctx.arc(
        canvasX,
        canvasY,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    
    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = x - canvasRect.left;
    const canvasY = y - canvasRect.top;
    
    ctx.beginPath();
    ctx.arc(
        canvasX,
        canvasY,
        brushSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
};

// Seleção de ferramentas
tools.forEach((tool) => {
    tool.addEventListener("click", (e) => {
        const selectedTool = e.currentTarget;
        const action = selectedTool.getAttribute("data-action");
        
        if (action) {
            activeTool = action;
            setActiveButton(tools, selectedTool);
        }
    });
});

// Seleção de tamanhos
sizeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const selectedSize = e.currentTarget;
        brushSize = parseInt(selectedSize.getAttribute("data-size"));
        setActiveButton(sizeButtons, selectedSize);
    });
});

// Limpar canvas
buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Salvar imagem
buttonSave && buttonSave.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "desenho.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// Ajustar canvas para tela responsiva
function resizeCanvas() {
    const container = document.querySelector(".canvas-container");
    if (container.clientWidth < canvas.width) {
        const scale = container.clientWidth / canvas.width;
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transformOrigin = "top left";
    } else {
        canvas.style.transform = "none";
    }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
