//Write a JavaScript function to check if an object contains given property.
function containsProperty(objectParam, propertyParam) {
    let keysArray = Object.keys(objectParam);

    let isFound = keysArray.findIndex((item) => {
        return item === propertyParam;
    })

    if (isFound === -1) {
        return false;
    } else {
        return true;
    }
}

function containsPropertyDriverFunction() {
    let object = {
        name: "Bhushan",
        gender: 'male',
        age: 23
    };

    let propNameInput = prompt("Enter propery name to check.");
    console.log("object is:");
    console.log(object);

    if (containsProperty(object, propNameInput.trim())) {
        console.log("propery is present");
    } else {
        console.log("propery is not present");
    }
}

containsPropertyDriverFunction();