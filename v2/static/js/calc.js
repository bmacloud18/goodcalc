let history = new Array();
const historyList = document.querySelector(".historyList");
historyList.innerHTML = history.map(i => '<li>'+ i + '</li>').join('');

let input = document.querySelector("input");

let decimal = false;
let evaluating = false;
let decimals = 0;
let justEvaled = false;
let evalDone = false;
let firstNum = false;
let usedHistory = false;
let changedSign = false;

let x = 0;
let y = 0;
let expression = '';

function evaluateNumbers (num1, num2, expression) {
    let result = 0;
    console.log(num1, num2);
    if (expression == '+') {
        result = add(num1, num2);
    }
    else if (expression == '-') {
        result = subtract(num1, num2);
    }
    else if (expression == '*') {
        result = multiply(num1, num2);
    }
    else if (expression == '/') {
        result = divide(num1, num2);
    }
    else if (expression == '%') {
        result = mod(num1, num2)
    }

    input.value = result;
    history.push(result);

    const historyList = document.querySelector(".historyList");
    let li = document.createElement('li');
    li.innerText = result;



    historyList.appendChild(li);

    li.addEventListener('click', (cl) => {
        if (!firstNum) {
            x = parseInt(li.innerText);
            input.value = x;
            firstNum = true;
            justEvaled = false;
        }
        else if (evaluating && justEvaled) {
            y = parseInt(li.innerText);
            input.value = y;
            justEvaled = false;
        }
    });

    console.log(li);

    evalDone = true;

    return result;
}

function add(num1, num2) {
    return Math.round((num1 + num2) * 1000) / 1000;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 1000) / 1000;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 1000) / 1000;
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 1000) / 1000;
}
function mod(num1, num2) {
    return Math.round((num1 % num2) * 1000) / 1000;
}

function buildNumber (digit) {
    if (evalDone) {
        x = 0;
        evaluating = false;
    }
    if (usedHistory && !evaluating) {
        x = 0;
        evaluating = false;
    }
    else if (usedHistory && evaluating) {
        y = 0;
        evaluating = true;
    }
    if (!decimal) {
        if (!evaluating) {
            if (x >= 0) {
                x = x * 10 + digit;
                if (input.value == '-') {
                    x *= -1;
                }
                input.value = x;
            }
            else {
                x = x * 10 - digit;
                input.value = x;
            }
        }
        else {
            if (y >= 0) {
                y = y * 10 + digit;
                if (input.value == '-') {
                    y *= -1;
                }
                input.value = y;
            }
            else {
                y = y * 10 - digit;
                input.value = y;
            }
        }
    }
    else {
        decimals++;
        if (!evaluating) {
            x = (x * (10 ** decimals) + digit) / (10 ** decimals);
            input.value = x;
        }
        else {
            y = (y * (10 ** decimals) + digit) / (10 ** decimals);
            //was causing bug where second value didn't show decimal points, will revert or continue 
            //to work on if this causes a different error
            // if (justEvaled) {
            //     input.value = y;
            // }
            input.value = y;
        }
    }
    justEvaled = false;
    evalDone = false;
    firstNum = true;
    changedSign = false;
}

function newEvaluation (num1, num2, exp) {
    if (evaluating && !justEvaled) {
        evaluateNumbers(num1, num2, expression);
    }
    if (evalDone) {
        x = history[history.length - 1];
        y = 0;
        evaluating = true;
    }
    expression = exp;
    evaluating = true;
    decimal = false;
    decimals = 0;
    justEvaled = true;
    evalDone = false;
    console.log(x, y, evaluating, expression);
}

