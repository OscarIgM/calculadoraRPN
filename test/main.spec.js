const calculadora= require ('./calculadora.js');

describe('calculadora', () => {
    it('debe sumar dos numeros', () => {
        expect(calculadora.suma(1, 2)).toBe(3);
    });
    it('debe restar dos numeros', () => {
        expect(calculadora.resta(2, 1)).toBe(1);
    });
    it('debe multiplicar dos numeros', () => {
        expect(calculadora.multiplicacion(2, 2)).toBe(4);
    });
    it('debe dividir dos numeros', () => {
        expect(calculadora.division(4, 2)).toBe(2);
    });
    it('debe mostrar error', () => {
        expect(calculadora.error("error"
        )).toBe();
    });
    it('debe mostrar que no hay operandos suficientes', () => {
        expect(calculadora.suma(0
        )).toBe("falta operandos para realizar el calculo");
    });
    it('debe realizar el calculo', () => {
        expect(calculadora.calculo([1, 2, "+", 3, "*", 4, "+", "="])).toBe(13);
    });
    it('debe realizar el calculo con negativos', () => {
        expect(calculadora.calculo([1, -2, "+", 3, "*", -4, "+", "="])).toBe(7);
    });
    it('debe mostrar error de ingreso', () => {
        expect(calculadora.calculo(["+", 3, "*", 4, "+", "="])).toBe("error");
    });
    it('debe mostrar error al existir operandos despues del =', () => {
        expect(calculadora.calculo(["+", 3, "*", 4, "+", "=", 1])).toBe("error");
    });
});