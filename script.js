/* ======================== */
/* Global Variables */
/* ======================== */

let legStart = null;
let legEnd = null;
let fiftyLevel = null;

/* ======================== */
/* Brain Unlock Animation */
/* ======================== */

function unlockBrain() {
    document.querySelectorAll("#brain span").forEach((p, i) => {
        setTimeout(() => {
            p.style.background = "#00ffcc";
            p.style.color = "#000";
        }, i * 400);
    });
}

/* ======================== */
/* Leg Marking */
/* ======================== */

function setLegStart() {
    legStart = parseFloat(prompt("Enter Leg Start Price"));
    resetLights();
}

function setLegEnd() {
    legEnd = parseFloat(prompt("Enter Leg End Price"));

    if (legStart !== null && legEnd !== null) {
        fiftyLevel = (legStart + legEnd) / 2;

        document.getElementById("output").innerHTML =
            `Leg Start: ${legStart}<br>
             Leg End: ${legEnd}<br>
             50% Level: ${fiftyLevel.toFixed(2)}`;

        activateRed();
    }
}

/* ======================== */
/* Retracement Logic */
/* ======================== */

function checkRetracement() {
    const price = parseFloat(document.getElementById("currentPrice").value);
    if (!price || !fiftyLevel) return;

    const bias = document.querySelector('input[name="bias"]:checked').value;
    const tolerance = Math.abs(legEnd - legStart) * 0.05;

    resetLights();

    if (bias === "bull") {
        if (price > legEnd) {
            activateRed(); // too high
        } else if (price > fiftyLevel + tolerance) {
            activateYellow(); // pulling back
        } else if (price <= fiftyLevel + tolerance) {
            activateGreen(); // value zone
        }
    }

    if (bias === "bear") {
        if (price < legEnd) {
            activateRed(); // too low
        } else if (price < fiftyLevel - tolerance) {
            activateYellow(); // pulling back
        } else if (price >= fiftyLevel - tolerance) {
            activateGreen(); // value zone
        }
    }
}


/* ======================== */
/* Signal Light Controls */
/* ======================== */

function resetLights() {
    document.querySelectorAll(".light").forEach(l => l.style.opacity = 0.2);
}

function activateRed() {
    document.getElementById("red").style.opacity = 1;
}

function activateYellow() {
    document.getElementById("yellow").style.opacity = 1;
}

function activateGreen() {
    document.getElementById("green").style.opacity = 1;
}

/* ======================== */
/* TradingView Chart */
/* ======================== */

window.onload = function () {
    new TradingView.widget({
        "width": "100%",
        "height": 500,
        "symbol": "NASDAQ:NDX",
        "interval": "15",
        "theme": "dark",
        "container_id": "tradingview_chart"
    });
};

