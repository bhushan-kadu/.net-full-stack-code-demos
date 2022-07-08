//Write a JavaScript function to get difference between two dates in days.
function compareTwoDates(dateParam1, dateParam2) {

    let date1 = new Date(dateParam1[2], dateParam1[1], dateParam1[0]);
    let date1Time = date1.getTime();

    let date2 = new Date(dateParam2[2], dateParam2[1], dateParam2[0]);
    let date2Time = date2.getTime();

    let differenceIndateTimes = Math.abs(date1Time - date2Time);

    days = parseInt(differenceIndateTimes / (1000 * 60 * 60 * 24));

    return days;
}


function compareTwoDatesDriverFunction() {
    let dateInput1 = prompt("Enter date1 in dd/mm/yyyy");
    let dateInput2 = prompt("Enter date2 in dd/mm/yyyy");

    let differenceDays = compareTwoDates(dateInput1.split("/"), dateInput2.split("/"));

    alert("The difference in days is " + differenceDays);
}
compareTwoDatesDriverFunction();