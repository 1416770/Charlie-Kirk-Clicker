let kirkiesHeading
let mainContainer

let kirkes = 0;

let upgradeOptions = {
    kirkFarmer: {name: "Kirk Farmers", amount: 0, kirkiesPrice: 20, kirkiesPerSecond: 1}
}

function onKirkButton() {
    kirkes ++;

    let effectDiv = document.createElement("div");
    effectDiv.className = "kirkEffect";

    effectDiv.addEventListener("animationend", function() {
        effectDiv.remove();
    });

    mainContainer.appendChild(effectDiv);

    kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
}

function onUpgradeButton(upgradeName) {
    for (let [key, value] of Object.entries(upgradeOptions)) {
        let {name, amount, kirkiesPrice} = value;
        if (key == upgradeName && kirkes >= kirkiesPrice) {
            kirkes -= kirkiesPrice;
            amount ++;
            upgradeOptions[key].amount = amount;

            let upgradeHeader = document.getElementById(key);
            upgradeHeader.innerHTML =
            `
                ${name}: ${amount}
                <br>
                £${kirkiesPrice}            
            `

            kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
        }
    }
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
    mainContainer = document.getElementById("mainContainer")

    for (let [key, value] of Object.entries(upgradeOptions)) {
        let {name, amount, kirkiesPrice} = value;

        let upgradeHeader = document.getElementById(key);
        upgradeHeader.innerHTML =
        `
            ${name}: ${amount}
            <br>
            £${kirkiesPrice}            
        `
    }

    setInterval(process, 1000);
});