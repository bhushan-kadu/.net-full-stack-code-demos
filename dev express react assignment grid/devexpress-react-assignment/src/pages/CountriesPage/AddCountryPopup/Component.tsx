import * as React from 'react';
import MdaePopupBox from 'widgets/MdaePopupBox';
import { MdaeTextBox } from 'widgets/MdaeTextBox';
import { MdaeButton } from 'widgets/MdaeButton';
import { MdaeFormField } from 'widgets/MdaeFormField';
import { useEffect } from 'react';
const AddCountryPopup = (props) => {
    const onSubmitOrUpdate = () => {
        props.popupState.mode === "ADD" ? props.onSubmit(props.country) : props.onUpdate(props.country);
    }
    useEffect(() => {
        props.setCountry(props.popupState.country)

    }, [props.popupState])
    return (
        <MdaePopupBox
            popupState={props.popupState}
            width='400px'
            title={props.popupState.mode === 'ADD' ? "Add Country" : 'Update Country'}
            {...props}
        >
            <div className={'addPanel'}>
                <MdaeFormField
                    label="Country"
                    input={<MdaeTextBox
                        value={props.country.name}
                        onChange={props.handleInpuchnage}
                        name='country' />}
                />
                <div className="add-contact-button" >
                    {props.popupState.mode === 'ADD' ? <MdaeButton id="btnContactFormSubmit" text="Submit" onClick={onSubmitOrUpdate} /> :
                        <MdaeButton id="btnContactFormUpdate" text="Update" onClick={onSubmitOrUpdate} />}
                </div>
            </div>
        </MdaePopupBox>
    );
}

export default AddCountryPopup;





