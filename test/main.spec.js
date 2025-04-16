/**
 * @jest-environment jsdom
 */

const calculadora = require('../calculadora.js');
const {
    add,
    subtract,
    multiply,
    divide,
    hasEnoughOperands
} = require('./calculadora');

//Pruebas para operaciones matematicas
describe('Operaciones matemáticas básicas', () => {
    describe('Suma', () => {
        it('Asserts para suma', () => {
            expect(add(1, 2)).toBe(3);
            expect(add(-2, -3)).toBe(-5);
            expect(add(0, 0)).toBe(0);
            expect(add(-5, 5)).toBe(0);
        });

        it('Asserts para suma con límites de integer', () => {
            expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
            expect(add(Number.MIN_SAFE_INTEGER, -1)).toBe(Number.MIN_SAFE_INTEGER - 1);
        });
    });

    describe('Resta', () => {
        it('Asserts para resta', () => {
            expect(subtract(5, 3)).toBe(2);
            expect(subtract(-5, -3)).toBe(-2);
            expect(subtract(0, 0)).toBe(0);
            expect(subtract(3, 5)).toBe(-2);
        });

        it('Asserts para resta con límites de integer', () => {
            expect(subtract(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER - 1);
            expect(subtract(Number.MIN_SAFE_INTEGER, -1)).toBe(Number.MIN_SAFE_INTEGER + 1);
        });
    });

    describe('Multiplicacion', () => {
        it('Asserts para multiplicacion', () => {
            expect(multiply(2, 3)).toBe(6);
            expect(multiply(-2, 3)).toBe(-6);
            expect(multiply(0, 5)).toBe(0);
            expect(multiply(-2, -3)).toBe(6);
        });

        it('Asserts para multipliacacion con límites de integer', () => {
            expect(multiply(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
            expect(multiply(Number.MIN_SAFE_INTEGER, 1)).toBe(Number.MIN_SAFE_INTEGER);
        });
    });

    describe('Division', () => {
        it('Asserts para division', () => {
            expect(divide(6, 3)).toBe(2);
            expect(divide(-6, 3)).toBe(-2);
            expect(divide(0, 5)).toBe(0);
            expect(divide(-6, -3)).toBe(2);
        });

        it('Asserts para division con divisor 0', () => {
            expect(divide(5, 0)).toBeNull();
        });

        it('Asserts para division con límites de integer', () => {
            expect(divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
            expect(divide(Number.MIN_SAFE_INTEGER, 1)).toBe(Number.MIN_SAFE_INTEGER);
        });
    });
});

//Pruebas de validador de cantidad de operandos
describe('Validación de operandos', () => {
    it('debe retornar true cuando hay al menos 2 operandos', () => {
        expect(hasEnoughOperands(2)).toBe(true);
        expect(hasEnoughOperands(3)).toBe(true);
    });

    it('debe indicar que faltan operandos si hay menos de 2', () => {
        expect(hasEnoughOperands(0)).toBe("falta operandos para realizar el calculo");
        expect(hasEnoughOperands(1)).toBe("falta operandos para realizar el calculo");
    });
});

//Pruebas para funciones de pila
describe('Metodos de pila', () => {

    test('swapItems muestra alerta si hay menos de 2 elementos', () => {
        stack = [1];
        window.alert = jest.fn();
        swapItems();
        expect(stack).toEqual([1]);
        expect(window.alert).toHaveBeenCalledWith("Se necesitan al menos dos elementos para intercambiar.");
    });

    test('swapItems intercambia los dos últimos elementos', () => {
        stack = [1, 2];
        swapItems();
        expect(stack).toEqual([2, 1]);
    });

    test('duplicateItem duplica el último elemento de la pila', () => {
        stack = [5];
        duplicateItem();
        expect(stack).toEqual([5, 5]);
    });

    test('duplicateItem alerta si la pila está vacía', () => {
        stack = [];
        window.alert = jest.fn();
        duplicateItem();
        expect(window.alert).toHaveBeenCalledWith("La pila está vacía.");
    });

    test('performOperation con división por cero no modifica la pila', () => {
        stack = [4, 0];
        window.alert = jest.fn();
        performOperation('/');
        expect(stack).toEqual([4, 0]);
        expect(window.alert).toHaveBeenCalledWith("Error: División por cero");
    });

    test('performOperation con operador fuera de los cuatro operadores básicos muestra alerta', () => {
        stack = [1, 2];
        window.alert = jest.fn();
        performOperation('%');
        expect(stack).toEqual([1, 2]);
        expect(window.alert).toHaveBeenCalledWith("Operación no válida");
    });
});


//Pruebas para ingreso a la pila por input
describe('appendDigit y enterNumber', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="input"></div>
        <div id="stack-display"></div>
      `;
        global.stack = [];
        global.inputBuffer = "";
    });

    test('appendDigit agrega dígitos al inputBuffer', () => {
        appendDigit(1);
        appendDigit(2);
        expect(inputBuffer).toBe("12");
    });

    test('enterNumber ignora input con solo espacios', () => {
        inputBuffer = "   ";
        enterNumber();
        expect(stack).toEqual([]);
    });

    test('enterNumber agrega número entero al stack y limpia input', () => {
        inputBuffer = "42";
        enterNumber();
        expect(stack).toEqual([42]);
        expect(inputBuffer).toBe("");
    });

    test('enterNumber rechaza decimales', () => {
        inputBuffer = "3.14";
        window.alert = jest.fn();
        enterNumber();
        expect(stack).toEqual([]);
        expect(window.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
    });

    test('enterNumber rechaza entrada no numérica', () => {
        inputBuffer = "abc";
        window.alert = jest.fn();
        enterNumber();
        expect(stack).toEqual([]);
        expect(window.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
    });
});

/*
describe('resta', () => {
    it('debe restar dos numeros', () => {
        expect(calculadora.resta(2, 1)).toBe(1);
    });
});

describe('multiplicacion', () => {
    it('debe multiplicar dos numeros', () => {
        expect(calculadora.multiplicacion(2, 2)).toBe(4);
    });
});

describe('division', () => {
    it('debe dividir dos numeros', () => {
        expect(calculadora.division(4, 2)).toBe(2);
    });

    //prueba que se encarga de validar de la exepcion de divicion por 0
    it('debe mostrar error al intentar dividir por 0', () => {
        expect(calculadora.division(4, 0)).toBe("error");
    });
});

//tests para validar operaciones con varios operandos
describe('calculo', () => {
    //Enteros: prueba uqe se encarga de validar el correcto calculo con valores entero
    it('debe realizar el calculo', () => {
        expect(calculadora.calculo([1, 2, "+", 3, "*", 4, "+"])).toBe(13);
    });

    //Enteros: prueba uqe se encarga de validar el correcto calculo con valores entero negativos
    it('debe realizar el calculo con negativos', () => {
        expect(calculadora.calculo([1, -2, "+", 3, "*", -4, "+"])).toBe(7);
    });

    //prueba que se encarga de validar el calculo de operacion que utilice los 4 operadores
    it('debe realizar el calculo complejo', () => {
        expect(calculadora.calculo([1, -2, "+", 3, "*", -4, "-", 5, "/"])).toBe(0.2);
    });

    //prueba que se encarga de validar que los operandos esten ordenados de manera correcta en la pila
    it('debe mostrar error de ingreso de operandos', () => {
        expect(calculadora.calculo(["+", 3, "*", 4, "+", "="])).toBe("error");
    });

    //prueba que se encarga de probar que de exepción en caso de ingresar carecteres no soportados
    it('debe mostrar error al existir carecteres no soportados', () => {
        expect(calculadora.calculo(["+", 3, "*", 4, "+", 2, "@", 1, "*"])).toBe("error");
    });

    //prueba que se encarga de probar que de exepción en caso de ingresar parentesis
    it('debe mostrar error al existir carecteres no soportados', () => {
        expect(calculadora.calculo(["(", "+", 3, "*", 4, "+", "+", 2, "-", 1, "*"])).toBe("error");
    });

    //prueba que se encarga de probar la prohibición de ingreso de números decimales
    it('debe mostrar error al ingresar números decimales', () => {
        expect(calculadora.calculo([2.2, 3, "*", 4, "+"])).toBe("error");
    });

    //prueba que se encarga de testear el imgreso de los operandos y operadores a la pila array
    it('debe formatear el formato de calculo normal a notacion rpm', () => {
        expect(calculadora.formateoPila("9+6*3+4")).toBe([9, 6, "+", 3, "*", 4, "+"]);
    });

    //prueba que se encarga de manejar exepciones al ingresar números grandes
    it('debe de dar error al ingresar un número muy grande a la operación', () => {
        expect(calculadora.calculo([2147483648, 3, "*", 4, "+"])).toBe("error");
    });
});*/