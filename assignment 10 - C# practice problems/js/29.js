//Write a JavaScript function to convert a positive number to negative number. 
function positiveToNegaive(numberParam) {
    return -numberParam;
}

function positiveToNegaiveDriverFunction() {
    let numberInput = prompt("Enter a positive Number");
    alert("The negative is " + positiveToNegaive(parseFloat(numberInput)));
}

positiveToNegaiveDriverFunction()