//Write a JavaScript function to get the current currentDate
function getCurrentDate() {
    let currentDate = new Date();
    return currentDate.toLocalecurrentDateString();
}

alert(getCurrentDate());