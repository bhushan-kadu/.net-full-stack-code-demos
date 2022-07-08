//Write a JavaScript function to add specified minutes to a Date object.
function addMinutesToDateObject(minutesToBeAdded) {

    let date = new Date(1998, 3, 19);

    console.log("time before adding " + minutesToBeAdded +
        " minutes " + date.toLocaleTimeString());

    const MILLIS_IN_MINUTE = 60000
    let timeInMillis = date.getTime() + minutesToBeAdded * MILLIS_IN_MINUTE;
    date = new Date(timeInMillis);

    console.log("time after adding " + minutesToBeAdded +
        " minutes " + date.toLocaleTimeString());

}

function addMinutesToDateObjectDriverFunction() {
    let minutesInput = prompt("Enter minutes to be added");

    addMinutesToDateObject(minutesInput);
}

addMinutesToDateObjectDriverFunction();