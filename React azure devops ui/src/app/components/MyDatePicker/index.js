import { React } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

const MyDatePicker = ({

    label,
    meta: { error, touched },
    input: { onBlur, value, ...inputProps },
    maxDate,
    maxDateMessage,
    ...others

}) => {
    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                {...inputProps}
                {...others}
                autoOk
                fullWidth
                inputVariant="outlined"
                variant="inline"
                format="DD/MM/yyyy"
                size="small"
                id="date-picker-inline"
                label={label}
                margin="dense"
                value={value ? new Date(value) : null}
                error={touched && Boolean(error)}
                invalidDateMessage={error}
                maxDateMessage={maxDateMessage}
                maxDate={maxDate}
                onChange={onChange}
                onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
            />
        </MuiPickersUtilsProvider>
    )
}
export default MyDatePicker