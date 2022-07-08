//20 asian countries
var countryList = ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
    "British Indian Ocean Territory", "Brunei", "Cambodia", "People's Republic of China",
    "Christmas Island", "Cocos (Keeling) Islands", "Cyprus", "Georgia", "Hong Kong",
    "India", "Indonesia"
];
var contact = {}, itemsToDelete = 0, deletePopup, deleteContentTemplate;

jQuery(function () {

    $(window).resize(function () {
        var grid = $("#grdContactsList").dxDataGrid();
        grid.height(getGridHeight())
    })
    /*------------------------- start of header ---------------------------------*/
    $('button').dxButton({ type: 'default' });
    /*------------------------- end of header -----------------------------------*/
    /*------------------------- start of actions panel --------------------------*/
    $('#btnGridFetch').dxButton({
        onClick: btnGridFetch_click
    });
    $('#btnGridDelete').dxButton({
        onClick: btnGridDelete_click
    });
    var showAddContactPopup = data => {
        $('#pnlAddContact').css('display', 'block');
        contact = data;
        rebuildpopup()
        var popup = $('#pnlAddContactPopup').dxPopup("instance");
        popup.show();
    }
    $('#btnGridAdd').dxButton({
        onClick: function (event) {
            showAddContactPopup({})
            $('#btnContactFormUpdate').hide()
            $('#btnContactFormSubmit').show();
        }
    });
    $('#btnFilterClear').dxButton({
        onClick: btnGridClear_click
    });
    deleteContentTemplate = () => { return 'You are deleting ' + itemsToDelete + ' item. Are You Sure?' }
    //confirm delete dialog
    deletePopup = $('#dlgConfirmDelete').dxPopup({
        title: 'Confirm',
        width: '400px',
        height: '160px',
        contentTemplate: deleteContentTemplate,
        toolbarItems: [{
            widget: "dxButton",
            toolbar: "bottom",
            location: "before",
            options: {
                text: "Yes",
                onClick: function (e) {
                    dlgConfirmDelete_Yes_click();
                }
            }
        },
        {
            widget: "dxButton",
            toolbar: "bottom",
            location: "after",
            options: {
                text: "No",
                onClick: function (e) {
                    deletePopup.hide();
                }
            }
        }],
        visible: false
    }).dxPopup("instance");

    /*------------------------- end of actions panel -------------------------*/

    /*------------------------- start of filter header ----------------------------*/
    //get 18 year back date 
    let dateObjToday = (new Date());
    let before18Year = dateObjToday.getFullYear() - 18;
    let dateToday = dateObjToday.getDate();

    //date of birth input date for only 18+
    $('#dtpFilterDateOfBirthFrom').dxDateBox({
        max: new Date(before18Year, dateObjToday.getDate()),
        value: new Date(before18Year - 10, dateToday),
    });

    //date of birth input date for only 18+
    $('#dtpFilterDateOfBirthTo').dxDateBox({
        max: new Date(before18Year, dateObjToday.getDate()),
        value: new Date(before18Year, dateToday),
    });

    $('#ddlFilterFullName').dxAutocomplete({ width: '100%' });

    $('#ddlFilterCountry').dxAutocomplete({
        dataSource: countryList,
        onChange: ddlFilterCountry_change,
        width: '100%'
    });

    $('#ddlFilterState').dxSelectBox({});

    /*------------------------- end of filter header -----------------------------*/
    /*------------------------- start of grid ------------------------------------*/
    $("#grdContactsList").dxDataGrid({
        dataSource: allRecordsArray,
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true,
        showColumnLines: true,
        onContentReady: (event) => {
            var data = event.component.option('dataSource');
            var fullNameArray = data.map(x => x.firstName + " " + x.lastName);
            fullNameArray = [...new Set(fullNameArray)];
            var fullName = $('#ddlFilterFullName').dxAutocomplete('instance')
            fullName.option('dataSource', fullNameArray);
        },
        keyExpr: "id",
        selection: {
            header: 'Sel.',
            mode: "multiple",
            showCheckBoxesMode: 'always',
            allowSelectAll: false
        },
        columns: [
            "firstName",
            "lastName",
            {
                dataField: "DOB",
                dataType: 'date',

            },
            "country",
            "state",
            "emailId",
            "phone",
        ],
        onRowDblClick: function (e) {
            showAddContactPopup(e.data)
            $('#btnContactFormUpdate').show()
            $('#btnContactFormSubmit').hide();
        },
        height: getGridHeight,
        paging: { pageSize: 11 }
    });

    /*------------------------- end of grid ------------------------------------*/
    /*----------------------- start of Add/update contact window----------------*/

    $('#txtEmail').dxTextBox({ mode: 'email' });
    $('#txtPhone').dxTextBox({ maxLength: 10 })
    $('#txtFirstName').dxTextBox({ maxLength: 15 })
    $('#txtLastName').dxTextBox({ maxLength: 15 })

    //get 18 year back date 
    before18Year = dateObjToday.getFullYear() - 18;

    //date of birth input date for only 18+
    $('#dtpAddContactDateOfBirth').dxDateBox({
        max: new Date(before18Year, dateObjToday.getDate()),
        footer: "&nbsp",
        format: 'dd-MM-yyyy'
    });

    //add contact country autocomplete widget
    $('#ddlAddContactCountry').dxAutocomplete({
        dataSource: countryList,
        onChange: ddlAddContactCountry_change
    });

    //add contact state ddl
    $('#ddlAddContactState').dxSelectBox();

    var addContactPopupOption = {
        contentTemplate: function () {
            var popupContent = $("#pnlAddContact");
            return popupContent
        },
        visible: false,
        width: "400px",
        height: '550px',
        title: 'Add New Contact',
        onClose: function () {
            clearContactForm();
        }

    }
    //add/update contact window
    $('#pnlAddContactPopup').dxPopup(addContactPopupOption);

    /*------------------------- end of Add/update contact window---------------------*/

});

