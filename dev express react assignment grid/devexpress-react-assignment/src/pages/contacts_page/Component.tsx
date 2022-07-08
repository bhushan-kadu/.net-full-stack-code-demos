import React, { useEffect, useRef, useState } from 'react';
import { MdaeButton } from '../../widgets/MdaeButton';
import MdaeDataGrid from '../../widgets/MdaeDataGrid';
import { MdaeFormField } from '../../widgets/MdaeFormField';
import { AddContactPopup } from './AddContactPopup';
import UploadContactsPopup from './upload_contacts_popup';
import { MdaeDatebox } from '../../widgets/MdaeDatebox';
import MdaeAutoComplete from '../../widgets/MdaeAutoComplete';
import MdaeDropDownBox from '../../widgets/MdaeDropDownBox';
import notify from 'devextreme/ui/notify';
import * as utils from '../../utils';
import { MdaeConfirmPopup } from '../../widgets/MdaeConfirmPopup';
import { useDispatch } from 'react-redux';
import { ADD_CONTACTS } from "./Services/addContact";
import { UPDATE_CONTACTS } from './Services/updateContact';
import { DELETE_CONTACTS } from './Services/deleteContact';
import { FETCH_CONTACTS } from './Services/fetchContacts';
import MdaeLoader from 'widgets/MdaeLoader';
interface contact {
    firstName: string
    lastName: string
    dob: Date
    country: string
    state: string
    phone: string
    emailId: string
}
interface filtersState {
    fromDate: Date
    toDate: Date
    contactFullName: string
    country: string
    state: string
}
interface IContactsPage {
    contactList: contact[]
    states: string[]
    countryList: string[]
    isLoading: boolean
    filtersState: filtersState
    setFilterState: (filtersState) => void
    handleInpuchnage: () => void
    ddlCountry_change: () => void
    asyncOperationStart: (string, any?) => void
}

