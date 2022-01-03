//Write a JavaScript function to test whether a date is a weekend.
function testWeekend(dateParam) {

    let dateObj = new Date(dateParam[2], dateParam[1] - 1, dateParam[0]); //january is 0 feb is 1

    let day = dateObj.getDay();
    if (day === 0 || day === 6) {
        alert("Date is a weekend");
    } else {
        alert("Date is not a weekend");
    }
}

function testWeekendDriverFunction() {
    let dateInput = prompt("Enter date in dd/mm/yyyy");

    testWeekend(dateInput.split("/"));
}

testWeekendDriverFunction();

//sunday is zero
//saturday is six