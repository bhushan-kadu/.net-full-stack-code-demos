import React, { useEffect, useRef, useState } from 'react';
import { MdaeButton } from '../../widgets/MdaeButton';
import MdaeDataGrid from '../../widgets/MdaeDataGrid';
import { MdaeFormField } from '../../widgets/MdaeFormField';
import MdaeAutoComplete from '../../widgets/MdaeAutoComplete';
import notify from 'devextreme/ui/notify';
import * as utils from '../../utils';
import { MdaeConfirmPopup } from '../../widgets/MdaeConfirmPopup';
import { useDispatch } from 'react-redux';
import AddCountryPopup from './AddCountryPopup';
import { ADD_COUNTRY } from './Services/addCountry';
import { UPDATE_COUNTRY } from './Services/updateContact';
import { DELETE_COUNTRY } from './Services/deleteCountry';

export const CountriesPage = (props) => {
    const dispatch = useDispatch();
    const grid = useRef(null);
    const state = useRef(null)
    const filtersState = props.filtersState
    const [deletePoppOpen, setDeletePopupOpen] = useState(false);
    const [popupEditorState, setPopupEditorState] = useState({ visible: false, mode: 'ADD', country: '' })
    const onRowDblClick = (e) => {
        setPopupEditorState({ visible: true, mode: 'UPDATE', country: e.data })
    }
    const closeEditorPopup = () => {
        setPopupEditorState({ ...popupEditorState, visible: false })
    }
    const deleteCountry = () => {
        const selectedRows = grid.current.getSelectedRowKeys();
        props.asyncOperationStart(DELETE_COUNTRY, selectedRows)
        setDeletePopupOpen(false);
    }
    const deleteContentTemplate = () => {
        var keys = grid.current.getSelectedRowKeys();
        return 'You are deleting ' + keys.length + ' item/s. Are You Sure?'
    }
    const btnGridFetch_click = () => {
        const filterValue = [];
        if (filtersState.country) {
            filterValue.push(["name", "=", filtersState.country]);
        }
        if (filterValue.length) {
            grid.current.filter(filterValue)
        } else {
            grid.current.clearFilter();
        }
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
        setPopupEditorState({ visible: true, mode: 'ADD', country: '' })
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

    const addCountry = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = [];

        if (!data.name) {
            errorMessage.push("Country cannot be empty");
        }
        if (!utils.checkForUniqueValeInGrid("name", data.name, dataSource, false)) {
            errorMessage.push("Country already present");
        }
        if (errorMessage.length === 0) {
            let maxId = 0;
            dataSource.forEach(function (item) {
                if (item.id > maxId) maxId = item.id
            })
            data.id = ++maxId;
            props.asyncOperationStart(ADD_COUNTRY, data)
            closeEditorPopup()
            notify("Country Added successfully!", "success", 500);
        } else {
            notify(errorMessage[0], "error", 3000)
        }
    }

    const updateCountry = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = [];

        if (!data.name) {
            errorMessage.push("Country cannot be empty");
        }
        if (!utils.checkForUniqueValeInGrid("name", data.name, dataSource, data.id)) {
            errorMessage.push("Country already present");
        }
        if (errorMessage.length === 0) {
            props.asyncOperationStart(UPDATE_COUNTRY, data)
            closeEditorPopup()
            notify("Country Added successfully!", "success", 500);
        } else {
            notify(errorMessage[0], "error", 3000)
        }
    }


    return (
        <React.Fragment>
            <MdaeConfirmPopup
                contentTemplate={deleteContentTemplate}
                onYesClick={deleteCountry}
                visible={deletePoppOpen}
                close={setDeletePopupOpen} />

            <AddCountryPopup
                popupState={popupEditorState}
                onHiding={closeEditorPopup}
                onSubmit={addCountry}
                onUpdate={updateCountry}
            />

            <div className="pnlHeader">
                <div style={{ fontSize: "1.3em", color: "#00008b", fontWeight: "bold", flex: "1" }}>Countries List</div>
                <MdaeButton id="btnGridFetch" text="Fetch" onClick={btnGridFetch_click} />
                <MdaeButton id="btnGridDelete" text="Delete" onClick={btnGridDelete_click} />
                <MdaeButton id="btnGridAdd" text="Add" onClick={btnGridAdd_click} />
                <MdaeButton id="btnFilterClear" text="Clear" onClick={btnFilterClear_click} />
                <MdaeButton id="btnGridClose" text="Close" />
            </div>
            <div className="pnlFilters">
                <MdaeFormField
                    label="Country"
                    input={<MdaeAutoComplete
                        id="ddlCountry"
                        width='250px'
                        value={filtersState.country}
                        dataSource={props.countryList}
                        onChange={props.handleInpuchnage}
                        onSelectionChanged={props.handleInpuchnage}
                        name="country" />}
                />
            </div>
            <MdaeDataGrid
                ref={grid}
                dataSource={props.countryList}
                columns={['countryName']}
                onRowDblClick={onRowDblClick}
            />
        </React.Fragment>
    );
}