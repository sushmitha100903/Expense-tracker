let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add expense
function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const note = document.getElementById('expense-note').value || 'No note added';

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name,
        amount,
        note,
        date: new Date().toISOString()
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the input fields
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-note').value = '';

    alert("Expense added successfully!");
}

// Load expenses and statistics on expenses page
function loadExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    let todayTotal = 0;
    let weekTotal = 0;
    let monthTotal = 0;

    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    expenses.forEach((expense, index) => {
        const expenseDate = new Date(expense.date);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${expense.name}</strong> - $<span>${expense.amount}</span> 
                        <p><em>Note:</em> ${expense.note}</p>
                        <button onclick="removeExpense(${index})">Remove</button>`;
        expenseList.appendChild(li);

        // Calculate statistics
        if (isSameDay(expenseDate, today)) {
            todayTotal += expense.amount;
        }
        if (expenseDate >= oneWeekAgo) {
            weekTotal += expense.amount;
        }
        if (expenseDate >= startOfMonth) {
            monthTotal += expense.amount;
        }
    });

    // Update the statistics display
    document.getElementById('today-total').innerText = todayTotal.toFixed(2);
    document.getElementById('week-total').innerText = weekTotal.toFixed(2);
    document.getElementById('month-total').innerText = monthTotal.toFixed(2);
}

// Remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}

// Utility function to check if two dates are on the same day
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

// Load expenses on page load
if (document.getElementById('expense-list')) {
    loadExpenses();
}