function getGridHeight() {
    return $(window).height() - 173
}

function rebuildpopup() {
    $('#txtFirstName').dxTextBox('instance').option('value', contact.firstName)
    $('#txtLastName').dxTextBox('instance').option('value', contact.lastName)
    $('#dtpAddContactDateOfBirth').dxDateBox('instance').option('value', contact.DOB)
    $('#ddlAddContactCountry').dxAutocomplete('instance').option('value', contact.country)
    let stateWidget = $('#ddlAddContactState').dxSelectBox('instance');
    if (contact.country) {
        $.get("states.json", function (data, status) {
            populateStatesOptions(data, contact.country, stateWidget);
        });
    }
    $('#ddlAddContactState').dxSelectBox('instance').option('value', contact.state)
    $('#txtEmail').dxTextBox('instance').option('value', contact.emailId)
    $('#txtPhone').dxTextBox('instance').option('value', contact.phone)
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
//delete confirmation dialog
function dlgConfirmDelete_Yes_click() {
    let grid = $("#grdContactsList").dxDataGrid('instance');
    let selectedRows = grid.getSelectedRowKeys();

    selectedRows.forEach(function (item) {
        removeByAttr(allRecordsArray, 'id', item);
        grid.refresh();
    })


    deletePopup.hide()
}


//set full name array to full name auto complete filter
function grdContactsList_dataSourceChange(event) {

    let fullNameArray = [];
    let grid = $("#grdContactsList").dxDataGrid('instance');
    let gridData = grid.dataSource.data();

    $.each(gridData, function (itr) {
        let dataItem = gridData[itr];
        let fullName = dataItem.firstName + " " + dataItem.lastName;
        if ($.inArray(fullName, fullNameArray) === -1) {
            fullNameArray.push(fullName);
        }
    })

    $('#ddlFilterFullName').dxAutocomplete('instance').option('dataSource', fullNameArray);

}

//main panel delete button click
function btnGridDelete_click() {
    let grid = $('#grdContactsList').dxDataGrid('instance');
    var keys = grid.getSelectedRowKeys();
    let dialog = $('#dlgConfirmDelete').dxPopup('instance');
    itemsToDelete = keys.length;

    if (itemsToDelete > 0) {
        dialog.option('contentTemplate', deleteContentTemplate());

        dialog.show();
    }
}

//intialize state widget when in update contact mode
function initializeUpdateContactStates(country, stateName) {
    let stateWidget = $('#ddlAddContactState').dxSelectBox('instance');
    $.get("states.json", function (data, status) {
        populateStatesOptions(data, country, stateWidget, stateName);
    });
}



//if country is empty then make state ddl empty
function ddlFilterCountry_change(ui) {

    let countryName = ui.component.option('value');
    let stateWidget = $('#ddlFilterState').dxSelectBox('instance');

    if (countryName.trim() === "") {
        stateWidget.value("");
        stateWidget.option('dataSource', []);
    } else {
        let stateWidget = $('#ddlFilterState').dxSelectBox('instance');
        $.get("states.json", function (data, status) {
            populateStatesOptions(data, countryName.trim(), stateWidget);
        });
    }
}

//trigger function after country value is selected in autocomplete 
//country widget
function ddlAddContactCountry_change(ui) {

    let countryName = ui.component.option('value');
    let stateWidget = $('#ddlAddContactState').dxSelectBox('instance');

    // $('#ddlFilterState').selectmenu("disable");
    $.get("states.json", function (data, status) {
        populateStatesOptions(data, countryName.trim(), stateWidget);
    });

}

/*
    trigger country select function which appends state options to 
    select widget of country
    parameter 1 - object having country to state mapping
    parameter 2 - input country
    parameter 3 - state widget to be initialized
    parameter 4 - state name to sellect (dont send if not want to select)
*/
function populateStatesOptions(countryStatesObj, countryInput, stateWidget, stateName) {

    let statesIndex = countryStatesObj.countries.findIndex((item) => {
        return item.country === countryInput;
    })

    let statesArray = [];
    if (statesIndex !== -1) {
        statesArray = countryStatesObj.countries[statesIndex];
        //create state options
        stateWidget.option('dataSource', statesArray.states);
    }

    if (stateName !== undefined) {
        stateIndex = stateWidget.dataSource.options.data.findIndex(function (data) {
            return data === stateName
        })
        stateWidget.select(stateIndex);
    }
}

//submit method of add contact
function btnContactFormSubmit_click(event) {


    let formObj = $('#pnlAddContact');
    let data = getAllDataFromForm(formObj);
    let errorMessage = validateFormAndReturnErrorMessageArray(data);
    if (errorMessage.length === 0) {

        if (!checkForUniqueValeInGrid("emailId", data.emailId)) {
            errorMessage.push("Email already present");
        }
        if (!checkForUniqueValeInGrid("phone", data.phone.toString())) {
            errorMessage.push("Phone already present");
        }
        if (errorMessage.length === 0) {
            var grid = $('#grdContactsList').dxDataGrid('instance');
            allRecordsArray.push(data);
            grid.refresh();
            clearContactForm();
            //close add contact window
            $('#pnlAddContactPopup').dxPopup('instance').hide();

            //open sucess dialog
            DevExpress.ui.notify('Contact Added Succefully!', "success", 3000)
        } else {
            DevExpress.ui.notify(errorMessage[0], "error", 3000)
        }

    } else {
        if (errorMessage.length > 2) {
            DevExpress.ui.notify("Please Enter All form fields", "error", 3000)
        } else {
            DevExpress.ui.notify(errorMessage[0], "error", 3000)
        }
        errorMessage = [];
    }
}


function checkForUniqueValeInGrid(fieldName, value, idToIgnore) {

    let grid = $('#grdContactsList').dxDataGrid('instance');
    let allRows = grid.option('dataSource');

    var foundItems = allRows.find(item => item[fieldName].toString() === value);
    if (foundItems === undefined) {
        return true;
    } else if (foundItems.id === idToIgnore) {
        return true;
    } else {
        return false;
    }
}

function clearContactForm() {
    let formObj = $('#pnlAddContact');
    clearAllDataFromForm(formObj)
}
function clearAllDataFromForm(form) {
    let allFormFields = form.find(".form-field");

    let length = allFormFields.length;
    for (let i = 0; i < length; i++) {
        var formFieldInputWidget;
        let formField = allFormFields[i];
        let formFieldInput = $(formField).find('div[id^="txt"], div[id^="dtp"],div[id^="ddl"]')
        if (formFieldInput.hasClass('dx-textbox')) {
            if (formFieldInput.hasClass('dx-datebox')) {
                formFieldInputWidget = $(formFieldInput).dxDateBox('instance');
            } else if (formFieldInput.hasClass('dx-autocomplete')) {
                formFieldInputWidget = $(formFieldInput).dxAutocomplete('instance');
            } else if (formFieldInput.hasClass('dx-selectbox')) {
                formFieldInputWidget = $(formFieldInput).dxSelectBox('instance');
            } else {
                formFieldInputWidget = $(formFieldInput).dxTextBox('instance');
            }
        }

        formFieldInputWidget.option('value', '');
    }
}
/* 
  function to check and return form validity
  parameter - form jquery object
  return(boolean) - true if valid false if invalid
*/
function checkFormValidity(form) {

    let allInputs = form.find("input");
    let validity = true;

    let length = allInputs.length;
    for (let i = 0; i < length; i++) {
        if (!allInputs[i].checkValidity()) {
            validity = false;
            break;
        }
    }
    return validity;
}

/* 
  function to extract and return all data from form 
  parameter - form jquery object
  return(array) - form data in object pushed inside array
*/
function getAllDataFromForm(form, id) {
    let allFormFields = form.find(".form-field");

    let valuesObj = {};
    let length = allFormFields.length;
    for (let i = 0; i < length; i++) {
        var formFieldInputWidget;
        let formField = allFormFields[i];
        let formFieldInput = $(formField).find('div[id^="txt"], div[id^="dtp"],div[id^="ddl"]')
        if (formFieldInput.hasClass('dx-textbox')) {
            if (formFieldInput.hasClass('dx-datebox')) {
                formFieldInputWidget = $(formFieldInput).dxDateBox('instance');
            } else if (formFieldInput.hasClass('dx-autocomplete')) {
                formFieldInputWidget = $(formFieldInput).dxAutocomplete('instance');
            } else if (formFieldInput.hasClass('dx-selectbox')) {
                formFieldInputWidget = $(formFieldInput).dxSelectBox('instance');
            } else {
                formFieldInputWidget = $(formFieldInput).dxTextBox('instance');
            }
        }

        let formFieldInputText = formFieldInputWidget.option('value');
        let formFieldName = $(formFieldInput).attr('name');

        if (formFieldName === 'DOB') {
            valuesObj[formFieldName] = $('#dtpAddContactDateOfBirth').dxDateBox('instance').option('value') || '';
        } else {
            valuesObj[formFieldName] = formFieldInputText || '';
        }
    }
    if (id) {
        valuesObj.id = id;
    } else {
        var maxId = 0;
        allRecordsArray.forEach(function (item) {
            if (item.id > maxId) maxId = item.id
        })

        valuesObj.id = ++maxId;
    }

    return valuesObj;
}



//bind each row click with update contact logic
function grdContactsList_dataBound() {
    let grid = this;
    grid.element.on("click", 'tbody tr[data-uid]', function (event) {

        let row = event.currentTarget;

        if (!$(event.target).hasClass('k-checkbox')) {
            openUpdateContactWindow(row);
        }
    });
}

//open update contact window
function openUpdateContactWindow(row) {

    //set title and open window
    $('#pnlAddContact').data('kendoWindow').title("Update Contact").center().open();

    let grid = $('#grdContactsList').dxDataGrid('instance');
    grid.clearSelection();
    grid.select(row);

    let data = grid.dataItem(row);
    let formFields = $('#pnlAddContact').find('input');

    $.each(formFields, function (index) {
        let inputData = data[$(formFields[index]).attr('name')]
        $(formFields[index]).val(inputData);
    });

    $('#dtpAddContactDateOfBirth').dxDateBox('instance').value(data['DOB']);

    //select country programatically first then select proper state
    let stateName = data['state'];
    selectCountry(data['country']);

    function selectCountry(value) {
        $('#ddlAddContactCountry').val(value, initializeUpdateContactStates(value, stateName));
    }

    //hide the submit button 
    $('#btnContactFormSubmit').hide()
    $('#btnContactFormUpdate').show();
}
function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function isValidPhone(phone) {
    var regex = /[0-9 -()+]+$/;
    return phone.length === 10 && regex.test(phone);
}
function validateFormAndReturnErrorMessageArray(data) {
    let errorMessage = [];
    let dateObjToday = (new Date());
    let before18Year = dateObjToday.getFullYear() - 18;

    //date of birth input date for only 18+
    let leagalDateBefore = new Date(before18Year, dateObjToday.getDate());

    if (data.firstName.trim() === "") {
        errorMessage.push("First name cannot be empty")

    }
    if (data.lastName.trim() === "") {
        errorMessage.push("Last name cannot be empty")
    }
    if (!data.DOB) {
        errorMessage.push("Enter proprer date of birth")
    } else if (data.DOB > leagalDateBefore) {
        errorMessage.push("Age must be greater or eqal to 18 years")
    }

    if (data.country.trim() === "") {
        errorMessage.push("Country cannot be empty")
    }

    if (data.emailId.trim() === "") {
        errorMessage.push("Email Id cannot be empty")
    } else if (!isValidEmail(data.emailId.trim())) {
        errorMessage.push("Please Enter valid email")
    }

    if (data.phone.toString().trim() === "") {
        errorMessage.push("Phone cannot be empty")
    } else if (!isValidPhone(data.phone.toString().trim())) {
        errorMessage.push("Please Enter valid Phone number")
    }

    return errorMessage;
}

//update contact btn click
function btnContactFormUpdate_click(event) {

    let formObj = $('#pnlAddContact');
    var recordId = contact.id;
    let data = getAllDataFromForm(formObj, recordId);
    let errorMessage = validateFormAndReturnErrorMessageArray(data);

    // if (checkFormValidity(formObj)) {
    if (errorMessage.length === 0) {

        if (!checkForUniqueValeInGrid("emailId", data.emailId, recordId)) {
            errorMessage.push("Email already present");
        }
        if (!checkForUniqueValeInGrid("phone", data.phone, recordId)) {
            errorMessage.push("Phone already present");
        }
        if (errorMessage.length === 0) {
            var indexToUpdate = allRecordsArray.findIndex(x => x.id === recordId)
            allRecordsArray[indexToUpdate] = data;
            let grid = $('#grdContactsList').dxDataGrid('instance');
            grid.refresh()
            //clear form
            clearContactForm();

            //close add contact window
            $('#pnlAddContactPopup').dxPopup('instance').hide();

            //open sucess dialog
            DevExpress.ui.notify('Contact updated Succefully!', "success", 3000)

        } else {
            DevExpress.ui.notify(errorMessage[0], "error", 3000)
        }

    } else {
        if (errorMessage.length > 2) {
            DevExpress.ui.notify("Please Enter All form fields", "error", 3000)
        } else {
            DevExpress.ui.notify(errorMessage[0], "error", 3000)
        }
        errorMessage = [];
    }
}

function btnGridFetch_click(event) {
    let dobFrom = $('#dtpFilterDateOfBirthFrom').dxDateBox('instance');
    let fromDateObj = dobFrom.option('value');
    dobFrom = dobFrom.option('text');
    var dobFromArray = dobFrom.split('/')
    let dobTo = $('#dtpFilterDateOfBirthTo').dxDateBox('instance');
    let toDateObj = dobTo.option('value');
    dobTo = dobTo.option('text');
    var dobToArray = dobTo.split('/')

    let grid = $('#grdContactsList').dxDataGrid('instance');
    let errorMessage = [];

    if (dobFromArray.length !== 3) {
        if (dobFrom === "") {
            errorMessage.push("From date should not be Empty");
        } else {
            errorMessage.push("Enter from date in proper format");
        }
    }
    if (dobToArray.length !== 3) {
        if (dobTo === "") {
            errorMessage.push("To date should not be Empty");
        } else {
            errorMessage.push("Enter to date in proper format");
        }
    }
    if (dobFromArray.length === 3 && dobToArray.length === 3) {
        if (!(fromDateObj.getTime() < toDateObj.getTime())) {
            errorMessage.push("From date should be less than to date");
        }
    }

    if (errorMessage.length === 0) {
        let filters = [
            ["DOB", ">=", fromDateObj],
            ["DOB", "<=", toDateObj]
        ]

        let fullName = $('#ddlFilterFullName').dxAutocomplete('instance').option('value');
        let country = $('#ddlFilterCountry').dxAutocomplete('instance').option('value');
        let state = $('#ddlFilterState').dxSelectBox('instance').option('value');

        if (fullName) {
            fullName = fullName.trim().split(" ");
            let firstName = fullName[0];
            let lastName = fullName[1];
            filters.push(["firstName", "=", firstName]);
            filters.push(["lastName", "=", lastName]);
        }

        if (country) {
            filters.push(["country", "=", country]);
        }

        if (state) {
            filters.push(["state", "=", state]);
        }

        filters.push("and")
        // let filterToBeApplied = {
        //     logic: 'and',
        //     filters: filters
        // }
        grid.filter(filters)

    } else {
        DevExpress.ui.notify(errorMessage[0], "error", 3000);

    }
}

function btnGridClear_click(event) {

    //get 18 year back date 
    let dateObjToday = (new Date());
    let before18Year = dateObjToday.getFullYear() - 18;
    let dateToday = dateObjToday.getDate();

    //clear to default
    $('#dtpFilterDateOfBirthTo').dxDateBox('instance').option('value', new Date(before18Year, dateToday));
    $('#dtpFilterDateOfBirthFrom').dxDateBox('instance').option('value', new Date(before18Year - 10, dateToday));
    $('#ddlFilterFullName').dxAutocomplete('instance').option('value', "");
    $('#ddlFilterCountry').dxAutocomplete('instance').option('value', "");
    let state = $('#ddlFilterState').dxSelectBox('instance');
    state.option('value', "");
    state.option('dataSource', []);

    //reload grid
    let grid = $('#grdContactsList').dxDataGrid('instance');
    grid.deselectAll()
    grid.option('filter', []);
    grid
    //fetch with default dates
    btnGridFetch_click();

}