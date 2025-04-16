beforeEach(() => {
    document.body.innerHTML = `
        <div id="stack-display"></div>
        <div id="input"></div>
    `;
});

const calculadora = require('../calculadora.js');

const {
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
    setStack,
    getStack,
    setInputBuffer,
    getInputBuffer
} = calculadora;

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
    test('Debe retornar true con 2 operandos', () => {
       const stack= setStack([1, 2]);
       
        expect(hasEnoughOperands(stack.length)).toBe(true);
    });

    test('Debe retornar false con menos de 2 operandos', () => {
        setStack([1]);
        expect(hasEnoughOperands()).toBe("falta operandos para realizar el calculo");
    });
});

describe('Operaciones sobre la pila', () => {
    test('swapItems alerta con menos de 2 elementos', () => {
        setStack([1]);
        global.alert = jest.fn();
        swapItems();
        expect(getStack()).toEqual([1]);
        expect(global.alert).toHaveBeenCalledWith("Se necesitan al menos dos elementos para intercambiar.");
    });

    test('swapItems intercambia los dos últimos', () => {
        setStack([1, 2]);
        swapItems();
        expect(getStack()).toEqual([2, 1]);
    });

    test('duplicateItem duplica el último elemento', () => {
        setStack([5]);
        duplicateItem();
        expect(getStack()).toEqual([5, 5]);
    });

    test('duplicateItem alerta si la pila está vacía', () => {
        setStack([]);
        global.alert = jest.fn();
        duplicateItem();
        expect(global.alert).toHaveBeenCalledWith("La pila está vacía.");
    });

    test('dropItem elimina el último elemento', () => {
        setStack([1, 2, 3]);
        dropItem();
        expect(getStack()).toEqual([1, 2]);
    });
});

//Pruebas para el metodo encargado de la operacion
describe('Operaciones realizadas sobre el contenido de la pila', () => {
    test('División por cero no modifica la pila', () => {
        setStack([4, 0]);
        setInputBuffer('');
        global.alert = jest.fn();
    
        try {
            performOperation('/');
        } catch (e) {
            expect(e.message).toBe("División por cero");
        }
    
        expect(getStack()).toEqual([4, 0]);
    });
    
    test('Operador distinto a los 4 operadores basicos alerta y no modifica la pila', () => {
        setStack([1, 2]);
        setInputBuffer('');
        global.alert = jest.fn();
        performOperation('%');
        expect(getStack()).toEqual([1, 2]);
        expect(global.alert).toHaveBeenCalledWith("Operación no válida");
    });

    test('Suma válida modifica la pila', () => {
        setStack([2, 3]);
        setInputBuffer('');
        performOperation('+');
        expect(getStack()).toEqual([5]);
    });
});

//Pruebas para el ingreso en input
describe('Ingreso de digitos en el input', () => {
    test('Agrega un dígito al inputBuffer', () => {
        setInputBuffer('');
        appendDigit(7);
        expect(getInputBuffer()).toBe('7');
    });

    test('Concatena múltiples dígitos', () => {
        setInputBuffer('3');
        appendDigit(5);
        expect(getInputBuffer()).toBe('35');
    });

    test('Actualiza el DOM correctamente', () => {
        setInputBuffer('');
        appendDigit(9);
        const inputDisplay = document.getElementById('input');
        expect(inputDisplay.textContent).toBe('9');
    });
});

//pruebas para el ingreso de elementos a la pila
describe('Ingreso de elementos a la pila', () => {
    test('Agrega el número a la pila si es válido', () => {
        setStack([]);
        setInputBuffer('42');
        enterNumber();
        expect(getStack()).toEqual([42]);
        expect(getInputBuffer()).toBe('');
    });

    test('No hace nada si inputBuffer está vacío', () => {
        setStack([]);
        setInputBuffer('');
        enterNumber();
        expect(getStack()).toEqual([]);
    });

    test('Alerta si el input no es número entero - decimales', () => {
        global.alert = jest.fn();
        setInputBuffer('4.2');
        enterNumber();
        expect(global.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
        expect(getInputBuffer()).toBe('');
    });

    test('Alerta si el input no es número entero - letras', () => {
        global.alert = jest.fn();
        setInputBuffer('abc');
        enterNumber();
        expect(global.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
        expect(getInputBuffer()).toBe('');
        expect(getStack()).toEqual([]);
    });

    test('Alerta si el input no es número entero - símbolos', () => {
        global.alert = jest.fn();
        setInputBuffer('@#$');
        enterNumber();
        expect(global.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
        expect(getInputBuffer()).toBe('');
        expect(getStack()).toEqual([]);
    });

    test('Actualiza correctamente el DOM al ingresar número', () => {
        setStack([]);
        setInputBuffer('10');
        enterNumber();
        expect(document.getElementById('stack-display').textContent).toBe('10');
        expect(document.getElementById('input').textContent).toBe('');
    });
});


//Pruebas para el metodo que cambia el signo del valor en el input
describe('cambio de signo de valor en el input', () => {
    test('Agrega signo negativo si es positivo', () => {
        setInputBuffer('12');
        changeSign();
        expect(getInputBuffer()).toBe('-12');
    });

    test('Elimina signo negativo si ya está presente', () => {
        setInputBuffer('-7');
        changeSign();
        expect(getInputBuffer()).toBe('7');
    });

    test('No cambia nada si el input está vacío', () => {
        setInputBuffer('');
        changeSign();
        expect(getInputBuffer()).toBe('');
    });

    test('Actualiza el DOM con el nuevo valor', () => {
        setInputBuffer('3');
        changeSign();
        expect(document.getElementById('input').textContent).toBe('-3');
    });
});


//Pruebas para metodo que borra valor en el input
describe('Limpiar input', () => {
    test('Limpia el inputBuffer', () => {
        setInputBuffer('123');
        clearInput();
        expect(getInputBuffer()).toBe('');
    });

    test('Actualiza el DOM', () => {
        setInputBuffer('99');
        clearInput();
        expect(document.getElementById('input').textContent).toBe('');
    });
});

//Pruebas para el metodo que limpia el input y la pila
describe('Limpiar todo', () => {
    test('Limpia inputBuffer y pila', () => {
        setInputBuffer('456');
        setStack([1, 2, 3]);
        clearAll();
        expect(getInputBuffer()).toBe('');
        expect(getStack()).toEqual([]);
    });

    test('Actualiza el DOM', () => {
        setInputBuffer('10');
        setStack([5, 6]);
        clearAll();
        expect(document.getElementById('input').textContent).toBe('');
        expect(document.getElementById('stack-display').textContent).toBe('');
    });
});

//Pruebs de seguridad den input de la calculadora
describe('Seguridad en la entrada de usuario', () => {

    test('No debe ejecutar código inyectado en el input', () => {
        global.alert = jest.fn();
        setInputBuffer("2; alert('hack');");
        enterNumber();
        expect(global.alert).toHaveBeenCalledWith("Solo se permiten números enteros.");
        expect(getStack()).toEqual([]);
    });

    test('Ignora caracteres inválidos desde el teclado', () => {
        const event = new KeyboardEvent('keydown', { key: '<' });
        global.alert = jest.fn();
        document.dispatchEvent(event);
        expect(getInputBuffer()).toBe("");
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