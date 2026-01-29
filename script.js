/* ======================== */
/* Brain Unlock Function */
/* ======================== */

function unlockBrain() {
    const phases = document.querySelectorAll("#brain span");

    phases.forEach((phase, index) => {
        setTimeout(() => {
            phase.style.background = "#00ffcc";
            phase.style.color = "#000";
        }, index * 500);
    });
}

/* ======================== */
/* Load TradingView NASDAQ */
/* ======================== */

new TradingView.widget({
    "width": "100%",
    "height": 500,
    "symbol": "NASDAQ:NDX",
    "interval": "15",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "container_id": "tradingview_chart"
});
