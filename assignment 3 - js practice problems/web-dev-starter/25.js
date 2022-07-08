//Write a JavaScript function to count the number of days passed since beginning of the year.
function noOfDaysPassed() {

    dateStart = new Date(2020, 0);
    dateToday = new Date();

    todayTime = dateToday.getTime();
    startTime = dateStart.getTime();

    differenceInMillis = todayTime - startTime;

    return parseInt(differenceInMillis / (1000 * 60 * 60 * 24));
}

console.log(noOfDaysPassed())