const qty = document.getElementById("input-qty");
const entry = document.getElementById("input-entry");
const margin = document.getElementById("result-margin");
const close = document.getElementById("input-close");

let inputtedQty = 0;
let inputtedEntry = 0;
let inputtedClose = 0;
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