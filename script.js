const qty = document.getElementById("input-qty");
const entry = document.getElementById("input-entry");
const margin = document.getElementById("result-margin");

let inputtedQty = 0;
let inputtedEntry = 0;
let initialMargin = 0;

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

function showMargin() {
    margin.textContent = initialMargin;
}