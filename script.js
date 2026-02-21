let displayValue = '';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.value = displayValue || '0';
}

function appendNumber(number) {
    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else {
        if (displayValue === '0' && number !== '.') {
            displayValue = number;
        } else {
            if (number === '.' && displayValue.includes('.')) {
                return;
            }
            displayValue += number;
        }
    }
    updateDisplay();
}

function setOperator(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);
    } else if (operator) {
        calculate();
        firstNumber = parseFloat(displayValue);
    }
    operator = op;
    waitingForSecondNumber = true;
}

function calculate() {
    if (operator === null || waitingForSecondNumber) {
        return;
    }
    
    const secondNumber = parseFloat(displayValue);
    let result;
    
    switch(operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                displayValue = 'Error! Division by zero';
                updateDisplay();
                clearCalculator();
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }
    
    displayValue = result.toString();
    operator = null;
    firstNumber = null;
    waitingForSecondNumber = true;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

function clearCalculator() {
    setTimeout(() => {
        clearDisplay();
    }, 1500);
}

function deleteLastChar() {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    }
});

// Initialize display
updateDisplay();
