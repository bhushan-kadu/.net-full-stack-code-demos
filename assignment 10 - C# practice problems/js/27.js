//Write a JavaScript function to convert a decimal number to binary, hexadecimal or octal number. 
function decimalToBinaryHexaDecimalAndOctal(numberParam) {

    let numTemp = numberParam;
    let binaryAns = "";
    while (numTemp > 0) {
        binaryAns += (numTemp % 2);

        numTemp = parseInt(numTemp / 2);
    }

    binaryAns = binaryAns.split("");
    binaryAns = binaryAns.reverse();

    console.log("Binary equivalant is: " + binaryAns.join(""))

    numTemp = numberParam;
    let octalAns = "";
    while (numTemp > 0) {
        octalAns += (numTemp % 8);

        numTemp = parseInt(numTemp / 8);
    }

    octalAns = octalAns.split("");
    octalAns = octalAns.reverse();

    console.log("Octal equivalant is: " + octalAns.join(""))

    numTemp = numberParam;
    let hexaAns = "";
    while (numTemp > 0) {
        let temp = (numTemp % 16);
        switch (temp) {
            case 10:
                hexaAns += "A";
                break;
            case 11:
                hexaAns += "B";
                break;
            case 12:
                hexaAns += "C";
                break;
            case 13:
                hexaAns += "D";
                break;
            case 14:
                hexaAns += "E";
                break;
            case 15:
                hexaAns += "F";
                break;
            default:
                hexaAns += temp;
                break;
        }

        numTemp = parseInt(numTemp / 16);
    }

    hexaAns = hexaAns.split("");
    hexaAns = hexaAns.reverse();

    console.log("Hexadecimal equivalant is: " + hexaAns.join(""))
}


function decimalToBinaryHexaDecimalAndOctalDriverFunction() {
    let numberInput = prompt("Enter a decimal Number");

    decimalToBinaryHexaDecimalAndOctal(numberInput);
}

decimalToBinaryHexaDecimalAndOctalDriverFunction();