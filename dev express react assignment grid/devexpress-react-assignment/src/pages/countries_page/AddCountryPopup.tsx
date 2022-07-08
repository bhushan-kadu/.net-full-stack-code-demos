import * as React from 'react';
import MdaePopupBox from 'widgets/MdaePopupBox';
import { MdaeTextBox } from 'widgets/MdaeTextBox';
import { MdaeButton } from 'widgets/MdaeButton';
import { MdaeFormField } from 'widgets/MdaeFormField';
import { useEffect } from 'react';
export const AddCountryPopup = (props) => {
    const onSubmitOrUpdate = () => {
        props.popupState.mode === "ADD" ? props.onSubmit(country) : props.onUpdate(country);
    }
    const handleInpuchnage = (e) => {
        setCountry({ ...country, [e.component.option('name')]: e.component.option('value') })
    }
    const [country, setCountry] = React.useState({ countryName: '', countryId: 0, countryCode: '', stdCode: '' });

    useEffect(() => {
        setCountry(props.popupState.country)

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
                        value={country.countryName}
                        onChange={handleInpuchnage}
                        name='countryName' />}
                />
                <MdaeFormField
                    label="Country Code"
                    input={<MdaeTextBox
                        value={country.countryCode}
                        onChange={handleInpuchnage}
                        name='countryCode' />}
                />
                <MdaeFormField
                    label="STD Code"
                    input={<MdaeTextBox
                        value={country.stdCode}
                        onChange={handleInpuchnage}
                        name='stdCode' />}
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





