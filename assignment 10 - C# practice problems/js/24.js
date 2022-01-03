// function isLeapYear(year) {
//     if (year % 4 === 0) {
//         if (year % 100 === 0) {
//             if (year % 400 === 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         } else {
//             return true;
//         }
//     } else {
//         return false;
//     }
// }

//Write a JavaScript function to get the amount of days of a year. 

function isLeapYear(yearParam) {
    if (yearParam % 400 == 0) {
        return true;
    }

    if (yearParam % 100 == 0) {
        return false;
    }

    if (yearParam % 4 == 0) {
        return true;
    }

    return false;
}

function isLeapYearDriverFunction() {
    let yearInput = prompt("enter year in yyyy");

    if (isLeapYear(yearInput)) {
        alert("366 days");
    } else {
        alert("365 days");
    }
}

isLeapYearDriverFunction();