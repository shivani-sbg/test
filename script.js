/*const balance = document.getElementById('balance');

const money_plus = document.getElementById('money-plus');

const money_minus = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const text = document.getElementById('text');

const amount = document.getElementById('amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let Transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// Add Transaction
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === '' || amount.value.trim() === ''
    ){
        alert('Please Enter Text and Value...');
    }else{
        const Transaction ={
            id:generateID(),
            text:text.value,
            amount: Math.abs(+amount.value),
        };


if (Transaction.amount > 0 && Transaction.amount <= getTotalIncome()) {
           
    Transaction.amount = -Transaction.amount;
}



        Transactions.push(Transaction);
        addTransactionDOM(Transaction);
        updateLocalStorage();
        updateValues();
        text.value='';
        amount.value='';

    }
}

//Generate id
function generateID(){
    return Math.floor(Math.random()*100000000);
}



function addTransactionDOM(Transaction){
     const sign = Transaction.amount > 0 ? '+' : '-';




//     let balance = 0;

//    const sign = function updateBalance(amount) {
//       // Check if the amount is positive or negative
//       if (Transaction.amount >0) {
//       balance += amount;  // Add to the balance
//       }else {
//     balance +=  amount;  // Deduct the negative amount (or 0)
//       }
//    // console.log(`Balance updated: $${balance}`);
//     }
    
    // Use cases:
    // updateBalance(100);   // Add $100 to balance
    // updateBalance(50);    // Add $50 to balance
    // updateBalance(-30);   // Deduct $30 from balance
    // updateBalance(20);    // Add $20 to balance (spend would automatically deduct)




      const item = document.createElement('li');

    item.classList.add(
        Transaction.amount < 0 ? 'minus' : 'plus'
    )

    item.innerHTML =`
    ${Transaction.text} <span>${sign}${Math.abs(Transaction.amount)}</span>
    <button class='delete-btn' onclick='removeTransaction(${Transaction.id})'>x</button>
    `;

    list.appendChild(item);
}

//remove transaction
function removeTransaction(id){
    Transactions = Transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();

}


//update updatevalue
function updateValues(){
    const amounts = Transactions.map(Transaction => Transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item),0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item),0)* -1).toFixed(2);
 
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

//update local storage
function updateLocalStorage(){
    localStorage.setItem(
        'transactions',JSON.stringify(Transactions)
    );
}

//Init App
function Init(){
    list.innerHTML='';
    Transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener('submit', addTransaction);
*/





 const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let Transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please Enter Text and Value...');
    } else {
        const Transaction = {
            id: generateID(),
            text: text.value,
            amount: Math.abs(+amount.value), // Automatically take the absolute value for input
        };
        
        // Add positive/negative sign based on whether it's income or expense
        if (Transaction.amount > 0 && Transaction.amount < getTotalIncome()) {
            // If the amount is less than or equal to the income, treat it as an expense
            Transaction.amount = -Transaction.amount;
        }

        Transactions.push(Transaction);
        addTransactionDOM(Transaction);
        updateLocalStorage();
        updateValues();
        text.value = '';
        amount.value = '';
    }
}

// Generate id
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(Transaction) {
    const sign = Transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');
    item.classList.add(Transaction.amount < 0 ? 'minus' : 'plus');
    
    item.innerHTML = `
        ${Transaction.text} <span>${sign}${Math.abs(Transaction.amount)}</span>
        <button class='delete-btn' onclick='removeTransaction(${Transaction.id})'>x</button>
    `;
    
    list.appendChild(item);
}

// Remove transaction
function removeTransaction(id) {
    Transactions = Transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

// Update values (total, income, expenses)
function updateValues() {
    const amounts = Transactions.map(Transaction => Transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Get total income
function getTotalIncome() {
    const income = Transactions.map(Transaction =>
 Transaction.amount).filter(amount => amount > 0).reduce((acc, amount) => acc + amount, 0); return income; }

//Update local storage 
function updateLocalStorage() { localStorage.setItem('transactions', JSON.stringify(Transactions)); }

 
 //Init App
 function Init(){
     list.innerHTML='';
     Transactions.forEach(addTransactionDOM);
     updateValues();
 }
Init();

form.addEventListener('submit', addTransaction);
