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

    const distance = Math.abs(price - fiftyLevel);

    resetLights();

    if (distance > 10) {
        activateRed();
    } else if (distance > 2) {
        activateYellow();
    } else {
        activateGreen();
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
