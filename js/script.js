// pwa
//See if the browser supports Service Workers, if so try to register one
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./js/serviceWorker.js")
    .then(function (registering) {
      // Registration was successful
      console.log(
        "Browser: Service Worker registration is successful with the scope",
        registering.scope
      );
    })
    .catch(function (error) {
      //The registration of the service worker failed
      console.log(
        "Browser: Service Worker registration failed with the error",
        error
      );
    });
} else {
  //The registration of the service worker failed
  console.log("Browser: I don't support Service Workers :(");
}

//////////////////////////////////
//////////////////
// options menu
//////////////////
//////////////////////////////////
const theme = new Audio("./sounds/theme.mp3");
theme.volume = 0.5;
const voice = new Audio("./sounds/voiceActing.mp3");
voice.volume = 0.5;
const monsterSound = new Audio("./sounds/monster.mp3");
monsterSound.volume = 0.5;
const attackSound = new Audio("./sounds/swing.mp3");
attackSound.volume = 0.5;
const zyklonAttack = new Audio("./sounds/swing2.mp3");
zyklonAttack.volume = 0.5;
const final = new Audio("./sounds/finalfight.mp3");
final.volume = 0.5;
const after = new Audio("./sounds/cutsceneMusic.mp3");
after.volume = 0.5;
const walking = new Audio("./sounds/walking.mp3");
walking.volume = 0.5;

oOverlay = document.querySelector("#optionsOverlay");

document.querySelector("#options").addEventListener("click", () => {
  oOverlay.style.display = "flex";
  changeSlider();
});

document.querySelector("#exit").addEventListener("click", () => {
  oOverlay.style.display = "none";
  soundEffect.innerHTML = "50%";
  backgroundMusic.innerHTML = "50%";
  seSLider.value = 50;
  bgmSlider.value = 50;
});

document.querySelector("#save").addEventListener("click", () => {
  savedOverlay = document.createElement("div");
  savedOverlay.classList.add("savedOverlay");
  oOverlay.appendChild(savedOverlay);
  spanOverlay = document.createElement("span");
  spanOverlay.classList.add("spanOverlay");
  spanOverlay.innerHTML = "Options saved!";
  savedOverlay.appendChild(spanOverlay);
  setTimeout(() => {
    savedOverlay.remove();
    oOverlay.style.display = "none";
  }, 2000);
});

let rangeInput = document.querySelectorAll('input[type="range"]');

function changeSlider() {
  rangeInput.forEach((element) => {
    let newValue = element.value;
    let newColor =
      "linear-gradient(90deg, #8383FF " +
      newValue +
      "%, #222 " +
      newValue +
      "%)";
    element.style.background = newColor;
    element.addEventListener("input", () => {
      let newValue = element.value;
      let newColor =
        "linear-gradient(90deg, #8383FF " +
        newValue +
        "%, #222 " +
        newValue +
        "%)";
      element.style.background = newColor;
    });
  });
}
document.querySelector(".slider").addEventListener("click", () => {
  document.querySelector(".voiceActing").style.display = "none";
  voice.play();
});

let soundEffect = document.querySelector("#soundEffect");
let backgroundMusic = document.querySelector("#backgroundMusic");
let seSLider = document.querySelector("#seSlide");
let bgmSlider = document.querySelector("#bgmSlide");

seSLider.addEventListener("input", () => {
  soundEffect.innerHTML = seSLider.value + "%";
  monsterSound.volume = seSLider.value / 100;
  attackSound.volume = seSLider.value / 100;
  zyklonAttack.volume = seSLider.value / 100;
  walking.volume = seSLider.value / 100;
});

bgmSlider.addEventListener("input", () => {
  backgroundMusic.innerHTML = bgmSlider.value + "%";
  theme.volume = bgmSlider.value / 100;
  final.volume = bgmSlider.value / 100;
  after.volume = bgmSlider.value / 100;
});

//////////////////////////////////
//////////////////
// end screen
//////////////////
//////////////////////////////////

document.querySelector("#end").addEventListener("click", () => {
  document.querySelector("main").style.display = "none";
  document.querySelector(".endScreen").style.display = "flex";
});

