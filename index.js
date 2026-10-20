let kirkiesHeading
let body

let kirkes = 0;

let upgradeOptions = {
    kirkFarmer: {name: "Kirk Farmers", amount: 0, kirkiesPrice: 20, kirkiesPerSecond: 1}
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