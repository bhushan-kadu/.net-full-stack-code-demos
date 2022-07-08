import { React } from "react";
import { TextField } from '@material-ui/core'

const MyNewTextField = ({
    label,
    input,
    meta: { touched, error },
    ...custom
}) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            size="small"
            fullWidth
            error={Boolean(touched && error)}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )
}
export default MyNewTextField