//////////////////////////////////
//////////////////
// start game
//////////////////
//////////////////////////////////
let started = false;
const screenOne = document.querySelector(".screenOne");

document.querySelector("#start").addEventListener("click", () => {
  started = true;
  document.querySelector(".gameScreen").style.display = "flex";
  screenOne.style.display = "block";
  document.querySelector("main").style.display = "none";
  theme.play();
  theme.loop = true;
  if (started) {
    move();
  }
});

//////////////////////////////////
//////////////////
// controls
//////////////////
//////////////////////////////////
const img = document.querySelector("#capybara");
const cave = document.querySelector("#cave");

function move() {
  let imgWidth = img.offsetWidth;
  let caveWidth = cave.offsetLeft;
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        walking.play();
        let newLeftPos = img.offsetLeft - 10;
        if (newLeftPos >= 0) {
          img.style.top = "530px";
          img.src = "./images/capybara.png";
          img.style.transform = "scaleX(-1)";
          img.style.left = newLeftPos + "px";
        }
        break;
      case "ArrowRight":
      case "d":
        walking.play();
        img.style.top = "530px";
        img.src = "./images/capybara.png";
        img.style.transform = "scaleX(1)";
        img.style.left = img.offsetLeft + 10 + "px";
        if (imgWidth + img.offsetLeft > caveWidth) {
          screenOne.style.display = "none";
          document.querySelector(".screenTwo").style.display = "block";
          walking.pause();
        }
        break;
    }
  });
  document.addEventListener("keyup", () => {
    walking.pause();
    img.src = "./images/capybaraSit.png";
    img.style.top = "380px";
    if (img.offsetLeft < 52) {
      img.style.left = "80px";
    }
  });
}

//////////////////////////////////
//////////////////
// game
//////////////////
//////////////////////////////////

// intro

var playerName = "";
document.querySelector(".nameBtn").addEventListener("click", function () {
  if (document.querySelector("#name").value == "") {
    alert("Please enter a name!");
  } else {
    playerName = document.querySelector("#name").value;
    document.querySelector("#playerName").innerHTML = playerName;
    document.querySelector(".screenTwo").style.display = "none";
    document.querySelector(".screenThree").style.display = "block";
  }
});

// screen after name select
document.querySelector("#chooseClass").addEventListener("click", function () {
  document.querySelector(".screenThree").style.display = "none";
  document.querySelector(".classSelect").style.display = "block";
});

// decline offer
document.querySelectorAll(".noClass").forEach((item) => {
  item.addEventListener("click", function () {
    overlay = document.createElement("div");
    overlay.classList.add("overlayClass");
    document.querySelector(".gameBox").appendChild(overlay);
    spanOverlay = document.createElement("span");
    spanOverlay.classList.add("spanOverlay");
    spanOverlay.innerHTML =
      "<span> WHAT HOW DARE YOU </span>" +
      "<span> She reduces you to ashes :) </span>" +
      "<span class='you'> Dark souls you died sound </span>";
    overlay.appendChild(spanOverlay);
    setTimeout(() => {
      location.reload();
    }, 4000);
  });
});

//////////////////////////////////
//////////////////
// class select
//////////////////
//////////////////////////////////

var classChoice = "";
var level = 1;
const classSelect = document.querySelector(".classSelect");

document.querySelectorAll(".classes").forEach((item) => {
  item.addEventListener("click", function () {
    classChoice = item.id;
    overlayClass = document.createElement("div");
    overlayClass.classList.add("overlayClass");
    classSelect.appendChild(overlayClass);
    spanOverlay = document.createElement("span");
    spanOverlay.classList.add("spanOverlay", "spanClass");
    spanOverlay.innerHTML =
      "<span> Are you sure you want to be a " + classChoice + "? </span>";
    overlayClass.appendChild(spanOverlay);
    // choices
    yesChoice = document.createElement("button");
    yesChoice.classList.add("yesChoice");
    yesChoice.innerHTML = "Yes";
    spanOverlay.appendChild(yesChoice);

    noChoice = document.createElement("button");
    noChoice.classList.add("noChoice");
    noChoice.innerHTML = "No";
    spanOverlay.appendChild(noChoice);
    // yes or no
    yesChoice.addEventListener("click", function () {
      classSelect.style.display = "none";
      document.querySelector(".afterClass").style.display = "block";
    });
    noChoice.addEventListener("click", function () {
      overlayClass.remove();
    });
  });
});

