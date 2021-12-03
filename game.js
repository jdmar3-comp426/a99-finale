// Access the game elements 
const upgrade = document.querySelector("#upgrade");
const rameses = document.querySelector("#rameses");
const upgradeCostDoc = document.querySelector("#upgradeCost");
const scoreDoc = document.querySelector("#score");
const autoClicker = document.querySelector("#buyAutoClicker");
const clickerCostDoc = document.querySelector("#clickerCost");
const deanDomeDoc = document.querySelector("#deanDome");
const deanDomeCostDoc = document.querySelector("#deanDomeCost");

// Grab the user from local storage
var user = localStorage.getItem("user");

// Initialize the game variables 
var score, level, upgradeCost, clickerCost, autoClickerLevel, deanDome, deanDomeCost;

const initialXHR = new XMLHttpRequest();
initialXHR.addEventListener("load", e => {
  let response = JSON.parse(e.target.responseText);
  score = response.score;
  level = response.level;
  upgradeCost = response.upgradeCost;
  clickerCost = response.clickerCost;
  autoClickerLevel = response.autoClickerLevel;
  deanDome = response.deanDome;
  deanDomeCost = response.deanDomeCost;
  setInitialDisplays();
})
initialXHR.addEventListener("error", e => console.log(e))
initialXHR.open("GET", "http://localhost:5000/app/user/" + user);
initialXHR.send()


// Set initial display values
function setInitialDisplays() {
  scoreDoc.innerHTML = "Fever Points: " + score;
  upgradeCostDoc.innerHTML = "Upgrade Cost: " + upgradeCost;
  clickerCostDoc.innerHTML = "Auto Clicker Cost: " + clickerCost;
  // NEED TO SHOW DEAN DOME AS WELL IF THEY ALREADY HAVE IT
}

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
        clearInterval(autoClickerLevel);
        autoClickerLevel++;
        setInterval(function() {
            score += deanDome ? 3 : 1;
            updateScore();
        }, Math.floor(500 / autoClickerLevel));
    }
}

//Dean Dome Functions
deanDomeDoc.onclick = function() {
    if (score >= deanDomeCost) {
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

window.setInterval(function() {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams({
    "score": score,
    "level": level,
    "upgradeCost": upgradeCost,
    "clickerCost": clickerCost,
    "autoClickerLevel": autoClickerLevel,
    "deanDome": deanDome,
    "deanDomeCost": deanDomeCost
  });

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("PATCH", "http://localhost:5000/app/update/user/" + user);

  // Send the request
  XHR.send(FD);
}, 3000);
