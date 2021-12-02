// Access the game elements 
const upgrade = document.querySelector("#upgrade");
const rameses = document.querySelector("#rameses");
const upgradeCostDoc = document.querySelector("#upgradeCost");
const scoreDoc = document.querySelector("#score");
const autoClicker = document.querySelector("#buyAutoClicker");
const clickerCostDoc = document.querySelector("#clickerCost");
const deanDomeDoc = document.querySelector("#deanDome");
const deanDomeCostDoc = document.querySelector("#deanDomeCost");


// Initialize the game variables 
var level = 1;
var score = 0;
var upgradeCost = 25;
var clickerCost = 500;
var autoClickerLevel = 0; 
var deanDome = false;
var deanDomeCost = 1000;


// Initial display values
scoreDoc.innerHTML = "Fever Points: " + score;
upgradeCostDoc.innerHTML = "Upgrade Cost: " + upgradeCost;
clickerCostDoc.innerHTML = "Auto Clicker Cost: " + clickerCost;

// Upgrade cursor click function
upgrade.onclick = function(){
    if (score >= upgradeCost) {
        score -= upgradeCost;
        updateScore();
        upgradeCost = upgradeCost*3;
        updateCost();
        level++;
    }
}

// Manual Rameses click function
rameses.onclick = function() {
    score+= (level**2)*1;
    updateScore();
}

// Buy auto clicker function
autoClicker.onclick = function() {
    if (score >= clickerCost) {
        score -= clickerCost;
        updateScore();
        clickerCost = clickerCost*5;
        updateClickerCost();
        autoClickerLevel++;
    }
}


// Increase score for auto clicker
window.setInterval(function() {
    score += (autoClickerLevel**2)*1;
    if (deanDome) { score += 10; }
    updateScore();
}, 500);

//Dean Dome Functions
deanDomeDoc.onclick = function() {
    if (score>= deanDomeCost) {
        score -= deanDomeCost;
        updateScore();
        deanDome = true;
        deanDomeCostDoc.remove();
        deanDomeDoc.src = "./DeanDome.jpg";
    } 
}
deanDomeDoc.onmouseover = function() { };

// Update Score and Upgrade Cost Display
function updateScore() { scoreDoc.innerHTML = "Fever Points: " + score;}
function updateCost() { upgradeCostDoc.innerHTML = "Upgrade Cost: " + upgradeCost;}
function updateClickerCost() {clickerCostDoc.innerHTML = "Auto Clicker Cost: " + clickerCost}