document.querySelector(".caveAmbush").addEventListener("click", function () {
  document.querySelector(".afterClass").style.display = "none";
  document.querySelector(".playerChoice").style.display = "flex";
});

document.querySelector("#run").addEventListener("click", function () {
  overlay = document.createElement("div");
  overlay.classList.add("overlayClass");
  document.querySelector(".playerChoice").appendChild(overlay);
  spanOverlay = document.createElement("span");
  spanOverlay.classList.add("spanOverlay");
  spanOverlay.innerHTML = "<span> We don't do that </span>";
  overlay.appendChild(spanOverlay);
  setTimeout(() => {
    overlay.remove();
  }, 1000);
});

document.querySelector("#look").addEventListener("click", function () {
  overlay = document.createElement("div");
  overlay.classList.add("overlayClass");
  document.querySelector(".playerChoice").appendChild(overlay);
  spanOverlay = document.createElement("span");
  spanOverlay.classList.add("spanOverlay");
  spanOverlay.innerHTML =
    "<span> You look at Amanda. </span> <span> Amanda looks at you. </span>";
  overlay.appendChild(spanOverlay);
  setTimeout(() => {
    overlay.remove();
  }, 2000);
});

//////////////////////////////////
//////////////////
// combat
//////////////////
//////////////////////////////////

// remaining player health
var remainingHealth = null;
// player health
var health = null;
// player health
const playerHealth = document.querySelector("#playerHealth");
// player spell list
var spellList = [];
// enemyHealth
var monsterAttack = null;
// sets special number 0 is not unlocked 1 is 1
var special = 0;
// win amount
var won = 0;
// Checks for final fight
var attackCount = 0;
// checks if final fight
var finalFight = false;

// combat calculation
function combat() {
  // enemy looks
  const enemyImage = document.querySelector("#enemy");
  // enemy name
  const enemyName = document.querySelector("#enemyName");
  // enemy health
  const enemyHealth = document.querySelector("#enemyHealth");

  switch (level) {
    case 1:
      // player hp for lvl 1
      health = 100;
      // Enemy
      fetch("./json/enemies.json")
        .then((response) => response.json())
        .then((monster) => {
          random = Math.floor(Math.random() * monster.levelOne.length);
          enemyImage.src = monster.levelOne[random].img;
          enemyHealth.innerHTML = monster.levelOne[random].hp;
          enemyName.innerHTML =
            monster.levelOne[random].name + "'s " + "health:";
          monsterAttack = monster.levelOne[random].attack;
        });

      // player
      fetch("./json/abilities.json")
        .then((response) => response.json())
        .then((player) => {
          player[classChoice][0].levelOne.forEach((item) => {
            spellList.push(item);
          });
        });

      break;
    case 2:
      // player hp for lvl 2
      health = 150;
      // Enemy
      fetch("./json/enemies.json")
        .then((response) => response.json())
        .then((monster) => {
          random = Math.floor(Math.random() * monster.levelTwo.length);
          enemyImage.src = monster.levelTwo[random].img;
          enemyHealth.innerHTML = monster.levelTwo[random].hp;
          enemyName.innerHTML =
            monster.levelTwo[random].name + "'s " + "health:";
          monsterAttack = monster.levelTwo[random].attack;
        });

      // player
      fetch("./json/abilities.json")
        .then((response) => response.json())
        .then((player) => {
          player[classChoice][0].levelTwo.forEach((item) => {
            spellList.push(item);
          });
        });
      break;
    case 3:
      // player hp for lvl 3
      health = 200;
      // Enemy
      fetch("./json/enemies.json")
        .then((response) => response.json())
        .then((monster) => {
          random = Math.floor(Math.random() * monster.levelThree.length);
          enemyImage.src = monster.levelThree[random].img;
          enemyHealth.innerHTML = monster.levelThree[random].hp;
          enemyName.innerHTML =
            monster.levelThree[random].name + "'s " + "health:";
          monsterAttack = monster.levelThree[random].attack;
        });

      // player
      fetch("./json/abilities.json")
        .then((response) => response.json())
        .then((player) => {
          player[classChoice][0].levelThree.forEach((item) => {
            spellList.push(item);
          });
        });
      break;
  }
  // gives the player the correct amount of hp
  remainingHealth = health;
  playerHealth.innerHTML = remainingHealth;
}

