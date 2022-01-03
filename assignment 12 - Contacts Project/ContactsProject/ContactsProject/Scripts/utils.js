
let baseUrl = "https://localhost:44312/api/";

const countryList = new kendo.data.DataSource({
    transport: {
        read: {
            url: baseUrl + "country",
            dataTye: "json"
        }
    }
});

/*
     function to extract and return all data from form
     parameter - form jquery object
     return(array) - form data in object pushed inside array
   */
function getAllDataFromForm(form) {
    let allFormFields = form.find(".form-field");

    let valuesObj = {};
    let length = allFormFields.length;
    for (let i = 0; i < length; i++) {
        let formField = allFormFields[i];
        let formFieldInput = $(formField).find('input, select')
        let formFieldInputText = $(formFieldInput).val();
        let formFieldName = $(formFieldInput).attr('name');

        if (formFieldName === 'dob') {
            valuesObj[formFieldName] = $('#dtpAddContactDateOfBirth').data('kendoDatePicker').value();
        } else {
            valuesObj[formFieldName] = formFieldInputText;
        }
    }
    return valuesObj;
}

/*
    *  Sends a ajax request
    *  parameter1 - Request Url
    *  parameter2 - request method
    *  parameter3 - Data to send with request
    */
function ajaxRequest(url, method, data) {
    if (method.toUpperCase() === 'DELETE') {
        let params = $.param(data, true);
        return $.ajax({
            url: url + "?" + params,
            type: "DELETE"
        })
    } else {
        return $.ajax({
            url: url,
            type: method,
            data: data
        })
    }
}



