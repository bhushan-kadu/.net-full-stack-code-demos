//Write a JavaScript function to convert a binary number to a decimal number.
function binaryToDecimal(numberParam) {

    let decimal = 0;
    let power = 0;
    while (numberParam > 0) {
        decimal += ((numberParam % 10) * Math.pow(2, power));
        numberParam = parseInt(numberParam / 10);
        ++power;
    }

    return decimal;
}

function binaryToDecimalDriverFunction() {
    let numberInput = prompt("Enter a binary Number");

    alert("The decimal equivalant is " + binaryToDecimal(numberInput));
}

binaryToDecimalDriverFunction();