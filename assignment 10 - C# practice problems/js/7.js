//Write a JavaScript program to check whether the last digit of the three given 
//positive integers is same.
function checkLastThreeDigitSameOrNotDriverFuntion() {
    let numbersInput = prompt("Enter three Positive Integers seperated by a space");

    if (numbersInput != null) {
        numbersInput = numbersInput.trim();
        numbersInput = numbersInput.split(" ");

        let num1 = parseInt(numbersInput[0]);
        let num2 = parseInt(numbersInput[1]);
        let num3 = parseInt(numbersInput[2]);

        if (num1 % 10 === num2 % 10 && num1 % 10 === num3 % 10) {

            alert("last digit " + num1 % 10 + " is Same");

        } else {
            alert("last digit not same");
        }
    }
}

checkLastThreeDigitSameOrNotDriverFuntion();