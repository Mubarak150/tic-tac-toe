// ------------------------------------------------------------- accessing all the dom elements
let body = document.querySelector("body");
let header = document.querySelector(".header");
let darkBtn = document.querySelector("#dark");
let copyrights = document.querySelector(".rights-text");
let portfolioLink = document.querySelector(".portfolioLink");
let boxes = document.querySelectorAll(".box"); // -------------- all the input buttons/boxes
let resetBtn = document.querySelector("#reset-button"); // ----- reset/newgame button
let turnTag = document.querySelector(".turn"); // -------------- text showing whose turn is it or who won?

let modeImage = document.querySelector("#dark-img");
let moon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAfxJREFUSEvFlbFr1FAcx7/ftHhDB0FMLtzLU1wUFHTSQRRcSotYHBxEXHQUwUlt8R8QPNxcXAqddHIRS5cOgtRJkKrdziHJK0kqXaSDkMtPI/a8C3e568Xi25L8ft/P++X33u9L7PPiPuujFBBFkTORpjeFnHGUmh1nMwMBSRDcE7JJ4ACAJcfzbv0TQBRFU1aavgAwtytI8oat1MvKABGxtoxZATDdLUaRS7bWbysDkiBYAPm4KCQi1+pav6oE2G61Dqa1mgEwVRSiSNPW+mElQGLMXYg8GyAS2EodJSl7hXROURKGrwFcGShAXnSUelcFEAJQJQKfWaudt237+14gvysQEW4ZkwKwypIJrLYnJ6+6rrszKqTzi+Iw/PHnUg3LbdGyrtuNxodhgfn3vz0Igq8gj42SBKAt5COn0Wj2a/y2MUcOKeX3AsJwEcDtEQG7YXk/1gX4AmCHwHEA50AuOkot9ABi35+hZeW3uPLKRE67Wn/qAeQPSRh+BHCmCkFENupan+rMsW6xb75/NrOs9wAmxoRIBky7nrfaF5C/jI25n4+GcQBCzteVetKd29cPYmMeUCQfeqNW0iYwb3ve0+LGBhuOMRcky56TPDmkmnUh79SVWusXV2qZuT/Em5tzFLlM4ESh9I1fR3L5sFJvyobg/zX9cRpdzPkJldKlGcsHnd4AAAAASUVORK5CYII=";
let sun =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgdJREFUSEvFVb9rFEEU/mayd41l0EqwUCwjezO7h2LhKSh2KQL+ASKKjYWiGBUUFBW0kyAk6dMJqcSgYhO5nZ09k9IfldooWlpchn0yx52sye7MrSQ43TDvvW++N+/7hmGHF9vh+qgFEAlB9kJK67Hzxg60hbcNIBLiFpuYmEuS5EexhVUAcRxPIs8vJGl6b3PLtzCIpbxBRHcBfAiM6bxdW/vqeqd2u72XjHlNwAEA15XWD4rxWwDCMNwXcP4SwH4AV5TWj10AsZRXieghAz4S58eVUp+dAPbwyNTUHtNsnhtRllLOgOgiAzrD5FeM6EmSZc/sXrZas01jFlbX1795W7Q5IBLiEYDLZSwYY3eSNL3tYuicoqjVOgPGllwFOHCqq/WLqhg3gBDvABzyiHFFaX3SCzAawaKQIiE2AAQegJ9K68miToo1/jCoAOgDaHgAfimtd3kByopEUq6C6LATgOiNyrJj3haVBcRCTBMwGMXKRXRaZdnzfwIY0naN6c0yexhLaBuNxlml9f2BkKSc4USXCDg6SCZaJs4X0zRdtltrL0G/Pz+W0GpbhRDXCLD+8wmcd7xWYWXPGLOu+J4HwYlut/vF9QTW7HJjrHcdBDA7Yj3KKRWatWuT5097vd73YvEquw7DcHfA+XmltXXhv9b/+XCqWrJtP5pHubWOa7WoVuVh8G9pjNkZwr8A9gAAAABJRU5ErkJggg==";

let turnOfO = true; // ------------------------------------------ O will play first. then X...
let won = false; // --------------------------------------------- is there a winner ?
let dark = false;

// ------------------------------------------------------------- possible WINNING PATTERNS [8]
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // ------------------------------------------------- row win

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // ------------------------------------------------- column win

  [0, 4, 8],
  [2, 4, 6], // ------------------------------------------------- diagonal win
];

// --------------------------------------------------------------- if one wins.
// --------------------------------------------------------------- then announce the winner, highlight the win pattern, disable all the boxes to avoid further entries, and change reset to newgame.
const handleWin = (pattern, player) => {
  turnTag.innerText = `${player} won!!!`;
  won = true;

  pattern.forEach((position) => {
    boxes[position].style.backgroundColor = "#b0413e";
    boxes[position].style.color = "#ffffc7";
  });

  boxes.forEach((box) => {
    box.disabled = true;
  });

  resetBtn.innerText = "Play New Game";
};

// ---------------------------------------------------------------- check if there is a winner.
const checkWinner = () => {
  // -------------------------------------------------------------- look in all the winPatternsf any one satisfies?
  for (let pattern of winPatterns) {
    let position1 = boxes[pattern[0]];
    let position1Value = position1.innerText;
    let position2 = boxes[pattern[1]];
    let position2Value = position2.innerText;
    let position3 = boxes[pattern[2]];
    let position3Value = position3.innerText;
    //-------------------------------------------------------------- if satisfies...
    if (position1Value != "" && position2Value != "" && position3Value != "") {
      if (
        position1Value === position2Value &&
        position2Value === position3Value
      ) {
        handleWin(pattern, position1Value);
      }
    }
  }
};

// ---------------------------------------------------------------- when a user clicks on one of .game > .boxes
const handleEntry = (target) => {
  target.innerText = turnOfO ? "O" : "X";
  turnOfO = !turnOfO;
  turnTag.innerText = `${turnOfO ? "O" : "X"}'s turn now`; // -------- enter cross or O in the box and change the turn

  target.disabled = true; //---------------------------------------- and disable the button to avoid re-click

  checkWinner(); //------------------------------------------------- then check if a pattern is matched.
};

// ------------------------------------------------------------------ boxes event handler... main part of the game....
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    handleEntry(e.target);
  });
});

// ---------------------------------------------------------------- reset or renew game button handler. i.e. resume the origianl state.
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "#b0413e";
    box.style.backgroundColor = "#ffffc7";
  });

  turnOfO = true;
  turnTag.innerText = `O's turn now`;
  resetBtn.innerText = "Reset Game";
});

// ---------------------------------------------------------------- DARK MODE .. must there be an EASY way to do it ??
darkBtn.addEventListener("click", () => {
  if (!dark) {
    dark = true;
    modeImage.src = sun;
    darkBtn.style.backgroundColor = "#ffffc7";
    body.style.backgroundColor = "#191913";
    header.style.color = "#ffffc7";
    resetBtn.style.backgroundColor = "#b0413e";
    copyrights.style.color = "#ffffc7";
    portfolioLink.style.color = "#ffffc7";
  } else {
    dark = false;
    modeImage.src = moon;
    body.style.backgroundColor = "#ffffc7";
    darkBtn.style.backgroundColor = "#191913";
    header.style.color = "#191913";
    resetBtn.style.backgroundColor = "#191913";

    copyrights.style.color = "#191913";
    portfolioLink.style.color = "#191913";
  }
});

/*
MUHAMMAD MUBARAK AZAD ADVOCATE
Room 289, Hostel 1, University of Peshawar, Pakistan. 
Dated: March 10th, 2025 0508 AM [PST]
*/
