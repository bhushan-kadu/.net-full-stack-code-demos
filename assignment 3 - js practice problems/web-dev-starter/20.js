//Write a JavaScript function to compare dates
function compareTwoDates(dateParam1, dateParam2) {

    let date1 = new Date(dateParam1[2], dateParam1[1], dateParam1[0]);
    let date2 = new Date(dateParam2[2], dateParam2[1], dateParam2[0]);

    let date1Time = date1.getTime();
    let date2Time = date2.getTime();

    if (date1Time === date2Time) {
        alert("Both dates are same");
    } else if (date1Time > date2Time) {
        alert(dateParam1.join("/") + " is greater");
    } else {
        alert(dateParam2.join("/") + " is greater");
    }
}

function compareTwoDatesDriverFunction() {
    let date1 = prompt("Enter date1 in dd/mm/yyyy");
    let date2 = prompt("Enter date2 in dd/mm/yyyy");
    compareTwoDates(date1.split("/"), date2.split("/"));
}

compareTwoDatesDriverFunction();