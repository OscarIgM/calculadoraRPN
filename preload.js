const { contextBridge } = require('electron');
const calculadora = require('./calculadora');

// Expone selectivamente las funciones de la calculadora al renderer
contextBridge.exposeInMainWorld('calculadoraAPI', {
    add: calculadora.add,
    subtract: calculadora.subtract,
    multiply: calculadora.multiply,
    divide: calculadora.divide,
    evaluateRPN: calculadora.evaluateRPN,
    calculo: calculadora.calculo,
    formateoPila: calculadora.formateoPila
});