const {
    add,
    subtract,
    hasEnoughOperands,
    testPerformOperationSequence,
    performOperation,
    formateoPila
} = require('../calculadora');



describe('Suma', () => {
    it('Suma asserts', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-2, -3)).toBe(-5);
        expect(add(0, 0)).toBe(0);
    });
});

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
describe('Evaluación de RPN con números negativos', () => {
    it('debe evaluar correctamente [1, -2, "+", 3, "*", -4, "+"]', () => {
        const expression = [1, -2, "+", 3, "*", -4, "+"];
        const result = testPerformOperationSequence(expression);
        expect(result).toBe(-7);
    });

    it('debe lanzar error si faltan operandos', () => {
        expect(() => testPerformOperationSequence([1, "+"])).toThrow("falta operandos para realizar el calculo");
    });

    it('debe lanzar error si hay división por cero', () => {
        expect(() => testPerformOperationSequence([4, 0, "/"])).toThrow("División por cero");
    });
});

describe("Operaciones", () => {
    it('debe realizar el calculo', () => {
        expect(testPerformOperationSequence([1, 2, "+", 3, "*", 4, "+"])).toBe(13);
    });

    it('debe realizar el calculo complejo', () => {
        expect(testPerformOperationSequence([1, -2, "+", 3, "*", -4, "-", 5, "/"])).toBe(0.2);
    });

    it('debe mostrar error de ingreso de operandos', () => {
        expect(testPerformOperationSequence(["+", 3, "*", 4, "+", "="])).toBe("error");
    });

    it('debe mostrar error al existir caracteres no soportados', () => {
        expect(testPerformOperationSequence(["+", 3, "*", 4, "+", 2, "@", 1, "*"])).toBe("error");
    });

    it('debe mostrar error al existir paréntesis', () => {
        expect(testPerformOperationSequence(["(", "+", 3, "*", 4, "+", "+", 2, "-", 1, "*"])).toBe("error");
    });

    it('debe mostrar error al ingresar números decimales', () => {
        expect(testPerformOperationSequence([2.2, 3, "*", 4, "+"])).toBe("error");
    });
});

   /* it('debe formatear el formato de cálculo normal a notación RPN', () => {
        expect(formateoPila("9+6*3+4")).toEqual([9, 6, "+", 3, "*", 4, "+"]);
    });*/
/*
    it('debe de dar error al ingresar un número muy grande a la operación', () => {
        expect(performOperation([2147483648, 3, "*", 4, "+"])).toBe(undefined);
    });
});*/





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
});*/