document.addEventListener('keydown', (e) => {
    const k = e.key;
    console.log(k);


    if (k == '1') {
        buildNumber(1);
        console.log(x);
    }
    else if (k == '2') {
        buildNumber(2);
    }
    else if (k == '3') {
        buildNumber(3);
    }
    else if (k == '4') {
        buildNumber(4);
    }
    else if (k == '5') {
        buildNumber(5);
    }
    else if (k == '6') {
        buildNumber(6);
    }
    else if (k == '7') {
        buildNumber(7);
    }
    else if (k == '8') {
        buildNumber(8);
    }
    else if (k == '9') {
        buildNumber(9);
    }
    else if (k == '0') {
        buildNumber(0);
    }
    else if (k == '+') {
        if (firstNum) {
            newEvaluation(x, y, '+');
        }
    }
    else if (k == '-') {
        if (firstNum) {
            newEvaluation(x, y, '-');
        }
        else {
            input.value = '-';
            firstNum = true;
        }
    }
    else if (k == '*') {
        if (firstNum) {
            newEvaluation(x, y, '*');
        }
    }
    else if (k == '/') {
        if (firstNum) {
            newEvaluation(x, y, '/');
        }
    }
    else if (k == '%') {
        if (firstNum) {
            newEvaluation(x, y, '%');
        }
    }
    else if (k == '=' || k == 'Enter') {
        if (!evaluating) {
            //do nothing
        }
        else if (evaluating && !justEvaled && firstNum) {
            let res = evaluateNumbers(x, y, expression);
            input.value = res;
            expression = '';
            decimal = false;
            decimals = 0;
            evaluating = false;
            x = 0;
            y = 0;
            firstNum = false;
            evalDone = false;
            justEvaled = false;
        }
    }
    else if (k == '.') {
        decimal = true;
    }
    else if (k == 'Backspace') {
        input.value = '';
        decimal = false;
        evaluating = false;
        justEvaled = false;
        evalDone = false;
        firstNum = false;
        evalDone = false;
        x = 0;
        y = 0;
        decimals = 0;
    }
});

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const b = e.target.getAttribute('value');
        // console.log(b);
        //building number
        if (b == '1') {
            buildNumber(1);
        }
        else if (b == '2') {
            buildNumber(2);
        }
        else if (b == '3') {
            buildNumber(3);
        }
        else if (b == '4') {
            buildNumber(4);
        }
        else if (b == '5') {
            buildNumber(5);
        }
        else if (b == '6') {
            buildNumber(6);
        }
        else if (b == '7') {
            buildNumber(7);
        }
        else if (b == '8') {
            buildNumber(8);
        }
        else if (b == '9') {
            buildNumber(9);
        }
        else if (b == '0') {
            buildNumber(0);
        }
        //decimal
        else if (b == '.') {
            decimal = true;
        }
        //add
        else if (e.target.className == 'plus') {
            if (firstNum) {
                newEvaluation(x, y, '+');
            }
        }
        //minus
        else if (e.target.className == 'minus') {
            if (firstNum && !evalDone) {
                newEvaluation(x, y, '-');
            }
            else {
                input.value = '-';
                firstNum = true;
            }
        }
        //multiply
        else if (e.target.className == 'times') {
            if (firstNum) {
                newEvaluation(x, y, '*');
            }
        }
        //divide
        else if (e.target.className == 'divide') {
            if (firstNum) {
                newEvaluation(x, y, '/');
            }
        }
        //modular division
        else if (e.target.className == 'mod') {
            if (firstNum) {
                newEvaluation(x, y, '%');
            }
        }
        //change sign of number
        else if (b == 'change' && firstNum) {
            if (justEvaled && !changedSign) {
                console.log(x);
                x = history[history.length - 1] * -1;
                input.value = x;
                y = 0;
                evaluating = true;
                changedSign = true;
            }
            else if (changedSign) {
                x *= -1;
                input.value = x;
            }
            else {
                if (!evaluating) {
                    x *= -1;
                    input.value = x;
                }
                else {
                    y *= -1;
                    input.value = y;
                }
                justEvaled = false;
            }
            evalDone = false;
        }
        //clear all
        else if (e.target.className == 'allclear') {
            input.value = '';
            decimal = false;
            evaluating = false;
            justEvaled = false;
            evalDone = false;
            firstNum = false;
            evalDone = false;
            x = 0;
            y = 0;
            decimals = 0;
        }
        //equals
        else if (b == 'equals') {
            if (!evaluating) {
            //do nothing
            }
            else if (evaluating && !justEvaled && firstNum) {
                let res = evaluateNumbers(x, y, expression);
                input.value = res;
                expression = '';
                decimal = false;
                decimals = 0;
                evaluating = false;
                x = 0;
                y = 0;
                firstNum = false;
                evalDone = false;
                justEvaled = false;
            }

        }
        else if (b == 'clear') {
            history = new Array();
            const historyList = document.querySelector(".historyList");
            historyList.innerHTML = '';
        }
    });
});