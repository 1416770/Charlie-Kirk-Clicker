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

    const mainContainer = document.getElementById("mainContainer")
    mainContainer.appendChild(effectDiv);

    const kirkiesHeading = document.getElementById("kirkies");
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

            const kirkiesHeading = document.getElementById("kirkies");
            kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;
        }
    }
}

function process() {
    for (let [key, value] of Object.entries(upgradeOptions)) {
        let {amount, kirkiesPerSecond} = value;
        
        kirkes += kirkiesPerSecond * amount;

    }

    const kirkiesHeading = document.getElementById("kirkies");
    kirkiesHeading.innerHTML = `Kirkies: ${kirkes}`;

    setTimeout(process, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
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

    //process();
});