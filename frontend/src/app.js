import { backend } from 'declarations/backend';

let currentInput = '';
let currentOperation = null;
let previousInput = null;
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function handleNumberClick(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (currentInput !== '') {
        if (previousInput !== null) {
            calculate();
        }
        previousInput = parseFloat(currentInput);
        currentInput = '';
        currentOperation = operator;
    }
}

function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleClearClick() {
    currentInput = '';
    currentOperation = null;
    previousInput = null;
    updateDisplay();
}

async function calculate() {
    if (previousInput !== null && currentOperation && currentInput !== '') {
        display.classList.add('loading');
        try {
            const result = await backend.calculate(currentOperation, previousInput, parseFloat(currentInput));
            if (result !== null) {
                currentInput = result.toString();
                previousInput = null;
                currentOperation = null;
                updateDisplay();
            } else {
                currentInput = 'Error';
                updateDisplay();
            }
        } catch (error) {
            console.error('Calculation error:', error);
            currentInput = 'Error';
            updateDisplay();
        } finally {
            display.classList.remove('loading');
        }
    }
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button.textContent));
});

document.querySelector('.decimal').addEventListener('click', handleDecimalClick);

document.querySelector('.clear').addEventListener('click', handleClearClick);

document.querySelector('.equals').addEventListener('click', calculate);

updateDisplay();
