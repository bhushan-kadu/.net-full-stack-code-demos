var DemoApp = angular.module('DemoApp', ['dx']);
DemoApp.controller('DemoController', ['$scope', '$window', 'service', function DemoController($scope, win, service) {
    var gridHeight = win.innerHeight - 170;
    var dataGrid, confirmDialog;
    $scope.visibleAddContactPopup = false;
    $scope.isSubmitContactVisible = false;
    $scope.isUpdateContactVisible = false;
    win.addEventListener('resize', () => {
        dataGrid.option('height', win.innerHeight - 170);
    })
    const contactGrid_dblClick = (e) => {

        $scope.title = 'Update Contact';
        if (e.data && e.data.country) {
            let response = service.getStatesFouCountry(e.data.country)
            response.then(function(data) {
                $scope.contact.states = data;
            })
        }
        $scope.visibleAddContactPopup = true;
        $scope.contact = {...e.data };
        $scope.isSubmitContactVisible = false;
        $scope.isUpdateContactVisible = true;
    }
    const ddlCountryChange = (e) => {
        let response = service.getStatesFouCountry(e.component.option('value'))
        response.then(function(data) {
            $scope.contact.states = data;
        })
    }
    const btnFetch_click = () => {
        let filterArray = service.getFilterArray($scope.filterValues);
        if (filterArray.length) {
            dataGrid.filter(filterArray)
        }
    }
    const btnAdd_click = () => {
        $scope.contact = {...emptyContact };
        $scope.visibleAddContactPopup = true;
        $scope.title = 'Add New Contact';
        $scope.isSubmitContactVisible = true;
        $scope.isUpdateContactVisible = false;
    }
    const btnClear_click = () => {
        dataGrid.clearFilter();
        $scope.filterValues = {
            dobFrom: getDatePast28YearsFromToday(),
            dobTo: getDatePast18YearsFromToday(),
            fullName: '',
            country: '',
            state: ''
        }
    }
    const btnDelete_click = () => {
        var keys = dataGrid.getSelectedRowKeys();

        itemsToDelete = keys.length;

        if (itemsToDelete > 0) {
            confirmDialog.option('contentTemplate', deleteContentTemplate());

            confirmDialog.show();
        } else {
            DevExpress.ui.notify("Please select at leat one row to delete", "error", 3000)
        }
    }
    const dlgConfirmDelete_Yes_click = () => {

        let selectedRows = dataGrid.getSelectedRowKeys();
        let allRecordsArray = dataGrid.option('dataSource');
        selectedRows.forEach(function(item) {
            removeByAttr(allRecordsArray, 'id', item.id);
            dataGrid.refresh();
        })

        confirmDialog.hide()
    }
    const btnContactFormSubmit_click = (data) => {

        let errorMessage = validateFormAndReturnErrorMessageArray(data);
        if (errorMessage.length === 0) {
            let dataSource = dataGrid.option('dataSource');
            if (!checkForUniqueValeInGrid("emailId", data.emailId, dataSource)) {
                errorMessage.push("Email already present");
            }
            if (!checkForUniqueValeInGrid("phone", data.phone.toString(), dataSource)) {
                errorMessage.push("Phone already present");
            }
            if (errorMessage.length === 0) {
                dataSource.unshift(data);
                dataGrid.refresh();
                //close add contact window
                $scope.visibleAddContactPopup = false;

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
    const btnContactFormUpdate_click = data => {
        let errorMessage = validateFormAndReturnErrorMessageArray(data);
        let dataSource = dataGrid.option('dataSource');
        let recordId = data.id;
        // if (checkFormValidity(formObj)) {
        if (errorMessage.length === 0) {

            if (!checkForUniqueValeInGrid("emailId", data.emailId, dataSource, recordId)) {
                errorMessage.push("Email already present");
            }
            if (!checkForUniqueValeInGrid("phone", data.phone, dataSource, recordId)) {
                errorMessage.push("Phone already present");
            }
            if (errorMessage.length === 0) {
                var indexToUpdate = dataSource.findIndex(x => x.id === recordId)
                dataSource[indexToUpdate] = data;
                dataGrid.refresh()

                //close add contact window
                $scope.visibleAddContactPopup = false;

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
    $scope.contact = {...emptyContact }
    $scope.filterValues = {
        dobFrom: getDatePast28YearsFromToday(),
        dobTo: getDatePast18YearsFromToday(),
        fullName: '',
        country: '',
        state: ''
    }

    const deleteContentTemplate = () => { return 'You are deleting ' + itemsToDelete + ' item/s. Are You Sure?' }
    $scope.contactWidgets = {
        deletePopup: {
            onInitialized: e => {
                confirmDialog = e.component;
            },
            title: 'Confirm',
            width: '350px',
            height: '120px',
            contentTemplate: deleteContentTemplate,
            toolbarItems: [{
                    widget: "dxButton",
                    toolbar: "bottom",
                    location: "before",
                    options: {
                        text: "Yes",
                        onClick: function(e) {
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
                        onClick: function(e) {
                            confirmDialog.hide();
                        }
                    }
                }
            ],
            visible: false
        },
        btnContactFormSubmit: {
            text: 'Submit',
            type: 'default',
            onClick: () => btnContactFormSubmit_click({...$scope.contact }),
            bindingOptions: {
                visible: 'isSubmitContactVisible'
            }
        },
        btnContactFormUpdate: {
            text: 'Update',
            type: 'default',
            onClick: () => btnContactFormUpdate_click({...$scope.contact }),
            bindingOptions: {
                visible: 'isUpdateContactVisible'
            }
        },
        btnDelete: { text: 'Delete', type: 'default', onClick: btnDelete_click },
        btnAdd: { text: 'Add', type: 'default', onClick: btnAdd_click },
        btnFetch: { text: 'Fetch', type: 'default', onClick: btnFetch_click },
        btnClear: { text: 'Clear', type: 'default', onClick: btnClear_click },
        firstName: {
            maxLength: 15,
            bindingOptions: {
                value: 'contact.firstName'
            }
        },
        lastName: {
            maxLength: 15,
            bindingOptions: {
                value: 'contact.lastName'
            }
        },
        dob: {
            max: getDatePast18YearsFromToday(),
            bindingOptions: {
                value: 'contact.DOB'
            }
        },
        country: {
            onChange: ddlCountryChange,
            onselect: ddlCountryChange,
            bindingOptions: {
                value: 'contact.country',
                dataSource: 'contact.countries'
            }
        },
        state: {
            bindingOptions: {
                value: 'contact.state',
                items: 'contact.states'
            }
        },
        emailId: {
            bindingOptions: {
                value: 'contact.emailId'
            }
        },
        phone: {
            maxLength: 10,
            bindingOptions: {
                value: 'contact.phone'
            }
        },
        dobFromFilter: {
            max: getDatePast18YearsFromToday(),
            bindingOptions: {
                value: 'filterValues.dobFrom'
            }
        },
        dobToFilter: {
            max: getDatePast18YearsFromToday(),
            bindingOptions: {
                value: 'filterValues.dobTo'
            }
        },
        fullNameFilter: {
            bindingOptions: {
                value: 'filterValues.fullName',
                dataSource: 'filterValues.fullNameArray'
            }
        },
        countryFilter: {
            onChange: ddlCountryChange,
            onselect: ddlCountryChange,
            bindingOptions: {
                value: 'filterValues.country',
                dataSource: 'contact.countries'
            }
        },
        stateFilter: {
            bindingOptions: {
                value: 'filterValues.state',
                items: 'contact.states'
            }
        }
    }
    $scope.gridOptions = {
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true,
        showColumnLines: true,
        paging: { pageSize: 12 },
        selection: {
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
        onInitialized: function(e) {
            dataGrid = e.component;
            var data = dataGrid.option('dataSource');
            var fullNameArray = data.map(x => x.firstName + " " + x.lastName);
            $scope.filterValues.fullNameArray = [...new Set(fullNameArray)]
        },
        dataSource: contactsData,
        height: gridHeight,
        onRowDblClick: contactGrid_dblClick
    }
    $scope.AddContactPopupOptions = {
        onInitialized: function(e) {
            addContactPopup = e.component;
        },
        width: '400px',
        height: 'auto',
        bindingOptions: {
            visible: 'visibleAddContactPopup',
            title: 'title'
        }
    }
}]).factory('service', ["$window", function(win) {

    const getStatesFouCountry = async(countryName) => {
        const url = 'states.json';
        const options = {
            method: 'GEt'
        };

        const response = await fetch(url, options);
        const responseData = await response.json();
        let statesIndex = responseData.countries.findIndex((item) => {
            return item.country === countryName;
        })

        let statesArray = [];
        if (statesIndex !== -1) {
            statesArray = responseData.countries[statesIndex];
        }

        return statesArray.states
    }

    const getFilterArray = (data) => {
        let fromDateObj = data.dobFrom;
        let toDateObj = data.dobTo;
        let errorMessage = [];

        if (!(fromDateObj.getTime() < toDateObj.getTime())) {
            errorMessage.push("From date should be less than to date");
        }

        if (errorMessage.length === 0) {
            let filters = [
                ["DOB", ">=", fromDateObj],
                ["DOB", "<=", toDateObj]
            ]

            let fullName = data.fullName;
            let country = data.country;
            let state = data.state;

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
            return filters;
        } else {
            DevExpress.ui.notify(errorMessage[0], "error", 3000);
        }
        return errorMessage
    }
    return {
        getStatesFouCountry,
        getFilterArray

    }
}])