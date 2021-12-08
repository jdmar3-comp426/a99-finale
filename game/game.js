// Access the game elements 
const upgrade = document.querySelector("#upgrade");
const rameses = document.querySelector("#rameses");
const upgradeCostDoc = document.querySelector("#upgradeCost");
const scoreDoc = document.querySelector("#score");
const autoClicker = document.querySelector("#buyAutoClicker");
const clickerCostDoc = document.querySelector("#clickerCost");
const deanDomeDoc = document.querySelector("#deanDome");
const deanDomeCostDoc = document.querySelector("#deanDomeCost");
const usernameDoc = document.querySelector("#username");
const emailDoc = document.querySelector("#email");
const ramesesLevel = document.querySelector("#rameses-level");
const autoClickerLevelDoc = document.querySelector("#autoclicker-level");
const unlockDDDoc = document.querySelector("#unlockedDD");

// Grab the user from local storage
var user = localStorage.getItem("user");

// Initialize the game variables 
var email, score, level, upgradeCost, clickerCost, autoClickerLevel, deanDome, deanDomeCost, intervalId;

// Create a new XHR to get all of the user information from api
const initialXHR = new XMLHttpRequest();
initialXHR.addEventListener("load", e => {
  // Load json response and set all of the user data
  let response = JSON.parse(e.target.responseText);
  email = response.email;
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
  if (deanDome) {
    deanDomeCostDoc.remove();
    deanDomeDoc.src = "./assets/DeanDome.jpg";
  }
  usernameDoc.innerHTML = "Username: " + user;
  emailDoc.innerHTML = "Email: " + email;
  ramesesLevel.innerHTML = "Rameses Level: " + level;
  autoClickerLevelDoc.innerHTML = "Autoclicker Level: " + autoClickerLevel;
  unlockDDDoc.innerHTML = deanDome ? "Mystery Unlocked: Yes!" : "Mystery Unlocked: No";
  // Call to set up autosave interval
  autoSaveSetup();
  // Set up autoclicker if it's already been unlocked
  intervalId = 1;
  if (autoClickerLevel > 0) {
    setInterval(function() {
      score += deanDome ? 3 : 1;
      updateScore();
    }, Math.floor(500 / autoClickerLevel));
    intervalId++
  }
}

// Upgrade cursor click function
upgrade.onclick = function(){
  if (score >= upgradeCost) {
    score -= upgradeCost;
    updateScore();
    upgradeCost = upgradeCost*3;
    updateCost();
    level++;
    ramesesLevel.innerHTML = "Rameses Level: " + level;
  }
}

// Manual Rameses click function
rameses.onclick = function() {
  rameses.src = "./assets/rameses_inverted.gif";
  setTimeout(_ => rameses.src = "./assets/rameses.gif", 100);
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
    clearInterval(intervalId);
    intervalId++;
    autoClickerLevel++;
    autoClickerLevelDoc.innerHTML = "Autoclicker Level: " + autoClickerLevel;
    setInterval(function() {
      score += deanDome ? 3 : 1;
      updateScore();
    }, Math.floor(500 / autoClickerLevel));
  }
}

//Dean Dome Functions
deanDomeDoc.onclick = function() {
  if (score >= deanDomeCost && !deanDome) {
    score -= deanDomeCost;
    updateScore();
    deanDome = true;
    deanDomeCostDoc.remove();
    deanDomeDoc.src = "./assets/DeanDome.jpg";
    unlockDDDoc.innerHTML = "Mystery Unlocked: Yes!";
  } 
}

// Update Score and Upgrade Cost Display
function updateScore() { scoreDoc.innerHTML = "Fever Points: " + score};
function updateCost() { upgradeCostDoc.innerHTML = "Upgrade Cost: " + upgradeCost};
function updateClickerCost() {clickerCostDoc.innerHTML = "Auto Clicker Cost: " + clickerCost};

// Set up autosave interval
function autoSaveSetup() {
  setInterval(function() {
    // Create a new XHR
    const XHR = new XMLHttpRequest();

    // Make the new saved values equal to current user values
    const FD = new URLSearchParams({
      "score": score,
      "level": level,
      "upgradeCost": upgradeCost,
      "clickerCost": clickerCost,
      "autoClickerLevel": autoClickerLevel,
      "deanDome": deanDome,
      "deanDomeCost": deanDomeCost
    });

    // Console.log successful submission on load
    XHR.addEventListener("load", e => console.log(e.target.responseText));

    // Console.log error if something weird occurs
    XHR.addEventListener("error", e => console.log("Something went wrong."));

    // Set up our request
    XHR.open("PATCH", "http://localhost:5000/app/update/user/" + user);

    // Send the request
    XHR.send(FD);
  }, 3000);
}
