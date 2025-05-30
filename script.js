// Seleção dos elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const expenseList = document.querySelector('ul');
const qtdDespesas = document.getElementById('qtdDespesas');
const totalDeGastos = document.getElementById('totalDeGastos');

let expensesArray = [];

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '');
    value = Number(value) / 100;
    amount.value = formatCurrencyBR(value);
}

function formatCurrencyBR(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function extractAmount(value) {
    return Number(value.replace(/[^0-9,-]+/g,"").replace(",", "."));
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: extractAmount(amount.value),
        createdAt: new Date()
    }

    expensesArray.push(newExpense);

    updateExpenseList();
    updateTotals();

    form.reset();
    amount.value = '';
};

function updateExpenseList() {

    expenseList.innerHTML = '';

    for (let expense of expensesArray) {
        const li = document.createElement('li');
        li.className = 'expense';

        const icon = document.createElement('img');
        icon.src = `./img/${expense.category_id}.svg`;
        icon.alt = "Ícone de tipo da despesa";
        li.appendChild(icon);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'expense-info';
        const strong = document.createElement('strong');
        strong.textContent = expense.expense;
        const span = document.createElement('span');
        span.textContent = expense.category_name;
        infoDiv.appendChild(strong);
        infoDiv.appendChild(span);
        li.appendChild(infoDiv);

        const amountSpan = document.createElement('span');
        amountSpan.className = 'expense-amount';
        amountSpan.innerHTML = `<small>R$</small>${expense.amount.toFixed(2).replace('.',',')}`;
        li.appendChild(amountSpan);

        const removeIcon = document.createElement('img');
        removeIcon.src = './img/remove.svg';
        removeIcon.alt = 'Remover';
        removeIcon.className = 'remove-icon';
        removeIcon.onclick = () => removeExpense(expense.id);
        li.appendChild(removeIcon);

        expenseList.appendChild(li);
    }
}

function updateTotals() {
    
    qtdDespesas.textContent = `${expensesArray.length} despesas`;

    let total = 0;
    for (let expense of expensesArray) {
        total += expense.amount;
    }
    totalDeGastos.innerHTML = `<small>R$</small>${total.toFixed(2).replace('.',',')}`;
}

function removeExpense(id) {

    expensesArray = expensesArray.filter(exp => exp.id !== id);

    updateExpenseList();
    updateTotals();
}
