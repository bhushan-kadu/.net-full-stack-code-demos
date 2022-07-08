/* a function to create any html tag
   parameter 1 - element name
   parameter 2 - attributes Object (keep null for no attributes)
   parameter 3 - text inside tag (keep it empty for tags having no text)
*/
function createAHtmlElement(elementName = "", attributeObj, elementText = "") {

    let createdElement = document.createElement(elementName);

    if (elementText.trim() !== "") {
        let textNode = document.createElement("textNode");
        textNode.textContent = elementText;
        createdElement.appendChild(textNode);
    }

    if (attributeObj !== null) {
        for (attributeName in attributeObj) {
            createdElement.setAttribute(attributeName, attributeObj[attributeName]);
        }
    }

    return createdElement;

}

/* 
  finds and returns array of elements from body having ng-repeat attribute
  parameter - attribute name 
*/
function findAndReturnElementsHavingGivenAttributeName(attributeName) {
    let body = document.body;
    let bodyChilds = body.childNodes;
    let foundElementsArray = [];
    let found = -1;
    let length = bodyChilds.length;
    for (let index = 0; index < length; index++) {
        found = -1;
        let currentElement = bodyChilds[index];
        if (bodyChilds[index].nodeName !== '#text') {
            let nodeAttributes = currentElement.getAttributeNames();
            found = nodeAttributes.findIndex((attribute) => {
                return attribute === attributeName;
            })
        }

        if (found !== -1) {
            foundElementsArray.push(currentElement);
        }
    }

    return foundElementsArray;
}