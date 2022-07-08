import { AddContactPopup } from "./Component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as asyncActions } from "async-ops";
import { compose, withHandlers, withState } from "recompose";
import { GET_STATES } from "../Services/GetStatesFromCountry";
import * as utils from '../../../utils';
import React, { ComponentClass } from "react";

const mapDispatchTopProps = dispatch =>
    bindActionCreators(
        {
            asyncOperationStart: asyncActions.asyncOperationStart
        },
        dispatch
    );

const mapStateToProps = state => ({
    states: state.contactReducer.states,
    countryList: state.countryReducer.countryList,
})
const fetStatesFromCountry = (props, countryName) => {
    props.asyncOperationStart(GET_STATES, countryName);
}
const handler = ({

    handleCountryChange: props => (e) => {
        const countryName = e.component.option('value');
        props.setcontact({ ...props.contact, ['country']: countryName })
        fetStatesFromCountry(props, countryName)
    },

    pnlAddContact_shown: props => () => {
        if (props.contact['country']) {
            fetStatesFromCountry(props, props.contact['country'])
        }
    },
    handleInpuchnage: props => (e) => {
        props.setcontact({ ...props.contact, [e.component.option('name')]: e.component.option('value') })
    }
})
const enhance = compose(
    withState('contact', 'setcontact', utils.emptyContact),
    connect(mapStateToProps, mapDispatchTopProps),
    withHandlers(handler),
)
export default enhance(AddContactPopup) as React.ComponentClass<any, any>