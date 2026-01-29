/*
script.js
=========
Controls Brain Unlock logic and button sequence
*/

const leg = document.getElementById("leg");
const mid = document.getElementById("mid");
const go = document.getElementById("go");
const status = document.getElementById("status");

// Reset all nodes
function reset() {
  leg.classList.remove("active");
  mid.classList.remove("active");
  go.classList.remove("active");
}

// Mark leg node
function markLeg() {
  reset();
  leg.classList.add("active");
  status.innerText = "Leg formed. Wait for 50%.";
}

// Mark mid node (50% retrace)
function markMid() {
  if (!leg.classList.contains("active")) {
    status.innerText = "No leg yet. Press 'Mark Leg' first.";
    return;
  }
  mid.classList.add("active");
  status.innerText = "50% reached. Stay patient.";
}

// Mark continuation
function markGo() {
  if (!mid.classList.contains("active")) {
    status.innerText = "Patience. 50% not hit yet.";
    return;
  }
  go.classList.add("active");
  status.innerText = "Continuation confirmed.";
}
