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
function isValidDate(d) {
    if (d instanceof Date)
        return true;


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
    if (!isValidDate(data.DOB)) {
        errorMessage.push("Enter proprer date of birth")
    } else if (typeof data.dob === 'string') {
        const split = data.dob.split("-")
        if (split.length === 3) {
            data.dob = new Date(parseInt(split[2]), parseInt(split[1]), parseInt(split[0]))
            if (data.dob > leagalDateBefore) {
                errorMessage.push("Age must be greater or eqal to 18 years")
            } else {
                errorMessage.push("Age must be greater or eqal to 18 years")
            }
        }
        else {
            errorMessage.push("Enter proprer date of birth")
        }
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
function validateCountry(countryName, countryList) {
    let found = countryList.findIndex(x => x.countryName === countryName);
    return found !== -1;
}
function validateState(countryName, stateName, stateList) {
    let foundArray = stateList.filter(x => x.countryName === countryName);
    let found = foundArray.findIndex(x => x.stateName === stateName);
    return found !== -1;
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

//20 asian countries
let countries = ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
    "British Indian Ocean Territory", "Brunei", "Cambodia", "People's Republic of China",
    "Christmas Island", "Cocos (Keeling) Islands", "Cyprus", "Georgia", "Hong Kong",
    "India", "Indonesia"
];
const emptyContact = {
    firstName: '',
    lastName: '',
    dob: getDatePast18YearsFromToday(),
    country: null,
    state: null,
    emailId: '',
    phone: '',
    countries
}