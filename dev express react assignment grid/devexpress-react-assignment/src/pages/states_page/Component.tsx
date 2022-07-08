import React, { useEffect, useRef, useState } from 'react';
import { MdaeButton } from '../../widgets/MdaeButton';
import MdaeDataGrid from '../../widgets/MdaeDataGrid';
import { MdaeFormField } from '../../widgets/MdaeFormField';
import MdaeAutoComplete from '../../widgets/MdaeAutoComplete';
import notify from 'devextreme/ui/notify';
import * as utils from '../../utils';
import { MdaeConfirmPopup } from '../../widgets/MdaeConfirmPopup';
import { useDispatch } from 'react-redux';
import AddStatePopup from './AddStatesPopup';
import { ADD_STATE } from './Services/addState';
import { UPDATE_STATES } from './Services/updateState';
import { DELETE_STATE } from './Services/deleteState';
import { FETCH_STATES } from './Services/fetchStates';
import MdaeLoader from 'widgets/MdaeLoader';

interface filtersState { state: string }

interface IStatesPage {
    stateList: string[],
    isLoading: boolean
    filtersState: filtersState,
    setFilterState: (filtersState) => void
    handleInpuchnage: () => void,
    asyncOperationStart: (string, any?) => void,
}
export const StatesPage: React.FC<IStatesPage> = (props) => {
    const grid = useRef(null);
    const filtersState = props.filtersState
    const [deletePoppOpen, setDeletePopupOpen] = useState(false);
    const [popupEditorState, setPopupEditorState] = useState({ visible: false, mode: 'ADD', state: { countryName: '', stateName: '', stateCapital: '', countryId: 0, stateId: 0 } })
    const onRowDblClick = (e) => {
        setPopupEditorState({ visible: true, mode: 'UPDATE', state: e.data })
    }
    const closeEditorPopup = () => {
        setPopupEditorState({ ...popupEditorState, visible: false })
    }
    const deleteCountry = () => {
        const selectedRows = grid.current.getSelectedRowKeys();
        props.asyncOperationStart(DELETE_STATE, selectedRows)
        setDeletePopupOpen(false);
        props.asyncOperationStart(FETCH_STATES)
        notify("states deleted successfully!", "success", 500);
    }
    const deleteContentTemplate = () => {
        var keys = grid.current.getSelectedRowKeys();
        return 'You are deleting ' + keys.length + ' item/s. Are You Sure?'
    }
    const btnGridFetch_click = () => {
        const filterValue = [];
        if (filtersState.state) {
            filterValue.push(["stateName", "=", filtersState.state]);
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
        setPopupEditorState({ visible: true, mode: 'ADD', state: { countryName: '', stateName: '', stateCapital: '', countryId: 0, stateId: 0 } })
    }
    const btnFilterClear_click = () => {
        grid.current.clearFilter();
        props.setFilterState({
            state: null
        });

    }

    const addCountry = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = [];
        if (!data.countryName) {
            errorMessage.push("Country cannot be empty");
        }
        if (!data.countryId) {
            errorMessage.push("Please select porper Country");
        }
        if (!data.stateName) {
            errorMessage.push("state cannot be empty");
        }
        if (!utils.checkForUniqueValeInGrid("stateName", data.name, dataSource, false)) {
            errorMessage.push("state already present");
        }
        if (errorMessage.length === 0) {
            let maxId = 0;
            dataSource.forEach(function (item) {
                if (item.id > maxId) maxId = item.id
            })
            data.id = ++maxId;
            props.asyncOperationStart(ADD_STATE, data)
            closeEditorPopup()
            notify("state Added successfully!", "success", 500);
            props.asyncOperationStart(FETCH_STATES, data)
        } else {
            notify(errorMessage[0], "error", 3000)
        }
    }

    const updateState = (data) => {
        const gridInstance = grid.current.instance();
        const dataSource = gridInstance.option('dataSource');
        let errorMessage = [];

        if (!data.countryName) {
            errorMessage.push("Country cannot be empty");
        }
        if (!data.countryId) {
            errorMessage.push("Please select porper Country");
        }
        if (!data.stateName) {
            errorMessage.push("state cannot be empty");
        }

        if (!utils.checkForUniqueValeInGrid("stateName", data.stateName, dataSource, data.stateId)) {
            errorMessage.push("state already present");
        }
        if (errorMessage.length === 0) {
            props.asyncOperationStart(UPDATE_STATES, data)
            closeEditorPopup()
            props.asyncOperationStart(FETCH_STATES, data)
            notify("state Added successfully!", "success", 500);
        } else {
            notify(errorMessage[0], "error", 3000)
        }
    }


    return (
        <React.Fragment>
            <MdaeLoader isLoading={props.isLoading} />
            <MdaeConfirmPopup
                contentTemplate={deleteContentTemplate}
                onYesClick={deleteCountry}
                visible={deletePoppOpen}
                close={setDeletePopupOpen} />

            <AddStatePopup
                popupState={popupEditorState}
                onHiding={closeEditorPopup}
                onSubmit={addCountry}
                onUpdate={updateState}
            />

            <div className="pnlHeader">
                <div style={{ fontSize: "1.3em", color: "#00008b", fontWeight: "bold", flex: "1" }}>States List</div>
                <MdaeButton id="btnGridFetch" text="Fetch" onClick={btnGridFetch_click} />
                <MdaeButton id="btnGridDelete" text="Delete" onClick={btnGridDelete_click} />
                <MdaeButton id="btnGridAdd" text="Add" onClick={btnGridAdd_click} />
                <MdaeButton id="btnFilterClear" text="Clear" onClick={btnFilterClear_click} />
                <MdaeButton id="btnGridClose" text="Close" />
            </div>
            <div className="pnlFilters">
                <MdaeFormField
                    label="State"
                    input={<MdaeAutoComplete
                        id="ddlCountry"
                        width='250px'
                        value={filtersState.state}
                        dataSource={props.stateList}
                        onChange={props.handleInpuchnage}
                        onSelectionChanged={props.handleInpuchnage}
                        displayExpr="stateName"
                        valueExpr='stateName'
                        name="state" />}
                />
            </div>
            <MdaeDataGrid
                ref={grid}
                dataSource={props.stateList}
                columns={['stateName', 'stateCapital', 'countryName']}
                onRowDblClick={onRowDblClick}
            />
        </React.Fragment>
    );
}