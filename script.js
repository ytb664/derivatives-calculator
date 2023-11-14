const long = document.getElementById("long");
const short = document.getElementById("short");

const input = document.querySelectorAll('input');
let inputArray = [...input];
const leverage = document.getElementById("input-leverage");

const qty = document.getElementById("input-qty");
const entry = document.getElementById("input-entry");
const margin = document.getElementById("result-margin");

const closePrice = document.getElementById("input-close");
const resultNumber = document.querySelectorAll(".result .number")
const pnl = document.getElementById("result-pnl");
const pnlPercentage = document.getElementById("result-pnl-percentage");
const roi = document.getElementById("result-roi");

const entryFeeInput = document.getElementById("input-entry-fee");
const closeFeeInput = document.getElementById("input-close-fee");

let inputtedQty = 0;
let inputtedEntry = 0;
let inputtedClose = 0;

let initialMargin = 0;
let profitAndLoss = 0;

let baseMargin = 0;
let closeMargin = 0;

let entryFee = 0;
let closeFee = 0;

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

entryFeeInput.onkeyup = function() {
    entryFee = entryFeeInput.value;

    entryFee *= baseMargin;
    let tempProfitNLoss = profitAndLoss - entryFee;

    pnl.textContent = tempProfitNLoss.toFixed(2);
}

closeFeeInput.onkeyup = function() {
    closeFee = closeFeeInput.value;

    closeFee *= closeMargin;
    let tempProfitNLoss = profitAndLoss - closeFee;

    pnl.textContent = tempProfitNLoss.toFixed(2);
}

function showResult() {
    showMargin();
    showPnl();
    showPnlPercentage();
}

function showMargin() {
    if (leverage.value > 0) {
        margin.textContent = (initialMargin / leverage.value).toFixed(2);
    } else {
        margin.textContent = initialMargin.toFixed(2);
    }
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

    if (profitAndLoss > 0) {
        resultNumber.forEach((el) => {
            el.classList.add("profit");
            el.classList.remove("loss");
        });
    } else if (profitAndLoss < 0) {
        resultNumber.forEach((el) => {
            el.classList.remove("profit");
            el.classList.add("loss");
        });
    } else {
        resultNumber.forEach((el) => {
            el.classList.remove("profit");
            el.classList.remove("loss");
        });
    }

    pnl.textContent = profitAndLoss.toFixed(2);
}

function showPnlPercentage() {
    let tempPnl = (profitAndLoss / baseMargin) * 100;
    let tempRoi = (profitAndLoss / initialMargin) * 100;

    if (tempPnl !== isNaN) {
        pnlPercentage.textContent = tempPnl.toFixed(2);
    }

    if (tempRoi !== isNaN) {
        roi.textContent = tempRoi.toFixed(2);
    }
}