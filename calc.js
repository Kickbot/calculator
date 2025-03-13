let display = document.getElementById('display');

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '.', '+', '-', '*', '/', 'Enter', 'Escape'
    ];

    if (!allowedKeys.includes(key)) {
        event.preventDefault();
        return;
    }

    if (/[0-9]/.test(key)) appendNumber(key);
    if (key === '.') appendNumber('.');
    if (key === '+') appendOperator('+');
    if (key === '-') appendOperator('-');
    if (key === '*') appendOperator('*');
    if (key === '/') appendOperator('/');
    if (key === 'Enter') calculate();
    if (key === 'Escape') clearDisplay();

    event.preventDefault();
});

function appendNumber(num) {
    display.value += num;
}

function appendOperator(op) {
    display.value += ` ${op} `;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        let expression = display.value.replace('×', '*');
        if (expression.match(/\/\s*0(?:\.0+)?$/)) {
            throw new Error('Division by zero');
        }
        let result = eval(expression);
        if (!isFinite(result)) {
            throw new Error('Invalid result');
        }
        display.value = result;
    } catch (error) {
        display.value = 'Ошибка';
        setTimeout(clearDisplay, 2000);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

window.onload = function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
};