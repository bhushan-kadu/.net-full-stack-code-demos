//Write a JavaScript program to capitalize the first letter of each word of a given string
function capitalizeEachWordDriverFunction() {
    let stringInput = prompt("Enter a string");

    if (stringInput != null) {
        stringInput = stringInput.split(" ");
        let result = "";
        let word = "";

        stringInput.forEach(element => {
            word = element.replace(element.charAt(0), element.charAt(0).toUpperCase());
            result += ` ${word}`;
        });

        alert(result);
    }
}

capitalizeEachWordDriverFunction()