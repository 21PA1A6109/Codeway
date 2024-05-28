// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    clearButton.addEventListener('click', clearDisplay);
    equalsButton.addEventListener('click', calculate);

    function handleNumber(value) {
        if (currentInput.includes('.') && value === '.') return;
        currentInput += value;
        console.log(`Number clicked: ${value}, Current input: ${currentInput}`);
    }

    function handleOperator(value) {
        if (currentInput === '') return;
        if (previousInput !== '') calculate();
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        console.log(`Operator clicked: ${value}, Previous input: ${previousInput}, Current input cleared`);
    }

    function calculate() {
        if (currentInput === '' || previousInput === '') return;
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        console.log(`Calculating: ${prev} ${operator} ${curr}`);
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay();
        console.log(`Calculation result: ${result}`);
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
        console.log('Display cleared');
    }

    function updateDisplay() {
        display.innerText = currentInput || '0';
        console.log(`Display updated: ${display.innerText}`);
    }
});
