//Write a JavaScript function to get the month name from a particular dateInput.
let monthStrings = ["January", "February",
    "March", "April", "May", "June", "July",
    "August", "September", "October", "November",
    "December"
]

function getMonthNameFromDate(month) {
    return monthStrings[month - 1];
}

function getMonthNameFromDateDriverFunction() {
    let dateInput = prompt("Enter dateInput in dd/mm/yyyy");
    dateInput = dateInput.split("/");

    // let day = parseInt(dateInput[0]);
    let month = parseInt(dateInput[1]);
    // let year = parseInt(dateInput[2]);

    alert(getMonthNameFromDate(month));
}

getMonthNameFromDateDriverFunction();