let kirkiesHeading
let body

let kirkes = 0;

let upgradeOptions = {
    kirkFarmer: {name: "Kirk", amount: 0, kirkiesPrice: 10, kirkiesPerSecond: 1, minerDeployed: false, minerIconUrl: "https://lifesurge.com/wp-content/uploads/charlie-kirk-memorial-tribute.webp"},
    elon: {name: "Elon", amount: 0, kirkiesPrice: 500, kirkiesPerSecond: 100, minerDeployed: false, minerIconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmLeYECnJd_F8NfFgRKBt-TXfnVYi3K8BwJoPrbAth2g"},
    trump: {name: "Trump", amount: 0, kirkiesPrice: 1000, kirkiesPerSecond: 500, minerDeployed: false, minerIconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-OFP4oyXMBrFrge_fFMlcxzmtNiEI4dROXpLy8fzEQ"},
    drHouse: {name: "Dr House", amount: 0, kirkiesPrice: 5000, kirkiesPerSecond: 1000, minerDeployed: false, minerIconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXfqTIEXpNrg-DNUn0O2lPV3X06sulUUmyqbKT06Zj6Q"},
    drForeman: {name: "Dr Foreskin", amount: 0, kirkiesPrice: 10000, kirkiesPerSecond: 5000, minerDeployed: false, minerIconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS8srJTUo3LCJNLOxcC4PDW20PjRPY305_tTPrXDRGzw"},
}

function addMiner(upgradeKey) {
    const {minerDeployed, minerIconUrl} = upgradeOptions[upgradeKey];
    if (!minerDeployed) {
        upgradeOptions[upgradeKey].minerDeployed = true;

        let minerElement = document.createElement("img");
        minerElement.className = "miner";
        minerElement.src = `${minerIconUrl}`;
        minerElement.style.left = `${50 * Math.random()}vw`;
        minerElement.style.top = `${50 * Math.random()}vh`;
        body.appendChild(minerElement);
    }
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

        updateUpgradeOption(upgradeKey);
        addMiner(upgradeKey);   
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
    body = document.getElementById("body");

    for (let [key, value] of Object.entries(upgradeOptions)) {
        updateUpgradeOption(key)
    }

    setInterval(process, 1000);
});