export const ContactsPage: React.FC<IContactsPage> = (props) => {
    const dispatch = useDispatch();
    const grid = useRef(null);
    const state = useRef(null)
    const filtersState = props.filtersState

    const btnGridFetch_click = () => {
        let errorMessage = [];

        if (!filtersState.fromDate) {
            errorMessage.push("Please enter proper from date");
        }
        if (!filtersState.toDate) {
            errorMessage.push("Please enter proper to date");
        }
        if (!((filtersState.fromDate && filtersState.fromDate.getTime()) < (filtersState.toDate && filtersState.toDate.getTime()))) {
            errorMessage.push("From date should be less than to date");
        }
        if (errorMessage.length) {
            notify(errorMessage[0], "error", 3000)
            return;
        }
        const filterValue = [];
        if (filtersState.fromDate) {
            filterValue.push(['dob', '>=', filtersState.fromDate])
        }
        if (filtersState.toDate) {
            filterValue.push(['dob', '<=', filtersState.toDate])
        }
        if (filtersState.contactFullName) {
            var fullName = filtersState.contactFullName.split(" ");
            let firstName = fullName[0];
            let lastName = fullName[1];
            filterValue.push(["firstName", "=", firstName]);
            filterValue.push(["lastName", "=", lastName]);
        }
        if (filtersState.country) {
            filterValue.push(["country", "=", filtersState.country]);
        }

        if (filtersState.state) {
            filterValue.push(["state", "=", filtersState.state]);
        }
        grid.current.filter(filterValue)
    }
    const [deletePoppOpen, setDeletePopupOpen] = useState(false);

    const deleteContentTemplate = () => {
        var keys = grid.current.getSelectedRowKeys();
        return 'You are deleting ' + keys.length + ' item/s. Are You Sure?'
    }
    const deleteRow = () => {
        const selectedRows = grid.current.getSelectedRowKeys();
        props.asyncOperationStart(DELETE_CONTACTS, selectedRows)
        setDeletePopupOpen(false);
        props.asyncOperationStart(FETCH_CONTACTS)
    }
    const btnGridDelete_click = (e) => {
        var keys = grid.current.getSelectedRowKeys();
        if (keys.length > 0) {
            setDeletePopupOpen(true);
        } else {
            notify("Please Select at least one record", "error", 3000)
        }
    }
    const btnGridAdd_click = () => {
        setPopupEditorState({ visible: true, mode: 'ADD', contact: utils.emptyContact })
    }
    const btnFilterClear_click = () => {
        grid.current.clearFilter();
        props.setFilterState({
            fromDate: utils.getDatePast28YearsFromToday(),
            toDate: utils.getDatePast18YearsFromToday(),
            contactFullName: null,
            country: null,
            state: null
        });

    }

    const [popupEditorState, setPopupEditorState] = useState({ visible: false, mode: 'ADD', contact: utils.emptyContact })
    const onRowDblClick = (e) => {
        setPopupEditorState({ visible: true, mode: 'UPDATE', contact: e.data })
    }
    const closeEditorPopup = () => {
        setPopupEditorState({ ...popupEditorState, visible: false })
    }
    const addContact = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = utils.validateFormAndReturnErrorMessageArray(data);
        if (errorMessage.length === 0) {

            if (!utils.checkForUniqueValeInGrid("emailId", data.emailId, dataSource, false)) {
                errorMessage.push("Email already present");
            }
            if (!utils.checkForUniqueValeInGrid("phone", data.phone.toString(), dataSource, false)) {
                errorMessage.push("Phone already present");
            }
            if (errorMessage.length === 0) {
                let maxId = 0;
                dataSource.forEach(function (item) {
                    if (item.id > maxId) maxId = item.id
                })
                data.id = ++maxId;
                props.asyncOperationStart(ADD_CONTACTS, data)
                closeEditorPopup()
                notify("Contact Added successfully!", "success", 500);
                props.asyncOperationStart(FETCH_CONTACTS, data)
            } else {
                notify(errorMessage[0], "error", 3000)
            }

        } else {
            if (errorMessage.length > 2) {
                notify("Please Enter All form fields", "error", 3000)
            } else {
                notify(errorMessage[0], "error", 3000)
            }
            errorMessage = [];
        }

    }
    const updateContact = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = utils.validateFormAndReturnErrorMessageArray(data);
        if (errorMessage.length === 0) {

            if (!utils.checkForUniqueValeInGrid("emailId", data.emailId, dataSource, data.id)) {
                errorMessage.push("Email already present");
            }
            if (!utils.checkForUniqueValeInGrid("phone", data.phone.toString(), dataSource, data.id)) {
                errorMessage.push("Phone already present");
            }
            if (errorMessage.length === 0) {
                data.countryId = 0;
                data.stateId = 0;
                props.asyncOperationStart(UPDATE_CONTACTS, data)
                closeEditorPopup()
                notify("Contact updated successfully!", "success", 500);
                props.asyncOperationStart(FETCH_CONTACTS, data)
            } else {
                notify(errorMessage[0], "error", 3000)
            }

        } else {
            if (errorMessage.length > 2) {
                notify("Please Enter All form fields", "error", 3000)
            } else {
                notify(errorMessage[0], "error", 3000)
            }
            errorMessage = [];
        }
    }
    const fullName = useRef(null);
    let fullNameArray = [];
    const readFullNamesFromGrid = (data) => {
        var gridInstance = data || grid.current.instance();
        var data = data || gridInstance.option('dataSource');
        fullNameArray = data.map(x => x.firstName + " " + x.lastName);
        return fullNameArray = utils.selectDistinct(fullNameArray);
    }
    readFullNamesFromGrid(props.contactList);
    useEffect(() => {
        fullName.current.dataSource(readFullNamesFromGrid(false));
    }, [props.contactList])
    const [uploadPopupState, setUploadPopupState] = useState({ visible: false })
    const btnUpload_click = () => {
        setUploadPopupState({ ...uploadPopupState, visible: true })
    }
    const closeUploadContactPopup = () => {
        setUploadPopupState({ ...uploadPopupState, visible: false })
    }
    return (
        <React.Fragment>

            <MdaeLoader isLoading={props.isLoading} />
            <MdaeConfirmPopup
                contentTemplate={deleteContentTemplate}
                onYesClick={deleteRow}
                visible={deletePoppOpen}
                close={setDeletePopupOpen} />
            <AddContactPopup
                onHiding={closeEditorPopup}
                popupState={popupEditorState}
                onSubmit={addContact}
                onUpdate={updateContact} />
            <UploadContactsPopup
                onHiding={closeUploadContactPopup}
                popupState={uploadPopupState}
            />

            <div className="pnlHeader">
                <div style={{ fontSize: "1.3em", color: "#00008b", fontWeight: "bold", flex: "1" }}>Contact List</div>
                <MdaeButton id="btnGridFetch" text="Fetch" onClick={btnGridFetch_click} />
                <MdaeButton id="btnGridDelete" text="Delete" onClick={btnGridDelete_click} />
                <MdaeButton id="btnGridAdd" text="Add" onClick={btnGridAdd_click} />
                <MdaeButton id="btnFilterClear" text="Clear" onClick={btnFilterClear_click} />
                <MdaeButton id="btnUpload" text="Upload" onClick={btnUpload_click} />
                <MdaeButton id="btnGridClose" text="Close" />
            </div>
            <div className="pnlFilters">
                <MdaeFormField
                    label="dob From Date"
                    input={<MdaeDatebox
                        max={utils.getDatePast18YearsFromToday()}
                        value={filtersState['fromDate']}
                        onChange={props.handleInpuchnage}
                        name="fromDate"
                    />}
                    required
                />
                <MdaeFormField
                    label="dob To Date"
                    input={<MdaeDatebox
                        max={utils.getDatePast18YearsFromToday()}
                        value={filtersState['toDate']}
                        onChange={props.handleInpuchnage}
                        name="toDate" />}
                    required
                />
                <MdaeFormField
                    label="Contact Name"
                    input={<MdaeAutoComplete
                        ref={fullName}
                        value={filtersState['contactFullName']}
                        onChange={props.handleInpuchnage}
                        onSelectionChanged={props.handleInpuchnage}
                        dataSource={fullNameArray}
                        name="contactFullName" />}
                />
                <MdaeFormField
                    label="Country"
                    input={<MdaeAutoComplete
                        id="ddlCountry"
                        value={filtersState['country']}
                        dataSource={props.countryList}
                        onChange={props.handleInpuchnage}
                        onSelectionChanged={props.ddlCountry_change}
                        valueExpr="countryName"
                        name="country" />}
                />
                <MdaeFormField
                    label="State"
                    input={<MdaeDropDownBox
                        ref={state}
                        dataSource={props.states}
                        value={filtersState['state']}
                        displayExpr="stateName"
                        valueExpr='stateName'
                        onValueChanged={props.handleInpuchnage}
                        name="state" />}
                />
            </div>
            <MdaeDataGrid
                ref={grid}
                dataSource={props.contactList}
                onRowDblClick={onRowDblClick}
                columns={[
                    "firstName",
                    "lastName",
                    {
                        dataField: "dob",
                        dataType: 'date',
                    },
                    "country",
                    "state",
                    "emailId",
                    "phone",
                ]}
            />
        </React.Fragment>
    );
}