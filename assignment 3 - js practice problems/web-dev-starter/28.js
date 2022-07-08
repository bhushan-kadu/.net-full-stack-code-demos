//Write a JavaScript function to format a number up to specified decimal places.
function formatNumber(numberParam, decimalPlaceParam) {

    numberParam = numberParam.toString();
    numberParam = numberParam.split(".");
    numberParam[1] = numberParam[1].substr(0, decimalPlaceParam);
    numberParam = numberParam.join(".");
    return parseFloat(numberParam);
}

function formatNumberDriverFunction() {

    let numberInput = prompt("Enter a float number");
    let deciamlPlacesInput = prompt("Specify decimal space to format");

    numberInput = parseFloat(numberInput);
    deciamlPlacesInput = parseInt(deciamlPlacesInput);

    alert("formatted number is: " + formatNumber(numberInput, deciamlPlacesInput));
}

formatNumberDriverFunction()