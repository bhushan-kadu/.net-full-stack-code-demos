import { React } from "react";
import CountryState from "./CountryState";
import { Required } from "./Required/Required";
import AlertDialog from "./AlertDialog";
import {
    Button,
    Container,
    makeStyles,
} from "@material-ui/core";
import { Field, Fields } from "redux-form";
import MyNewTextField from "../MyTextField";
import MyDatePicker from "../MyDatePicker";

const useStyles = makeStyles((theme) => ({
    formField: {
        marginBottom: theme.spacing(2)
    },
    root: {
        display: "flex",
        flexDirection: "column",
        width: 350,
        border: "1px solid #3f51b5",
        borderRadius: 4,
        padding: "15px",
        margin: 10,
    },
    container: {
        height: window.innerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonStyles: {
        alignSelf: "center"
    }
}))

const AddContact = props => {
    const classess = useStyles();
    const ContactForm = <form className={classess.root} onSubmit={props.handleSubmit} >

        <div className={classess.formField}>
            <Field
                label={<Required name="First Name" />}
                component={MyNewTextField}
                className={classess.smallText}
                name="firstName"
                validate={props.required}
            />
        </div>

        <div className={classess.formField}>
            <Field
                label={<Required name="Last Name" />}
                component={MyNewTextField}
                className={classess.smallText}
                name="lastName"
                validate={props.required}
            />
        </div>

        <div className={classess.formField}>
            <Field
                label={<Required name="Date of birth" />}
                component={MyDatePicker}
                className={classess.smallText}
                maxDate={new Date(new Date().getFullYear() - 18, 0)}
                maxDateMessage="Age must be 18 years"
                name="dob"
                validate={props.required}
            />
        </div>

        <div className={classess.formField}>
            <Fields
                names={['state', 'country']}
                label={<Required name="Country" />}
                component={CountryState}
                className={classess.smallText}
                validate={props.required}
            />
        </div>

        <div className={classess.formField}>
            <Field
                label={<Required name="Email Id" />}
                component={MyNewTextField}
                className={classess.smallText}
                name="email"
                validate={props.required}
            />
        </div>

        <div className={classess.formField}>
            <Field
                label={<Required name="Phone" />}
                component={MyNewTextField}
                className={classess.smallText}
                name="phone"
                type="number"
                validate={props.required}
            />
        </div>

        <Button variant="contained"
            color="primary"
            className={classess.buttonStyles}
            type="submit">
            Add Contact
            </Button>

        <AlertDialog
            open={props.openSuccessDlg}
            handleClose={props.setOpenSuccessDlg}
            alertType="SUCCESS"
            body="Contact Added Succesfully."
            header="Success!" />
    </form >

    return (
        <Container maxWidth="sm" className={classess.container}>
            {ContactForm}
        </Container>
    )
}
export default AddContact 