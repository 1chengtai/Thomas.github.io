document.addEventListener("DOMContentLoaded", function() {
    var welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.style.display = 'block';//歡迎
});
function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    var displayValue = document.getElementById("display").value;
    var result = eval(displayValue);
    document.getElementById("display").value = result;
}
function toggleCalculator() { //計算機的隱藏
    var calculator = document.querySelector('.calculator');
    if (calculator.style.display === "none") {
        calculator.style.display = "block";
    } 
    else {calculator.style.display = "none";
    }
}
