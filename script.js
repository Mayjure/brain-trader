/* ======================== */
/* Initialize Logs */
/* ======================== */
let logs = []; // Store all session events

/* ======================== */
/* Grab HTML Elements */
/* ======================== */
const legBtn = document.getElementById('legBtn'); // LEG button
const retracementBtn = document.getElementById('retracementBtn'); // 50% retrace button
const goBtn = document.getElementById('goBtn'); // GO button
const logsDiv = document.getElementById('logs'); // Logs div

/* ======================== */
/* Log Function */
/* ======================== */
function logEvent(event) {
    const timestamp = new Date().toLocaleTimeString(); // Current time
    logs.push(`${timestamp} → ${event}`); // Save to array
    logsDiv.innerHTML = logs.join('<br>'); // Update HTML
}

/* ======================== */
/* Button Event Listeners */
/* ======================== */
legBtn.addEventListener('click', () => logEvent('LEG triggered'));
retracementBtn.addEventListener('click', () => logEvent('50% retrace triggered'));
goBtn.addEventListener('click', () => logEvent('GO signal triggered'));

/* ======================== */
/* NASDAQ Chart Setup */
/* ======================== */
const chartContainer = document.getElementById('chart'); // Chart container

// Create chart
const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: 400,
    layout: {
        backgroundColor: '#1b1b1b', // Chart background
        textColor: '#ffffff', // Text color
    },
    grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
    },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { borderColor: '#555' },
    timeScale: { borderColor: '#555' },
});

// Add line series
const lineSeries = chart.addLineSeries({
    color: '#ff9800', // Line color
    lineWidth: 2, // Line thickness
});

/* ======================== */
/* Fetch Free NASDAQ Data */
/* ======================== */
fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line&apikey=demo')
    .then(response => response.json())
    .then(data => {
        const formattedData = data.historical.reverse().map(item => ({
            time: new Date(item.date).getTime() / 1000, // UNIX timestamp
            value: item.close // Closing price
        }));
        lineSeries.setData(formattedData); // Load into chart
    })
    .catch(err => logEvent('Error loading chart: ' + err));

/* ======================== */
/* Responsive Chart on Resize */
/* ======================== */
window.addEventListener('resize', () => {
    chart.applyOptions({ width: chartContainer.clientWidth });
});

/* ======================== */
/* Ready for Auto Leg Detection */
/* ======================== */
// Later: scan chart data → detect legs, 50% retraces, mark GO signals