document.querySelector("#fight").addEventListener("click", function () {
  document.querySelector(".playerChoice").style.display = "none";
  document.querySelector(".fight").style.display = "grid";
  combat();
});

document.querySelector("#flee").addEventListener("click", function () {
  overlay = document.createElement("div");
  overlay.classList.add("overlayClass");
  document.querySelector(".fight").appendChild(overlay);
  spanOverlay = document.createElement("span");
  spanOverlay.classList.add("spanOverlay");
  spanOverlay.innerHTML = "<span> You try to run away but no</span>";
  overlay.appendChild(spanOverlay);
  setTimeout(() => {
    overlay.remove();
  }, 1000);
  setTimeout(enemyAttack, 1005);
});

// player attack
function attack() {
  let button = document.querySelector("#attack");
  let rect = button.getBoundingClientRect();
  let currentTop = rect.bottom;

  spellList.forEach((item) => {
    var overlay = document.createElement("button");
    overlay.classList.add("attackButtons");
    overlay.style.position = "fixed";
    overlay.style.width = rect.width + "px";
    overlay.style.height = "auto";
    overlay.style.left = rect.left + "px";

    // Create a text node with the item name and append it to the overlay
    var text = document.createTextNode(item.name);
    overlay.appendChild(text);

    // Append the overlay to the body to calculate its height
    document.body.appendChild(overlay);

    // Update the top position for the next overlay
    currentTop -= overlay.offsetHeight;

    // Set the top position of the overlay
    overlay.style.top = currentTop + "px";

    overlay.addEventListener("click", function () {
      attackSound.play();
      enemyHealth.innerHTML -= item.damage;
      if (enemyHealth.innerHTML <= 0) {
        spellList = [];
        var overlay1 = document.createElement("div");
        overlay1.classList.add("overlayClass");
        document.querySelector(".fight").appendChild(overlay1);
        spanOverlay1 = document.createElement("span");
        spanOverlay1.classList.add("spanOverlay");
        spanOverlay1.innerHTML = "<span> You win!</span>";
        overlay1.appendChild(spanOverlay1);
        setTimeout(() => {
          won++;
          overlay1.remove();
          document.querySelector(".fight").style.display = "none";
          document.querySelector(".afterFight" + won).style.display = "block";
        }, 1000);
      } else {
        setTimeout(enemyAttack, 400);
      }
      document.querySelectorAll(".attackButtons").forEach((button) => {
        button.remove();
      });
    });
  });

  // removes the overlay when clicked outside
  document.addEventListener("click", function removeOverlay(event) {
    if (!event.target.classList.contains("attackButtons")) {
      document.querySelectorAll(".attackButtons").forEach((button) => {
        button.remove();
      });
      document.removeEventListener("click", removeOverlay);
    }
  });
}

