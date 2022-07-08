import AddContact from "./AddContact";
import { compose, withHandlers, withState } from "recompose";
import { reduxForm, reset, initialize } from "redux-form";
import { ADD_CONTACT } from "./service/postContact";
import { bindActionCreators } from 'redux';
import { actions as asyncActions } from "async-ops";
import { connect } from "react-redux";

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isValidPhone = phone => {
    try {
        if (phone.length !== 10) {
            return false;
        } else {
            parseInt(phone);
            return true
        }
    } catch {
        return false
    }
}

const validate = values => {
    const errors = {};
    for (const name in values) {
        switch (name) {
            case "firstName":
            case "lastName":
                if (values[name].trim() === "") {
                    errors[name] = "This field cannot be empty"
                }
                else if (values[name].length > 15) {
                    errors[name] = "cannot accept more than 15 charecters"
                }
                break;

            case "dob":
                try {
                    let date = values[name]
                    if (typeof (date) === "string") {
                        date = new Date(date)
                    } else {
                        date = values[name].toDate()
                    }
                    let back18Yrs = new Date(new Date().getFullYear() - 18, 0)
                    if (date.getTime() > back18Yrs.getTime()) {
                        errors[name] = "Age should be 18 yrs"
                    }
                }
                catch {
                    errors[name] = "This field cannot be empty"
                }
                break;

            case "country":
                if (values[name] === "") {
                    errors[name] = "Country Cannot be Empty"
                }
                break;

            case "email":
                if (values[name].trim() === "" || !validateEmail(values[name])) {
                    errors[name] = "Enter a valid email"
                }
                break;

            case "phone":
                if (values[name].trim() === "" || !isValidPhone(values[name])) {
                    errors[name] = "Enter a valid phone"
                }
                break;
        }

    }
    return errors
}

let onSubmit = (values, _dispatch, props) => {

    const allNames = Object.keys(values);
    if (allNames.length >= 6) {
        if (values.firstName &&
            values.lastName &&
            values.dob &&
            values.country &&
            values.email &&
            values.phone) {
            console.log({
                ...values
            })
            props.asyncOperationStart(ADD_CONTACT,
                {
                    ...values,
                    countryId: 15,
                    stateId: 15,
                    emailId: values.email
                }
            );
        }
    } else {
        props.setOpenAlertDlg(true)
    }
}

const mapStateToProps = (state) => ({
    setOpen: state.contactReducer.setOpenSuccessDlg
})

const mapDispatchToProps = dispatch => bindActionCreators({
    asyncOperationStart: asyncActions.asyncOperationStart,
    initialize
}, dispatch)

const afterSubmit = (result, dispatch, props) => {
    if (props.setOpen === true) props.reset()
}
const form = {
    form: 'contactForm',
    validate,
    onSubmit,
    onSubmitSuccess: afterSubmit
}
const handlers = {
    required: props => value => (value || typeof value === 'number' ? undefined : 'Required')
}
const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers(handlers),
    reduxForm(form)
)

export default enhance(AddContact)
