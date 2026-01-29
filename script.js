/*
script.js
---------
This file controls HOW the system behaves.
Rules matter.
Order matters.
This trains discipline and patience.
*/

// Get references to visual brain nodes
const legNode = document.getElementById("legNode");
const midNode = document.getElementById("midNode");
const contNode = document.getElementById("contNode");

// Get reference to message area
const log = document.getElementById("log");

/*
Reset function:
Turns off all brain lights.
Used when a new leg starts.
*/
function reset() {
  legNode.classList.remove("active");
  midNode.classList.remove("active");
  contNode.classList.remove("active");
}

/*
Called when YOU identify a market leg.
This must be done FIRST.
*/
function markLeg() {
  reset();
  legNode.classList.add("active");
  log.innerText = "Leg detected. Wait for 50% retrace.";
}

/*
Called ONLY after a leg exists.
Represents patience and discipline.
*/
function markMid() {
  if (!legNode.classList.contains("active")) {
    log.innerText = "Find a leg first.";
    return;
  }

  midNode.classList.add("active");
  log.innerText = "50% reached. Stay patient.";
}

/*
Called ONLY after 50% retrace.
Confirms continuation.
*/
function markContinue() {
  if (!midNode.classList.contains("active")) {
    log.innerText = "Wait for the 50% first.";
    return;
  }

  contNode.classList.add("active");
  log.innerText = "Continuation confirmed. Brain trained.";
}
