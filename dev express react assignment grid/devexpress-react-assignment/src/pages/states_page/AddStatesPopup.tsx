import * as React from 'react';
import MdaePopupBox from 'widgets/MdaePopupBox';
import { MdaeTextBox } from 'widgets/MdaeTextBox';
import { MdaeButton } from 'widgets/MdaeButton';
import { MdaeFormField } from 'widgets/MdaeFormField';
import { useEffect } from 'react';
import MdaeAutoComplete from 'widgets/MdaeAutoComplete';
import { useSelector } from 'react-redux';
import { actions as asyncActions } from "async-ops";

const AddStatePopup = (props) => {
    const onSubmitOrUpdate = () => {
        props.popupState.mode === "ADD" ? props.onSubmit(state) : props.onUpdate(state);
    }
    const countryList = useSelector((state: any) => state.countryReducer.countryList);
    const handleInpuchnage = (e) => {
        setState({ ...state, [e.component.option('name')]: e.component.option('value') })
    }
    const handleCountrySelect = (e) => {
        if (e.component.option('selectedItem'))
            setState({ ...state, ['countryName']: e.component.option('value'), ['countryId']: e.component.option('selectedItem').countryId })
        else {
            setState({ ...state, [e.component.option('name')]: e.component.option('value'), ['countryId']: 0 })
        }
    }
    const [state, setState] = React.useState({ countryName: '', stateName: '', stateCapital: '', countryId: 0, stateId: 0 });

    useEffect(() => {
        setState(props.popupState.state)

    }, [props.popupState])
    return (
        <MdaePopupBox
            popupState={props.popupState}
            width='400px'
            title={props.popupState.mode === 'ADD' ? "Add State" : 'Update State'}
            {...props}
        >
            <div className={'addPanel'}>
                <MdaeFormField
                    label="Country"
                    input={<MdaeAutoComplete
                        value={state.countryName}
                        onChange={handleInpuchnage}
                        onSelectionChanged={handleCountrySelect}
                        dataSource={countryList}
                        valueExpr="countryName"
                        name='countryName' />}
                />
                <MdaeFormField
                    label="State"
                    input={<MdaeTextBox
                        value={state.stateName}
                        onChange={handleInpuchnage}
                        name='stateName' />}
                />
                <MdaeFormField
                    label="State Capital"
                    input={<MdaeTextBox
                        value={state.stateCapital}
                        onChange={handleInpuchnage}
                        name='stateCapital' />}
                />
                <div className="add-contact-button" >
                    {props.popupState.mode === 'ADD' ? <MdaeButton id="btnContactFormSubmit" text="Submit" onClick={onSubmitOrUpdate} /> :
                        <MdaeButton id="btnContactFormUpdate" text="Update" onClick={onSubmitOrUpdate} />}
                </div>
            </div>
        </MdaePopupBox>
    );
}

export default AddStatePopup;





