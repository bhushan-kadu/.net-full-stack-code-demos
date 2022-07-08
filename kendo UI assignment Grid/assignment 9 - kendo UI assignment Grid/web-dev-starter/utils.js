/* a function to create any html tag
   parameter 1 - element name
   parameter 2 - attributes Object (keep null for no attributes)
   parameter 3 - text inside tag (keep it empty for tags having no text)
*/
function createAHtmlElement(elementName, attributeObj, elementText) {
    let createdElement = $('<' + elementName + '></' + elementName + '>');

    if (elementText === undefined || elementText.trim() !== "") {
        createdElement.text(elementText);
    }
    if (attributeObj === undefined || attributeObj !== null) {
        createdElement.attr(attributeObj)
    }
    return createdElement;
}

/* 
  finds and returns array of elements from body having ng-repeat attribute
  parameter - attribute name 
*/
function findAndReturnElementsHavingGivenAttributeName(attributeName) {
    return $('[' + attributeName + ']');
}

function copyArray(inputArray) {

    let copiedArray = [];
    inputArray.forEach(element => copiedArray.push(element));
    return copiedArray
}


var allRecordsArray = [{
        id: 1,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu3@gmail.com',
        phone: 8411998137
    }, {
        id: 2,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu34@gmail.com',
        phone: 8411998136
    },
    {
        id: 3,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu35@gmail.com',
        phone: 8411998135
    },
    {
        id: 4,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu36@gmail.com',
        phone: 8411998134
    },
    {
        id: 5,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu37@gmail.com',
        phone: 8411998133
    },

    {
        id: 6,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu38@gmail.com',
        phone: 8411998132
    },
    {
        id: 7,
        firstName: 'Bhushan',
        lastName: 'Kadu',
        DOB: new Date(1998, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu39@gmail.com',
        phone: 8411998131
    },
    {
        id: 8,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'bkadu310@gmail.com',
        phone: 8411998130
    },
    {
        id: 9,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh1@gmail.com',
        phone: 8411998129
    },
    {
        id: 1.,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh2@gmail.com',
        phone: 8411998128
    },
    {
        id: 11,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh3@gmail.com',
        phone: 8411998127
    },
    {
        id: 12,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh4@gmail.com',
        phone: 8411998126
    },
    {
        id: 13,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh5@gmail.com',
        phone: 8411998125
    },
    {
        id: 14,
        firstName: 'Ramesh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Maharashtra',
        emailId: 'ramesh6@gmail.com',
        phone: 8411998124
    },
    {
        id: 15,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu311@gmail.com',
        phone: 9411998123
    },
    {
        id: 16,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu312@gmail.com',
        phone: 9411998122
    },
    {
        id: 17,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu313@gmail.com',
        phone: 9411998121
    },
    {
        id: 18,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu314@gmail.com',
        phone: 9411998120
    },
    {
        id: 19,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 03, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu315@gmail.com',
        phone: 9411998119
    },
    {
        id: 19,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 08, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu316@gmail.com',
        phone: 9411998118
    },
    {
        id: 19,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 09, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu317@gmail.com',
        phone: 9411998117
    },
    {
        id: 19,
        firstName: 'Suresh',
        lastName: 'Kadu',
        DOB: new Date(1996, 11, 19),
        country: 'India',
        state: 'Gujarat',
        emailId: 'bkadu318@gmail.com',
        phone: 9411998116
    }
];