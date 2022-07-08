//Write a JavaScript program to convert a given seconds to hours and minutes. 
function secondToHourAndMinute() {
    let numbersInput = prompt("Enter seconds");

    if (numbersInput != null) {
        numbersInput = numbersInput.trim();
        let num1 = parseFloat(numbersInput);
        num1 /= 60;
        alert(parseInt(num1 / 60) + " Hour/s " + parseInt(num1 % 60) + " Minute/s");
    }
}
secondToHourAndMinute()