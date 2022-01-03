//Write a JavaScript program to check whether 
//a given positive number is a multiple of 3 or a multiple of 7.  
function checkMultipleOf3or7DriverFunction() {
    let numbersInput = prompt("Enter a positive number");

    if (numbersInput != null) {
        numbersInput = numbersInput.trim();
        numbersInput = numbersInput.split(" ");

        let num1 = parseFloat(numbersInput[0]);

        if (num1 % 3 === 0) {
            alert("multiple of 3");
        } else if (num1 % 7 === 0) {
            alert("multiple of 7");
        } else {
            alert("not a multiple of 3 or 7");
        }
    }
}

checkMultipleOf3or7DriverFunction()