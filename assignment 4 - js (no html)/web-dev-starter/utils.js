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