// for special attack
function specialAttack() {
  switch (special) {
    case 0: {
      overlay = document.createElement("div");
      overlay.classList.add("overlayClass");
      document.querySelector(".fight").appendChild(overlay);
      spanOverlay = document.createElement("span");
      spanOverlay.classList.add("spanOverlay");
      spanOverlay.innerHTML = "<span> No special yet </span>";
      overlay.appendChild(spanOverlay);
      setTimeout(() => {
        overlay.remove();
      }, 1000);
      break;
    }
    case 1: {
      let button = document.querySelector("#special");
      let rect = button.getBoundingClientRect();
      let currentTop = rect.bottom;

      var overlay = document.createElement("button");
      overlay.classList.add("attackButtons");
      overlay.style.position = "fixed";
      overlay.style.width = rect.width + "px";
      overlay.style.height = "auto";
      overlay.style.left = rect.left + "px";

      // Create a text node with the item name and append it to the overlay
      var text = document.createTextNode("Amanda CANNON");
      overlay.appendChild(text);

      // Append the overlay to the body to calculate its height
      document.body.appendChild(overlay);

      // Update the top position for the next overlay
      currentTop -= overlay.offsetHeight;

      // Set the top position of the overlay
      overlay.style.top = currentTop + "px";

      const laster = new Audio("./sounds/laser.mp3");
      laster.volume = 0.5;
      overlay.addEventListener("click", function () {
        overlay.remove();
        final.pause();
        laster.play();
        overlay1 = document.createElement("div");
        overlay1.classList.add("overlayClass");
        document.querySelector(".fight").appendChild(overlay1);
        spanOverlay1 = document.createElement("span");
        spanOverlay1.classList.add("spanOverlay");
        spanOverlay1.innerHTML = "<span> BIG ASS LASER ATTACK </span>";
        overlay1.appendChild(spanOverlay1);
        laster.addEventListener("ended", function () {
          laster.currentTime = 0;
          setTimeout(() => {
            overlay.remove();
            overlay1.remove();
            document.querySelector(".fight").style.display = "none";
            document.querySelector(".ending").style.display = "block";
            after.play();
          }, 1000);
        });
        enemyHealth.innerHTML = -999;
      });
      break;
    }
  }
  // removes the overlay when clicked outside
  document.addEventListener("click", function removeOverlay(event) {
    if (!event.target.classList.contains("attackButtons")) {
      document.querySelectorAll(".attackButtons").forEach((button) => {
        button.remove();
      });
      document.removeEventListener("click", removeOverlay);
    }
  });
}

// enemy attack
function enemyAttack() {
  attackCount = 1;
  monsterSound.play();
  remainingHealth -= monsterAttack;
  playerHealth.innerHTML = remainingHealth;
  if (remainingHealth <= 0) {
    overlay1 = document.createElement("div");
    overlay1.classList.add("overlayClass");
    document.querySelector(".gameBox").appendChild(overlay1);
    spanOverlay1 = document.createElement("span");
    spanOverlay1.classList.add("spanOverlay");
    spanOverlay1.innerHTML = "<span> It seems like you died oh well </span>";
    overlay1.appendChild(spanOverlay1);
    setTimeout(() => {
      location.reload();
    }, 3000);
  } else {
    overlay = document.createElement("div");
    overlay.classList.add("overlayClass");
    document.querySelector(".fight").appendChild(overlay);
    spanOverlay = document.createElement("span");
    spanOverlay.classList.add("spanOverlay");
    spanOverlay.innerHTML =
      "<span> The enemy hit you for: " + monsterAttack + "</span>";
    overlay.appendChild(spanOverlay);
    setTimeout(() => {
      overlay.remove();
    }, 1000);
  }
  if (finalFight === true) {
    amandaHelp();
  }
}

// attack button
document.querySelector("#attack").addEventListener("click", function (event) {
  event.stopPropagation();
  attack();
});

// special button
document.querySelector("#special").addEventListener("click", function (event) {
  event.stopPropagation();
  specialAttack();
});

//////////////////////////////////
//////////////////
// after fight
//////////////////
//////////////////////////////////

const path = document.querySelector(".pathSelect");

document.querySelector("#acceptDeal").addEventListener("click", function () {
  document.querySelector(".afterFight1").style.display = "none";
  path.style.display = "block";
  map1();
});

// map selection

const mapData = [
  // 1st
  { id: 1, name: "Cave", x: 50, y: 300 },
  // 2nd
  { id: 2, name: "Swamp", x: 300, y: 75 },
  { id: 3, name: "Forest", x: 300, y: 525 },
  // 3rd
  { id: 4, name: "?", x: 550, y: 50 },
  { id: 5, name: "?", x: 550, y: 250 },
  { id: 6, name: "?", x: 550, y: 425 },
  { id: 7, name: "?", x: 550, y: 600 },
  // 4th
  { id: 8, name: "?", x: 800, y: 175 },
  { id: 9, name: "?", x: 800, y: 550 },
  // 5th
  { id: 10, name: "?", x: 1050, y: 300 },
];

