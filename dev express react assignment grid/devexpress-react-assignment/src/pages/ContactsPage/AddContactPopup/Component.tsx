import React, { useEffect, useRef, useState } from 'react';
import { MdaeFormField } from '../../../widgets/MdaeFormField';
import MdaeAutoComplete from '../../../widgets/MdaeAutoComplete';
import MdaeDropDownBox from '../../../widgets/MdaeDropDownBox';
import { MdaeTextBox } from '../../../widgets/MdaeTextBox';
import { MdaeDatebox } from '../../../widgets/MdaeDatebox';
import { MdaeButton } from '../../../widgets/MdaeButton';
import MdaePopupBox from '../../../widgets/MdaePopupBox';
import * as utils from '../../../utils';
import { contactsData } from 'contactsData';

export const AddContactPopup = (props) => {
    const popupState = { ...props.popupState };
    const mode = popupState.mode;

    useEffect(() => {
        popupState.contact.dob = popupState.contact.dob ? new Date(popupState.contact.dob) : '';
        props.setcontact(popupState.contact)

    }, [props.popupState])

    const onSubmitOrUpdate = () => {
        mode === "ADD" ? props.onSubmit(props.contact) : props.onUpdate(props.contact);
    }

    return (
        <MdaePopupBox id="pnlAddContact"
            popupState={popupState}
            title={popupState.mode === "ADD" ? "Add New Contact" : "Update Contact"}
            onHiding={props.onHiding}
            onShown={props.pnlAddContact_shown}
            width='400px'>
            <div className="addContactPanel">
                <MdaeFormField
                    label="First Name"
                    input={<MdaeTextBox
                        value={props.contact['firstName']}
                        onChange={props.handleInpuchnage}
                        maxLength="15"
                        name="firstName" />}
                    required
                />
                <MdaeFormField
                    label="Last Name"
                    input={<MdaeTextBox
                        maxLength="15"
                        value={props.contact['lastName']}
                        onChange={props.handleInpuchnage}
                        name="lastName" />}
                    required
                />
                <MdaeFormField
                    label="DOB of Birth"
                    input={<MdaeDatebox
                        max={utils.getDatePast18YearsFromToday()}
                        value={props.contact['dob']}
                        onChange={props.handleInpuchnage}
                        name="dob"
                    />}
                    required
                />
                <MdaeFormField
                    label="Country"
                    input={<MdaeAutoComplete
                        value={props.contact['country']}
                        dataSource={props.countryList}
                        onChange={props.handleInpuchnage}
                        onSelectionChanged={props.handleCountryChange}
                        valueExpr="countryName"
                        name="country" />}
                    required
                />
                <MdaeFormField
                    label="State"
                    input={<MdaeDropDownBox
                        value={props.contact['state']}
                        dataSource={props.states}
                        onValueChanged={props.handleInpuchnage}
                        displayExpr="stateName"
                        valueExpr='stateName'
                        name="state" />}
                />
                <MdaeFormField
                    label="Email"
                    input={<MdaeTextBox
                        value={props.contact['emailId']}
                        onChange={props.handleInpuchnage}
                        name="emailId" />}
                    required
                />
                <MdaeFormField
                    label="Phone"
                    input={<MdaeTextBox
                        maxLength="10"
                        value={props.contact['phone']}
                        onChange={props.handleInpuchnage}
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