import { React } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
const AlertDialog = props => {
    return (
        <Dialog
            open={props.setOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.header}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeAlertDialog} color="primary" autoFocus>
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog