const calculadora= require ('./calculadora.js');
describe('suma', () => {
    it('debe sumar dos numeros', () => {
        expect(calculadora.suma(1, 2)).toBe(3);
    });
    it('debe mostrar que no hay operandos suficientes', () => {
        expect(calculadora.suma(0
        )).toBe("falta operandos para realizar el calculo");
    });
});

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
});