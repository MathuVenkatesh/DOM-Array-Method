let addUserBtn = document.getElementById("add-user");
let doubleBtn = document.getElementById("double");
let milliBtn = document.getElementById("milli");
let sortRichBtn = document.getElementById("sort");
let calcBtn = document.getElementById("calc");
let main = document.getElementById("main");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last} `,
    money: Math.floor(Math.random() * 100),
  };
  addData(newUser);
}

// double the value of each person's money

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//show only milli

function showOnlyMilli() {
  data = data.filter((user) => user.money > 100);
  updateDOM();
}

//calc the total amount

// function calculateWealth() {
//   const wealth = data.reduce((acc, user) => (acc += user.money), 0);

//   const wealthEl = document.createElement("div");
//   wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
//     wealth
//   )}</strong></h3>`;
//   main.appendChild(wealthEl);
// }

function totalAmount() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Add Data function
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Update DOM Function
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>$ Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
//format number as money format
function formatMoney(number) {
  return "Rs. " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//add event listerner
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortRichBtn.addEventListener("click", sortByRichest);
milliBtn.addEventListener("click", showOnlyMilli);
calcBtn.addEventListener("click", totalAmount);
