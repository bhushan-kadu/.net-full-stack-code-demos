import { UploadContactsPopup } from "./Component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as asyncActions } from "async-ops";
import { compose, withHandlers, withState } from "recompose";
import * as utils from '../../../utils';
import React, { ComponentClass } from "react";
import { ADD_CONTACTS } from "../Services/addContact";
import { FETCH_CONTACTS } from "../Services/fetchContacts";
import notify from 'devextreme/ui/notify';
const ExcelJS = require('exceljs');

const mapDispatchTopProps = dispatch =>
    bindActionCreators(
        {
            asyncOperationStart: asyncActions.asyncOperationStart,
        },
        dispatch
    );

const mapStateToProps = state => ({
    contacts: state.contactReducer.contactList,
    countries: state.countryReducer.countryList,
    states: state.stateReducer.stateList
})
const downloadSheet = () => {
    var workbook = new ExcelJS.Workbook();

    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    var worksheet = workbook.addWorksheet("Contacts");

    worksheet.columns = [
        { header: 'First Name', key: 'FirstName', width: 15 },
        { header: 'Last Name', key: 'LastName', width: 25 },
        { header: 'Date Of Birth', key: 'DateOfBirth', width: 20 },
        { header: 'Country', key: 'CountryName', width: 25 },
        { header: 'State', key: 'StateName', width: 12 },
        { header: 'Email Id', key: 'EmailId', width: 12, style: { numFmt: "0000" } },
        { header: 'Phone', key: 'Phone', width: 12, style: { numFmt: "0000" } },
    ];

    downloadFileFromworkBook(workbook);
}
const downloadFileFromworkBook = workbook => {
    workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        downloadFromBlob(blob, "contacts.xlsx");
    });
}
const downloadFromBlob = (blob, fileName) => {
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
}
const readFile = (file, props) => {
    if (file) {
        const reader = new FileReader();
        const workbook = new ExcelJS.Workbook();
        try {
            reader.readAsArrayBuffer(file);
            reader.onload = async () => {
                const buffer = reader.result;
                let errorArray = [];

                workbook.xlsx.load(buffer).then((data) => {
                    const worksheet = data.worksheets[0];
                    let curContact = { ...utils.emptyContact };
                    worksheet._rows.forEach((row, rowNumber) => {
                        if (rowNumber >= 1) {
                            ++rowNumber;
                            for (let i = 1; i <= row.cellCount; i++) {
                                let cell = row.getCell(i);
                                let coulumnAddress = cell.address.split(rowNumber)[0];
                                switch (coulumnAddress) {
                                    case "A":
                                        curContact.firstName = cell.value;
                                        break;
                                    case "B":
                                        curContact.lastName = cell.value;
                                        break;
                                    case "C":
                                        curContact.dob = cell.value;
                                        break;
                                    case "D":
                                        curContact.country = cell.value;
                                        break;
                                    case "E":
                                        curContact.state = cell.value;
                                        break;
                                    case "F":

                                        curContact.emailId = cell.value ? cell.value.text ? cell.value.text : '' : "";
                                        break;
                                    case "G":
                                        curContact.phone = cell.value;
                                        break;
                                }
                            }
                            let errors = utils.validateFormAndReturnErrorMessageArray(curContact)
                            if (errors.length === 0) {
                                if (!utils.checkForUniqueValeInGrid('emailId', curContact.emailId, props.contacts, false))
                                    errors.push("Email already exists");

                                if (!utils.checkForUniqueValeInGrid('phone', curContact.phone, props.contacts, false))
                                    errors.push("phone already exists");

                                if (!utils.checkForUniqueValeInGrid('phone', curContact.phone, props.contacts, false))
                                    errors.push("phone already exists");

                                if (!utils.validateCountry(curContact.country, props.countries))
                                    errors.push("Enter valid country");

                                if (!utils.validateState(curContact.country, curContact.state, props.states))
                                    errors.push("Enter valid state");
                            }
                            let errorsString = errors.join(",");

                            if (errorsString === "") {
                                props.asyncOperationStart(ADD_CONTACTS, curContact);
                                props.asyncOperationStart(FETCH_CONTACTS);
                            }
                            errorArray.push(errors ? errors : "Y");
                        }


                    });
                    errorArray.unshift("Error")
                    worksheet.spliceColumns(8, 0, errorArray);
                    downloadFileFromworkBook(workbook)
                    props.fileUploaderInstace.removeFile(0);
                    notify("Please Check Dowmloaded file for upload status!", "success", 3000);
                })
            }

        } catch (e) {
            notify("Currupt file", "error", 3000);
        } finally {
            props.fileUploaderInstace.removeFile(0);
        }
    }
}

const handler = ({
    onDownloadSheetClick: props => (e) => {
        downloadSheet();
    },
    onsheetSelected: props => async (e) => {
        const file = e.value[0];
        if (file) {
            readFile(file, props);
        }
    },
    onFileUploaderInitialize: props => e => {
        props.setFileUploaderInstance(e.component);
    }
})
const enhance = compose(
    withState('contact', 'setcontact', utils.emptyContact),
    withState('fileUploaderInstace', 'setFileUploaderInstance', {}),
    connect(mapStateToProps, mapDispatchTopProps),
    withHandlers(handler),
)
export default enhance(UploadContactsPopup) as React.ComponentClass<any, any>