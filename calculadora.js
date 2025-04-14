




function performOperation(op) {
    ensureInputIsEntered();

    if (!hasEnoughOperands()) return;

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
            result = divide(a, b);
            break;
        default:
            alert(`Operación no soportada: ${op}`);
            stack.push(a, b);
            return;
    }

    if (result !== null && result !== undefined) {
        stack.push(result);
    }

    updateDisplay();
}


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
    if (b === 0) {
        alert("Error: División por cero");
        return null;
    }
    return a / b;
}

module.exports = { add, subtract, multiply, divide};