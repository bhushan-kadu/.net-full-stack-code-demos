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