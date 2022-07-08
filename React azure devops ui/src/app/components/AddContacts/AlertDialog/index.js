import AlertDialog from "./AlertDialog";
import { compose } from "recompose";
import { connect } from "react-redux";
import { CLOSE_ALERT_DIALOG } from "../../../reducers/ContactReducer";
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
    setOpen: state.contactReducer.setOpenSuccessDlg
})
const closeAlertDialog = () => ({
    type: CLOSE_ALERT_DIALOG
})
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        closeAlertDialog,
    },
    dispatch
);
const enhance = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhance(AlertDialog)