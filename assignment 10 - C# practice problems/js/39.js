//Write a javascript function to retrieve all the values of an object's properties. 
function retriveAllPropertyValues(objectParam) {
    let valuesArray = [];

    for (property in objectParam) {
        valuesArray.push(objectParam[property]);
    }
    return valuesArray;
}

function retriveAllPropertyValuesDriverFunction() {
    let objectOriginal = {
        name: "Bhushan",
        gender: 'male',
        age: 23
    };

    console.log("object is:");
    console.log(objectOriginal);
    console.log("All retrived values are:");
    console.log(retriveAllPropertyValues(objectOriginal));
}

retriveAllPropertyValuesDriverFunction();