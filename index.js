let kirkiesHeading
let body

let kirkes = 0;

let upgradeOptions = {
    kirkFarmer: {name: "Kirk Farmer", amount: 0, kirkiesPrice: 10, kirkiesPerSecond: 1},
    elon: {name: "Elon", amount: 0, kirkiesPrice: 100, kirkiesPerSecond: 10},
    trump: {name: "Trumpy", amount: 0, kirkiesPrice: 300, kirkiesPerSecond: 30},
    drHouse: {name: "HOUSE", amount: 0, kirkiesPrice: 500, kirkiesPerSecond: 50},
    drForeman: {name: "Dr Foreskin", amount: 0, kirkiesPrice: 1000, kirkiesPerSecond: 100},
}

function updateUpgradeOption(upgradeKey) {
    const {name, amount, kirkiesPrice, kirkiesPerSecond} = upgradeOptions[upgradeKey];

    const upgradeHeader = document.getElementById(upgradeKey);
    upgradeHeader.innerHTML =
    `
        ${name}: ${amount}
        <br>
        ${kirkiesPrice} kirkies
        <br>
        +${kirkiesPerSecond} kirkes per second            
    `;

    kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
}

function onKirkButton() {
    kirkes ++;

    let effectDiv = document.createElement("div");
    effectDiv.className = "kirkEffect";
    effectDiv.addEventListener("animationend", effectDiv.remove);
    body.appendChild(effectDiv);

    kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
}

function onUpgradeButton(upgradeKey) {
    const {kirkiesPrice} = upgradeOptions[upgradeKey];
    if (kirkes >= kirkiesPrice) {
        kirkes -= kirkiesPrice;
        upgradeOptions[upgradeKey].amount ++;
    }

    updateUpgradeOption(upgradeKey)
}

function process() {
    for (let [key, value] of Object.entries(upgradeOptions)) {
        let {amount, kirkiesPerSecond} = value;
        
        kirkes += kirkiesPerSecond * amount;
    }

    kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
}

document.addEventListener("DOMContentLoaded", function() {
    kirkiesHeading = document.getElementById("kirkies");
    body = document.getElementById("body");

    for (let [key, value] of Object.entries(upgradeOptions)) {
        updateUpgradeOption(key)
    }

    setInterval(process, 1000);
});