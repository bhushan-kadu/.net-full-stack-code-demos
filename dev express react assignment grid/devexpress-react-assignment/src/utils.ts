var dateObjToday = new Date();
var before18Year = dateObjToday.getFullYear() - 18;
const getDatePast18YearsFromToday = () => {
    return new Date(before18Year, dateObjToday.getDate());
}
const getDatePast28YearsFromToday = () => {
    return new Date(getDatePast18YearsFromToday().setFullYear(getDatePast18YearsFromToday().getFullYear() - 10));
}
const getStatesFromCountry = (countryInput, countryStatesObj) => {
    let statesIndex = countryStatesObj.countries.findIndex((item) => {
        return item.country === countryInput;
    })
    let statesArray = [];
    if (statesIndex !== -1) {
        statesArray = countryStatesObj.countries[statesIndex];
    }
    return statesArray;
}
function validateFormAndReturnErrorMessageArray(data) {
    let errorMessage = [];
    let dateObjToday = (new Date());
    let before18Year = dateObjToday.getFullYear() - 18;

    //date of birth input date for only 18+
    let leagalDateBefore = new Date(before18Year, dateObjToday.getDate());

    if (!data.firstName || data.firstName.trim() === "") {
        errorMessage.push("First name cannot be empty")

    }
    if (!data.lastName || data.lastName.trim() === "") {
        errorMessage.push("Last name cannot be empty")
    }
    if (!data.dob) {
        errorMessage.push("Enter proprer date of birth")
    } else if (data.dob > leagalDateBefore) {
        errorMessage.push("Age must be greater or eqal to 18 years")
    }

    if (!data.country || data.country.trim() === "") {
        errorMessage.push("Country cannot be empty")
    }

    if (!data.emailId || data.emailId.trim() === "") {
        errorMessage.push("Email Id cannot be empty")
    } else if (!isValidEmail(data.emailId.trim())) {
        errorMessage.push("Please Enter valid email")
    }

    if (!data.phone || data.phone.toString().trim() === "") {
        errorMessage.push("Phone cannot be empty")
    } else if (!isValidPhone(data.phone.toString().trim())) {
        errorMessage.push("Please Enter valid Phone number")
    }

    return errorMessage;
}
function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function isValidPhone(phone) {
    var regex = /[0-9 -()+]+$/;
    return phone.length === 10 && regex.test(phone);
}
function checkForUniqueValeInGrid(fieldName, value, allRows, idToIgnore) {

    var foundItems = allRows.find(item => item[fieldName].toString() === value);
    if (foundItems === undefined) {
        return true;
    } else if (foundItems.id === idToIgnore) {
        return true;
    } else {
        return false;
    }
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
const selectDistinct = (array) => {
    return array.filter(onlyUnique);
}
//delete element from aray by attribute
var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

const countryIdNameArray = [{ name: "Afghanistan", id: 1 }, { name: "Armenia", id: 2 }
    , { name: "Azerbaijan", id: 3 }
    , { name: "Bahrain", id: 4 }
    , { name: "Bangladesh", id: 5 }
    , { name: "Bhutan", id: 6 }
    , { name: "British Indian Ocean Territory", id: 7 }
    , { name: "Brunei", id: 8 }
    , { name: "Cambodia", id: 9 }
    , { name: "People's Republic of China", id: 10 }
    , { name: "Christmas Island", id: 11 }
    , { name: "Cocos (Keeling) Islands", id: 12 }
    , { name: "Cyprus", id: 13 }
    , { name: "Georgia", id: 14 }
    , { name: "Hong Kong", id: 15 }
    , { name: "India", id: 16 }
    , { name: "Indonesia", id: 17 }
]
const emptyContact = {
    firstName: '',
    lastName: '',
    DOB: getDatePast18YearsFromToday(),
    country: null,
    state: null,
    emailId: '',
    phone: ''
}
export {
    getDatePast18YearsFromToday,
    getDatePast28YearsFromToday,
    getStatesFromCountry,
    validateFormAndReturnErrorMessageArray,
    checkForUniqueValeInGrid,
    selectDistinct,
    removeByAttr,
    countryIdNameArray,
    emptyContact
};