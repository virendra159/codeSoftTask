document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "0";
    let operator = null;
    let firstOperand = null;
    let secondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clearDisplay() {
        currentInput = "0";
        operator = null;
        firstOperand = null;
        secondOperand = false;
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (value === "C") {
                clearDisplay();
                return;
            }

            if (value === "=") {
                if (firstOperand !== null && operator !== null && !secondOperand) {
                    const secondValue = parseFloat(currentInput);
                    switch (operator) {
                        case "+":
                            currentInput = (firstOperand + secondValue).toString();
                            break;
                        case "-":
                            currentInput = (firstOperand - secondValue).toString();
                            break;
                        case "*":
                            currentInput = (firstOperand * secondValue).toString();
                            break;
                        case "/":
                            currentInput = (firstOperand / secondValue).toString();
                            break;
                    }
                    operator = null;
                    firstOperand = null;
                    secondOperand = true;
                    updateDisplay();
                }
                return;
            }

            if (["+", "-", "*", "/"].includes(value)) {
                if (operator === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator && !secondOperand) {
                    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                }
                operator = value;
                secondOperand = true;
                return;
            }

            if (secondOperand) {
                currentInput = value;
                secondOperand = false;
            } else {
                currentInput = currentInput === "0" ? value : currentInput + value;
            }

            updateDisplay();
        });
    });

    function calculate(first, second, operator) {
        switch (operator) {
            case "+":
                return first + second;
            case "-":
                return first - second;
            case "*":
                return first * second;
            case "/":
                return first / second;
        }
    }
});
