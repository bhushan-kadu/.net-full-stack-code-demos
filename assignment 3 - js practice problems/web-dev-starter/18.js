//Write a JavaScript function to get the number of days in a monthInput. 

function numberOfDaysInAMontnDriverFunction() {
    function numberOfDaysInAMonth(monthInput, year) {
        let dateInput = new Date(year, monthInput, 0);
        return dateInput.getDate();
    }

    let yearInput = prompt("Enter year");
    let monthInput = prompt("Enter month");

    alert(numberOfDaysInAMonth(monthInput, yearInput));
}

numberOfDaysInAMontnDriverFunction();