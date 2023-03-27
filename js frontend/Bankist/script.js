'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2023-03-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2023-03-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentUser;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

//SETUP

function calculateUserNames() {
  accounts.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(u => u[0])
        .join(''))
  );
}

//LOGIN

function loginUser() {
  let authenticated = authenticateUser(
    inputLoginUsername.value,
    inputLoginPin.value
  );
  if (authenticated) {
    displaySummary(currentUser);
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  setTimer();
}

function authenticateUser(username, pin) {
  const account = accounts.find(acc => acc.username === username);
  if (account?.pin === Number(pin)) {
    containerApp.style.opacity = 100;
    currentUser = account;
    return true;
  }
  return false;
}

function displaySummary(account) {
  labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;
  const inValue = account.movements.filter(m => m > 0).reduce((a, b) => a + b);
  const outValue = -account.movements
    .filter(m => m < 0)
    .reduce((a, b) => a + b);
  const interestValue = (inValue * account.interestRate) / 100;
  const balanceValue = inValue - outValue;
  displayTransactions(account);
  //labelBalance.textContent = balanceValue.toFixed(2);
  labelBalance.textContent = formatCurrency(currentUser, balanceValue);
  let currDate = new Date();
  labelDate.textContent = formatDate(currentUser, currDate, true);
  labelSumIn.textContent = formatCurrency(currentUser, inValue);
  labelSumOut.textContent = formatCurrency(currentUser, outValue);
  labelSumInterest.textContent = formatCurrency(currentUser, interestValue);
}

function displayTransactions(acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (row, i) {
    let type = row > 0 ? 'deposit' : 'withdrawal';
    let date = new Date(acc.movementsDates[i]);
    let html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${formatDate(
      currentUser,
      date,
      false,
      true
    )}</div>
    <div class="movements__value">${formatCurrency(currentUser, row)}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function formatDate(acc, date, requireTime = false, difference = false) {
  // let month = `${currDate.getMonth() + 1}`.padStart(2, 0);
  // let datee = `${currDate.getDate()}`.padStart(2, 0);
  // let hours = `${currDate.getHours()}`.padStart(2, 0);
  // let mins = `${currDate.getMinutes()}`.padStart(2, 0);
  if (difference) {
    const diff = Math.round(
      Math.abs(new Date() - date) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return 'Today';
    else if (diff === 1) return 'Yesterday';
    else if (diff <= 7) return 'A week ago';
    else return new Intl.DateTimeFormat(acc.locale).format(date);
  } else {
    return requireTime
      ? new Intl.DateTimeFormat(acc.locale, {
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }).format(date)
      : new Intl.DateTimeFormat(acc.locale).format(date);
  }
}

function formatCurrency(acc, value) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);
}

function setTimer() {
  let sec = 1;
  let min = 10;
  setInterval(function () {
    labelTimer.innerHTML = min + ':' + sec.toString().padStart(2, '0');
    sec--;
    if (sec == 0) {
      min--;
      sec = 60;
    }
  }, 1000);
  setTimeout(logoutUser, 100000);
}

function logoutUser() {
  currentUser = null;
  containerApp.style.opacity = 0;
}

function calculateBalance(acc) {
  return acc.movements.reduce((a, b) => a + b);
}

//TRANFER

function transferMoney() {
  if (
    Number(inputTransferAmount.value) > 0 &&
    Number(inputTransferAmount.value) <= calculateBalance(currentUser) &&
    currentUser.username !== inputTransferTo.value
  ) {
    const toAccount = accounts.find(
      acc => acc.username === inputTransferTo.value
    );
    if (toAccount) {
      let currDate = new Date();
      toAccount.movements.push(Number(inputTransferAmount.value));
      toAccount.movementsDates.push(currDate.toISOString());
      currentUser.movements.push(-Number(inputTransferAmount.value));
      currentUser.movementsDates.push(currDate.toISOString());
      displaySummary(currentUser);
    }
  }
  inputTransferTo.value = inputTransferAmount.value = '';
}

//LOAN

function requestLoan() {
  if (currentUser.movements.some(mov => mov >= amount * 0.1)) {
    currentUser.movements.push(Number(inputLoanAmount.value));
    currentUser.movementsDates.push(new Date().toISOString());
    displaySummary(currentUser);
  }
  inputLoanAmount.value = '';
}

//CLOSE

function closeAccount() {
  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentUser.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
}

//MAIN

calculateUserNames();

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  loginUser();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferMoney();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  requestLoan();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  closeAccount();
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentUser.movements, !sorted);
  sorted = !sorted;
});

// FAKE ALWAYS LOGGED IN
// currentUser = account1;
// displaySummary(currentUser);
// containerApp.style.opacity = 100;