function map1() {
  const map = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  path.appendChild(map);
  map.setAttribute("id", "map");
  const mapConnections = [
    // 1st
    { from: 1, to: [2, 3] },
  ];

  // Draw the boxes and text labels
  mapData.forEach((item) => {
    // Create the rect element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", item.x);
    rect.setAttribute("y", item.y);
    map.appendChild(rect);

    // Create the text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", item.x + 50); // center of the box
    text.setAttribute("y", item.y + 55); // slightly below the center
    text.setAttribute("text-anchor", "middle"); // center the text
    text.textContent = item.name;

    map.appendChild(text);

    // Check if the rect has any lines to it
    const hasLinesToIt = mapConnections.some((connection) =>
      connection.to.includes(item.id)
    );

    // If the rect has lines to it, make it clickable
    if (hasLinesToIt) {
      rect.addEventListener("click", function () {
        if (item.name === "Swamp") {
          document.querySelector(".pathSelect").style.display = "none";
          document.querySelector("#swamp").style.display = "block";
          map.remove();
        } else {
          // Do something else when 'forest' is clicked
          overlay = document.createElement("div");
          overlay.classList.add("overlayClass");
          document.querySelector(".pathSelect").appendChild(overlay);
          spanOverlay = document.createElement("span");
          spanOverlay.classList.add("spanOverlay");
          spanOverlay.innerHTML = "<span> Sorry this area isn't real</span>";
          overlay.appendChild(spanOverlay);
          setTimeout(() => {
            overlay.remove();
          }, 1000);
        }
      });
    }
  });
  // Draw the lines based on the mapConnections
  mapConnections.forEach((connection) => {
    const fromBox = mapData.find((box) => box.id === connection.from);

    connection.to.forEach((toId) => {
      const toBox = mapData.find((box) => box.id === toId);

      // Create the line element
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fromBox.x + 25);
      line.setAttribute("y1", fromBox.y + 25);
      line.setAttribute("x2", toBox.x + 25);
      line.setAttribute("y2", toBox.y + 25);
      line.style.stroke = "white";
      line.style.strokeWidth = "2";
      map.insertBefore(line, map.firstChild);
    });
  });
}

function map2() {
  level = 2;
  const map = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  path.appendChild(map);
  const mapConnections = [
    // 2nd
    { from: 2, to: [4, 5] },
    { from: 3, to: [6, 7] },
  ];
  // Draw the boxes and text labels
  mapData.forEach((item) => {
    if (item.id === 4) {
      item.name = "Field";
    }
    // Create the rect element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", item.x);
    rect.setAttribute("y", item.y);
    map.appendChild(rect);

    // Create the text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", item.x + 50); // center of the box
    text.setAttribute("y", item.y + 55); // slightly below the center
    text.setAttribute("text-anchor", "middle"); // center the text
    text.textContent = item.name;

    map.appendChild(text);
    // Check if the rect has any lines to it
    const hasLinesToIt = mapConnections.some((connection) =>
      connection.to.includes(item.id)
    );

    // If the rect has lines to it, make it clickable
    if (hasLinesToIt) {
      rect.addEventListener("click", function () {
        if (item.name === "Field") {
          document.querySelector(".pathSelect").style.display = "none";
          document.querySelector("#field").style.display = "block";
          map.remove();
        } else {
          // Do something else when 'forest' is clicked
          overlay = document.createElement("div");
          overlay.classList.add("overlayClass");
          document.querySelector(".pathSelect").appendChild(overlay);
          spanOverlay = document.createElement("span");
          spanOverlay.classList.add("spanOverlay");
          spanOverlay.innerHTML = "<span> Sorry this area isn't real</span>";
          overlay.appendChild(spanOverlay);
          setTimeout(() => {
            overlay.remove();
          }, 1000);
        }
      });
    }
  });

  // Draw the lines based on the mapConnections
  mapConnections.forEach((connection) => {
    const fromBox = mapData.find((box) => box.id === connection.from);

    connection.to.forEach((toId) => {
      const toBox = mapData.find((box) => box.id === toId);

      // Create the line element
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fromBox.x + 25);
      line.setAttribute("y1", fromBox.y + 25);
      line.setAttribute("x2", toBox.x + 25);
      line.setAttribute("y2", toBox.y + 25);
      line.style.stroke = "white";
      line.style.strokeWidth = "2";
      map.insertBefore(line, map.firstChild);
    });
  });
}

