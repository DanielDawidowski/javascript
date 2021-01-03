const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money 
async function getRandomUser() {
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json()

   const user = data.results[0];
   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 1000000)
   }

   addData(newUser);
}

// Double everyones money
function doubleMoney() {
    data = data.map((person) => {
        return { ...person, money: person.money * 2}
    });

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, person) => (acc += person.money), 0);

    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`
    main.appendChild(wealthEl)
}

// Sort persons by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Add new obj to data array
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// Update Dom
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(person => {
        const el = document.createElement('div');
        el.classList.add('person');
        el.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(el);
    })
}

// Format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser); 
doubleBtn.addEventListener('click', doubleMoney); 
sortBtn.addEventListener('click', sortByRichest); 
showMillionairesBtn.addEventListener('click', showMillionaires); 
calculateWealthBtn.addEventListener('click', calculateWealth); 
