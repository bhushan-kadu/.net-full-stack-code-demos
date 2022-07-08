import React, { useEffect, useRef, useState } from 'react';
import { MdaeFormField } from '../../widgets/MdaeFormField';
import MdaeAutoComplete from '../../widgets/MdaeAutoComplete';
import MdaeDropDownBox from '../../widgets/MdaeDropDownBox';
import { MdaeTextBox } from '../../widgets/MdaeTextBox';
import { MdaeDatebox } from '../../widgets/MdaeDatebox';
import { MdaeButton } from '../../widgets/MdaeButton';
import MdaePopupBox from '../../widgets/MdaePopupBox';
import * as utils from '../../utils';
import { actions as asyncActions } from "async-ops";
import { FETCH_CONTACTS } from './Services/fetchContacts';
import { GET_STATES } from './Services/GetStates';
import { FETCH_COUNTRIES } from 'pages/countries_page/Services/fetchCountry';
import { useSelector } from 'react-redux';
type contact = {
    firstName: string,
    lastName: string,
    dob: Date | string,
    country: string,
    state: string
    phone: string
    emailId: string
}
type props = {
    popupState: any,
    onUpdate: (contact: contact) => void,
    onSubmit: (contact: contact) => void,
    onHiding: (e) => void,

}
export const AddContactPopup: React.FC<props> = (props) => {
    const popupState = { ...props.popupState };
    const mode = popupState.mode;
    const [contact, setContact] = useState({ ...utils.emptyContact })
    const states = useSelector((state: any) => state.contactReducer.states);
    const countryList = useSelector((state: any) => state.countryReducer.countryList);
    const asyncOperationStart = asyncActions.asyncOperationStart;

    const fetStatesFromCountry = (countryName) => {
        asyncOperationStart(GET_STATES, countryName);
    }

    const handleInpuchnage = (e) => {
        setContact({ ...contact, [e.component.option('name')]: e.component.option('value') })
    }
    const ddlCountry_change = (e) => {
        const countryName = e.component.option('value');
        setContact({ ...contact, ['country']: countryName })
        fetStatesFromCountry(countryName)
    }
    const pnlAddContact_shown = () => {
        if (contact['country']) {
            fetStatesFromCountry(contact['country'])
        }
    }

    useEffect(() => {
        popupState.contact.dob = popupState.contact.dob ? new Date(popupState.contact.dob) : '';
        setContact(popupState.contact)
        asyncOperationStart(FETCH_CONTACTS)
        asyncOperationStart(FETCH_COUNTRIES)
    }, [popupState])

    const onSubmitOrUpdate = () => {
        mode === "ADD" ? props.onSubmit(contact) : props.onUpdate(contact);
    }

    return (
        <MdaePopupBox id="pnlAddContact"
            popupState={popupState}
            title={popupState.mode === "ADD" ? "Add New Contact" : "Update Contact"}
            onHiding={props.onHiding}
            onShown={pnlAddContact_shown}
            width='400px'>
            <div className="addContactPanel">
                <MdaeFormField
                    label="First Name"
                    input={<MdaeTextBox
                        value={contact['firstName']}
                        onChange={handleInpuchnage}
                        maxLength="15"
                        name="firstName" />}
                    required
                />
                <MdaeFormField
                    label="Last Name"
                    input={<MdaeTextBox
                        maxLength="15"
                        value={contact['lastName']}
                        onChange={handleInpuchnage}
                        name="lastName" />}
                    required
                />
                <MdaeFormField
                    label="DOB of Birth"
                    input={<MdaeDatebox
                        max={utils.getDatePast18YearsFromToday()}
                        value={contact['dob']}
                        onChange={handleInpuchnage}
                        name="dob"
                    />}
                    required
                />
                <MdaeFormField
                    label="Country"
                    input={<MdaeAutoComplete
                        value={contact['country']}
                        dataSource={countryList}
                        onChange={handleInpuchnage}
                        onSelectionChanged={ddlCountry_change}
                        valueExpr="countryName"
                        name="country" />}
                    required
                />
                <MdaeFormField
                    label="State"
                    input={<MdaeDropDownBox
                        value={contact['state']}
                        dataSource={states}
                        onValueChanged={handleInpuchnage}
                        displayExpr="stateName"
                        valueExpr='stateName'
                        name="state" />}
                />
                <MdaeFormField
                    label="Email"
                    input={<MdaeTextBox
                        value={contact['emailId']}
                        onChange={handleInpuchnage}
                        name="emailId" />}
                    required
                />
                <MdaeFormField
                    label="Phone"
                    input={<MdaeTextBox
                        maxLength="10"
                        value={contact['phone']}
                        onChange={handleInpuchnage}
                        name="phone" />}
                    required
                />
                <div className="add-contact-button" >
                    {mode === 'ADD' ? <MdaeButton id="btnContactFormSubmit" text="Submit" onClick={onSubmitOrUpdate} /> :
                        <MdaeButton id="btnContactFormUpdate" text="Update" onClick={onSubmitOrUpdate} />}
                </div>
            </div>
        </MdaePopupBox>
    )
}