function map3() {
  const map = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  path.appendChild(map);
  level = 3;
  const mapConnections = [
    // 3rd
    { from: 4, to: [8] },
    { from: 5, to: [8, 9] },
    { from: 6, to: [9] },
    { from: 7, to: [9] },
  ];
  // Draw the boxes and text labels
  mapData.forEach((item) => {
    if (item.id === 4) {
      item.name = "Field";
    }
    if (item.id === 8) {
      item.name = "Vally";
    }
    // Create the rect element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", item.x);
    rect.setAttribute("y", item.y);
    map.appendChild(rect);

    // Create the text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", item.x + 50); // center of the box
    text.setAttribute("y", item.y + 55); // slightly below the center
    text.setAttribute("text-anchor", "middle"); // center the text
    text.textContent = item.name;

    map.appendChild(text);
    // Check if the rect has any lines to it
    const hasLinesToIt = mapConnections.some((connection) =>
      connection.to.includes(item.id)
    );
    // If the rect has lines to it, make it clickable
    if (hasLinesToIt) {
      rect.addEventListener("click", function () {
        if (item.name === "Vally") {
          document.querySelector(".pathSelect").style.display = "none";
          document.querySelector("#vally").style.display = "block";
          map.remove();
        } else {
          // Do something else when 'forest' is clicked
          overlay = document.createElement("div");
          overlay.classList.add("overlayClass");
          document.querySelector(".pathSelect").appendChild(overlay);
          spanOverlay = document.createElement("span");
          spanOverlay.classList.add("spanOverlay");
          spanOverlay.innerHTML = "<span> Sorry this area isn't real</span>";
          overlay.appendChild(spanOverlay);
          setTimeout(() => {
            overlay.remove();
          }, 1000);
        }
      });
    }
  });

  // Draw the lines based on the mapConnections
  mapConnections.forEach((connection) => {
    const fromBox = mapData.find((box) => box.id === connection.from);

    connection.to.forEach((toId) => {
      const toBox = mapData.find((box) => box.id === toId);

      // Create the line element
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fromBox.x + 25);
      line.setAttribute("y1", fromBox.y + 25);
      line.setAttribute("x2", toBox.x + 25);
      line.setAttribute("y2", toBox.y + 25);
      line.style.stroke = "white";
      line.style.strokeWidth = "2";
      map.insertBefore(line, map.firstChild);
    });
  });
}

function map4() {
  const map = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  path.appendChild(map);
  level = 3;
  const mapConnections = [
    // 4th
    { from: 8, to: [10] },
    { from: 9, to: [10] },
  ];
  // Draw the boxes and text labels
  mapData.forEach((item) => {
    if (item.id === 4) {
      item.name = "Field";
    }
    if (item.id === 8) {
      item.name = "Vally";
    }
    if (item.id === 10) {
      item.name = "Castle";
    }
    // Create the rect element
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", item.x);
    rect.setAttribute("y", item.y);
    map.appendChild(rect);

    // Create the text element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", item.x + 50); // center of the box
    text.setAttribute("y", item.y + 55); // slightly below the center
    text.setAttribute("text-anchor", "middle"); // center the text
    text.textContent = item.name;

    map.appendChild(text);
    // Check if the rect has any lines to it
    const hasLinesToIt = mapConnections.some((connection) =>
      connection.to.includes(item.id)
    );

    // If the rect has lines to it, make it clickable
    if (hasLinesToIt) {
      rect.addEventListener("click", function () {
        if (item.name === "Castle") {
          document.querySelector(".pathSelect").style.display = "none";
          document.querySelector("#castle").style.display = "block";
          map.remove();
        }
      });
    }
  });
  // Draw the lines based on the mapConnections
  mapConnections.forEach((connection) => {
    const fromBox = mapData.find((box) => box.id === connection.from);

    connection.to.forEach((toId) => {
      const toBox = mapData.find((box) => box.id === toId);

      // Create the line element
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fromBox.x + 25);
      line.setAttribute("y1", fromBox.y + 25);
      line.setAttribute("x2", toBox.x + 25);
      line.setAttribute("y2", toBox.y + 25);
      line.style.stroke = "white";
      line.style.strokeWidth = "2";
      map.insertBefore(line, map.firstChild);
    });
  });
}

