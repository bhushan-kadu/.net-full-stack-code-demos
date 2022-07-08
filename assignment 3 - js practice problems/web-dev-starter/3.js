//Write a JavaScript program to check two given numbersInput 
//and return true if one of the number is 50 or if their sum is 50.  
function checkIfSumOrNumberIs50DriverFunction() {
    let numbersInput = prompt("Enter two numbers seperated by a space");

    if (numbersInput != null) {
        numbersInput = numbersInput.trim();
        numbersInput = numbersInput.split(" ");

        let num1 = parseFloat(numbersInput[0]);
        let num2 = parseFloat(numbersInput[1]);

        if (num1 === 50 || (num1 + num2) === +(50).toFixed(0)) {
            alert("true");
        }
    }
}

checkIfSumOrNumberIs50DriverFunction();