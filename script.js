const long = document.getElementById("long");
const short = document.getElementById("short");

const input = document.querySelectorAll('input');
let inputArray = [...input];
const leverage = document.getElementById("input-leverage");

const qty = document.getElementById("input-qty");
const entry = document.getElementById("input-entry");
const margin = document.getElementById("result-margin");

const closePrice = document.getElementById("input-close");
const pnl = document.getElementById("result-pnl");
const pnlPercentage = document.getElementById("result-pnl-percentage");
const roi = document.getElementById("result-roi");

let inputtedQty = 0;
let inputtedEntry = 0;
let inputtedClose = 0;

let initialMargin = 0;
let profitAndLoss = 0;

let baseMargin = 0;
let closeMargin = 0;

long.classList.add('long');

long.addEventListener('click', () => {
    if (!long.classList.contains('long') && short.classList.contains('short')) {
        long.classList.toggle('long');
        short.classList.toggle('short');

        inputArray.forEach(e => {
            e.classList.toggle('short-input');
        });
    }

    showResult();
});

short.addEventListener('click', () => {
    if (!short.classList.contains('short') && long.classList.contains('long')) {
        short.classList.toggle('short');
        long.classList.toggle('long');

        inputArray.forEach(e => {
            e.classList.toggle('short-input');
        });
    }

    showResult();
})

leverage.onkeyup = function() {
    if (leverage.value <= 0) {
        initialMargin = baseMargin;
    } else {
        initialMargin /= leverage.value;
    }

    showResult();
}

qty.onkeyup = function() {
    inputtedQty = qty.value;
    initialMargin = inputtedQty * inputtedEntry;

    showResult();
}

entry.onkeyup = function() {
    inputtedEntry = entry.value;
    initialMargin = inputtedQty * inputtedEntry;

    showResult();
}

closePrice.onkeyup = function() {
    inputtedClose = closePrice.value;

    showResult();
}

function showResult() {
    showMargin();
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
    } else if (short.classList.contains('short')) {
        profitAndLoss = baseMargin - closeMargin;
    } else {
        profitAndLoss = closeMargin - baseMargin;
    }

    pnl.textContent = profitAndLoss.toFixed(4);
}

function showPnlPercentage() {
    let tempPnl = (profitAndLoss / baseMargin) * 100;
    let tempRoi = (profitAndLoss / initialMargin) * 100;

    pnlPercentage.textContent = tempPnl.toFixed(2);
    roi.textContent = tempRoi.toFixed(2);
}