const swampImg = document.querySelector("#swampImg");
swampImg.addEventListener("animationend", () => {
  swampImg.style.display = "none";
  document.querySelector("#swampText").style.display = "block";
});

document.querySelector("#swampContinue").addEventListener("click", () => {
  overlay = document.createElement("div");
  overlay.classList.add("overlayClass");
  document.querySelector(".fight").appendChild(overlay);
  spanOverlay = document.createElement("span");
  spanOverlay.classList.add("spanOverlay");
  spanOverlay.innerHTML =
    "<span> Something comes running at you after because of Amanda</span>";
  overlay.appendChild(spanOverlay);
  overlay.remove();
  combat();
  document.querySelector(".fight").style.display = "grid";
  document.querySelector("#swamp").style.display = "none";
});

document.querySelector("#afterFight2Continue").addEventListener("click", () => {
  document.querySelector(".afterFight2").style.display = "none";
  map2();
  document.querySelector(".pathSelect").style.display = "block";
});

const fieldImg = document.querySelector("#fieldImg");
fieldImg.addEventListener("animationend", () => {
  fieldImg.style.display = "none";
  document.querySelector("#fieldText").style.display = "block";
});

document.querySelector("#fieldContinue").addEventListener("click", () => {
  document.querySelector("#field").style.display = "none";
  combat();
  document.querySelector(".fight").style.display = "grid";
});

document.querySelector("#afterFight3Continue").addEventListener("click", () => {
  document.querySelector(".afterFight3").style.display = "none";
  map3();
  document.querySelector(".pathSelect").style.display = "block";
});

const vallyImg = document.querySelector("#vallyImg");
vallyImg.addEventListener("animationend", () => {
  vallyImg.style.display = "none";
  document.querySelector("#vallyText").style.display = "block";
});

document.querySelector("#vallyContinue").addEventListener("click", () => {
  document.querySelector("#vally").style.display = "none";
  combat();
  document.querySelector(".fight").style.display = "grid";
});

document.querySelector("#afterFight4Continue").addEventListener("click", () => {
  document.querySelector(".afterFight4").style.display = "none";
  map4();
  document.querySelector(".pathSelect").style.display = "block";
});

const castleImg = document.querySelector("#castleImg");
castleImg.addEventListener("animationend", () => {
  castleImg.style.display = "none";
  document.querySelector("#castleText").style.display = "block";
});

document.querySelector("#castleContinue").addEventListener("click", () => {
  document.querySelector("#castle").style.display = "none";
  finalBattle();
  document.querySelector(".fight").style.display = "grid";
});

function finalBattle() {
  finalFight = true;
  theme.pause();
  final.play();
  // enemy looks
  const enemyImage = document.querySelector("#enemy");
  // enemy name
  const enemyName = document.querySelector("#enemyName");
  // enemy health
  const enemyHealth = document.querySelector("#enemyHealth");

  fetch("./json/enemies.json")
    .then((response) => response.json())
    .then((monster) => {
      enemyImage.src = monster.EndBoss[0].img;
      enemyHealth.innerHTML = monster.EndBoss[0].hp;
      enemyName.innerHTML = monster.EndBoss[0].name + "'s " + "health:";
      monsterAttack = monster.EndBoss[0].attack;
    });
  // player hp for lvl 3
  health = 200;
  // player
  fetch("./json/abilities.json")
    .then((response) => response.json())
    .then((player) => {
      player[classChoice][0].levelThree.forEach((item) => {
        spellList.push(item);
      });
    });
  remainingHealth = health;
  playerHealth.innerHTML = remainingHealth;
}

function amandaHelp() {
  if (attackCount != 0) {
    special = 1;
    document.querySelector("#attack").remove();
    document.querySelector("#flee").remove();
    document.querySelector("#player").src = "./images/amanda.png";
    document.querySelector("#playerHealth").innerHTML = "?????";
  }
}

document.querySelector("#finalGoodbye").addEventListener("click", () => {
  document.querySelector(".ending").style.display = "none";
  document.querySelector(".thankYou").style.display = "block";
});
