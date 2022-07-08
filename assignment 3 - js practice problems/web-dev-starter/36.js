//Write a JavaScript program to list the properties of a JavaScript object.
function listObjectProperties(objectParam) {
    for (key in objectParam) {
        // console.log(`${key}: ${object[key]}`)
        console.log(`${key}, `);
    }
}

function listObjectPropertiesDriverFunction(params) {
    let objectOriginal = {
        name: "Bhushan",
        gender: 'male',
        age: 23
    };

    console.log("Object properties are ");
    listObjectProperties(objectOriginal);
}

listObjectPropertiesDriverFunction();

//Object.getOwnPropertyNames(person); can also use