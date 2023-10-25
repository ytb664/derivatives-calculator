const qty = document.getElementById("input-qty");
const entry = document.getElementById("input-entry");
const margin = document.getElementById("result-margin");

const closePrice = document.getElementById("input-close");
const pnl = document.getElementById("result-pnl");
const pnlPercentage = document.getElementById("result-pnl-percentage");

let inputtedQty = 0;
let inputtedEntry = 0;
let inputtedClose = 0;

let initialMargin = 0;
let profitAndLoss = 0;

let baseMargin = 0;
let closeMargin = 0;

qty.onkeyup = function() {
    inputtedQty = qty.value;
    initialMargin = inputtedQty * inputtedEntry;
    showMargin();
}

entry.onkeyup = function() {
    inputtedEntry = entry.value;
    initialMargin = inputtedQty * inputtedEntry;
    showMargin();
}

closePrice.onkeyup = function() {
    inputtedClose = closePrice.value;

    showPnl();
    showPnlPercentage();
}

function showMargin() {
    margin.textContent = initialMargin.toFixed(4);
}

function showPnl() {
    baseMargin = inputtedQty * inputtedEntry;
    closeMargin = inputtedQty * inputtedClose;
    
    if (inputtedClose == 0) {
        profitAndLoss = 0;
    } else {
        profitAndLoss = closeMargin - baseMargin;
    }

    pnl.textContent = profitAndLoss.toFixed(4);
}

function showPnlPercentage() {
    let tempResult = (profitAndLoss / initialMargin) * 100;
    pnlPercentage.textContent = tempResult.toFixed(2);
}