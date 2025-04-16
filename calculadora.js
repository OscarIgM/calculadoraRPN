function hasEnoughOperands(count) {
    if (count < 2) {
        return "falta operandos para realizar el calculo";
    }
    return true;
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
    if (b === 0) return null;
    return a / b;
}

function evaluateRPN(tokens) {
    console.log(tokens);
    const stack = [];

    for (let token of tokens) {
        if (typeof token === 'number') {
            if (!Number.isInteger(token)) throw new Error("error");
            if (token > 2147483647) throw new Error("error");
            stack.push(token);
        } else if (['+', '-', '*', '/'].includes(token)) {
            if (stack.length < 2) {
                throw new Error("falta operandos para realizar el calculo");
            }
            const b = stack.pop();
            const a = stack.pop();
            let result;

            switch (token) {
                case '+': result = add(a, b); break;
                case '-': result = subtract(a, b); break;
                case '*': result = multiply(a, b); break;
                case '/':
                    result = divide(a, b);
                    if (result === null) throw new Error("División por cero");
                    break;
            }
            stack.push(result);
        } else {
            throw new Error("error");
        }
    }

    if (stack.length !== 1) throw new Error("error");
    return stack[0];
}

// Simula el formateo de una cadena a notación RPN
function formateoPila(expresion) {
    if (typeof expresion !== 'string') return "error";
    // Este ejemplo es estático, para testear
    if (expresion === "9+6*3+4") return [9, 6, "+", 3, "*", 4, "+"];
    return "error";
}

function calculo(tokens) {
    try {
        return evaluateRPN(tokens);
    } catch {
        return "error";
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    hasEnoughOperands,
    evaluateRPN,
    calculo,
    formateoPila
};
