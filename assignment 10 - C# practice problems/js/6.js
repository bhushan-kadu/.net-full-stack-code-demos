//Write a JavaScript program to find the largest of three given integers. 
function largestOfThreeDriverFunction() {
    let numbers = prompt("Enter three Integers seperated by a space");

    if (numbers != null) {
        numbers = numbers.trim();
        numbers = numbers.split(" ");

        let num1 = parseFloat(numbers[0]);
        let num2 = parseFloat(numbers[1]);
        let num3 = parseFloat(numbers[2]);

        // if (num1 > num2) {
        //     if (num1 > num3) {
        //         alert(num1 + " is greater");
        //     } else {
        //         alert(num3 + " is greater");
        //     }
        // } else if (num2 > num3) {
        //     alert(num2 + " is greater");
        // } else {
        //     alert(num3 + " is greater");
        // }

        alert(Math.max(num1, num2, num3) + " is greater");
    }
}
largestOfThreeDriverFunction()