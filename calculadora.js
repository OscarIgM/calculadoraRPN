let stack = [];
let inputBuffer = "";

function updateDisplay() {
    const stackDisplay = document.getElementById("stack-display");
    stackDisplay.textContent = stack.join(" ");

    updateInputDisplay();
}

function updateInputDisplay() {
    const inputDisplay = document.getElementById("input");
    inputDisplay.textContent = inputBuffer;
}

function appendDigit(digit) {
    inputBuffer += digit.toString();
    updateInputDisplay();
}

function enterNumber() {
    if (inputBuffer.trim() === "") return;

    if (!/^-?\d+(\.\d+)?$/.test(inputBuffer)) {
        alert("Solo se permiten números enteros.");
        inputBuffer = "";
        updateInputDisplay();
        return;
    }

    const value = parseFloat(inputBuffer);

    if (isNaN(value) || !Number.isInteger(value)) {
        alert("Solo se permiten números enteros.");
        inputBuffer = "";
        updateInputDisplay();
        return;
    }

    stack.push(value);
    inputBuffer = "";
    updateDisplay();
}

function clearInput() {
    inputBuffer = "";
    updateInputDisplay();
}

function clearAll() {
    stack = [];
    inputBuffer = "";
    updateDisplay();
}

function changeSign() {
    if (inputBuffer.startsWith("-")) {
        inputBuffer = inputBuffer.slice(1);
    } else if (inputBuffer.length > 0) {
        inputBuffer = "-" + inputBuffer;
    }
    updateInputDisplay();
}

function dropItem() {
    stack.pop();
    updateDisplay();
}

function swapItems() {
    if (stack.length < 2) {
        alert("Se necesitan al menos dos elementos para intercambiar.");
        return;
    }

    const a = stack.pop();
    const b = stack.pop();
    stack.push(a);
    stack.push(b);

    updateDisplay();
}

function duplicateItem() {
    if (stack.length === 0) {
        alert("La pila está vacía.");
        return;
    }

    stack.push(stack[stack.length - 1]);
    updateDisplay();
}

function hasEnoughOperands() {
    return stack.length >= 2;
}

function performOperation(op) {
    enterNumber(); 

    if (!hasEnoughOperands()) {
        alert("Faltan operandos para realizar el cálculo.");
        return;
    }

    const b = stack.pop();
    const a = stack.pop();
    let result;

    switch (op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b); 
            break;
        case '*':
            result = multiply(a, b); 
            break;
        case '/':
            if (b === 0) {
                alert("Error: División por cero");
                stack.push(a, b); 
                return;
            }
            result = divide(a, b); 
            break;
        default:
            alert("Operación no válida");
            stack.push(a, b); 
            return;
    }

    stack.push(result); 
    updateDisplay(); 
}

// Metodo que controla la entrada por teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/^\d$/.test(key)) {
        appendDigit(parseInt(key));
    } else if (['+', '-', '*', '/'].includes(key)) {
        performOperation(key);
    } else if (key === 'Enter') {
        enterNumber();
    } else if (key === 'Backspace') {
        clearInput();
    } else if (key === '.') {
        event.preventDefault();
        alert("No se permiten números decimales.");
    } else {
        // Ignorar cualquier otra tecla
        event.preventDefault();
    }
});

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) return null;
    return a / b;
}

document.addEventListener('DOMContentLoaded', () => {
    // Listeners para dígitos
    document.querySelectorAll('.digit').forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.textContent.trim();
            appendDigit(parseInt(digit));
        });
    });

    // Listeners para operaciones básicas
    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => {
            const symbol = button.textContent.trim();
            const opMap = { '×': '*', '−': '-', '+': '+', '/': '/' };
            performOperation(opMap[symbol] || symbol);
        });
    });

    // Listener par botón de ENTER
    const enterBtn = document.querySelector('.enter');
    if (enterBtn) {
        enterBtn.addEventListener('click', enterNumber);
    }

    // Listener para acciones a la pila
    document.querySelectorAll('.function').forEach(button => {
        const action = button.dataset.action;
        if (!action) return;

        button.addEventListener('click', () => {
            switch (action) {
                case 'dropItem': dropItem(); break;
                case 'swapItems': swapItems(); break;
                case 'duplicateItem': duplicateItem(); break;
                case 'clearAll': clearAll(); break;
                case 'clearInput': clearInput(); break;
                case 'changeSign': changeSign(); break;
                default: console.warn('Acción desconocida:', action);
            }
        });
    });
});

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    hasEnoughOperands,
    performOperation,
    appendDigit,
    enterNumber,
    clearInput,
    clearAll,
    changeSign,
    dropItem,
    swapItems,
    duplicateItem,
    getStack: () => stack,
    setStack: (newStack) => { stack = newStack; },
    getInputBuffer: () => inputBuffer,
    setInputBuffer: (val) => { inputBuffer = val; }
};