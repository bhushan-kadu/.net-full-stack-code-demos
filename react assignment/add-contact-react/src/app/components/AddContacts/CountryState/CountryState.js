import { React } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@material-ui/core";

const CountryState = props => {
    const countryList = ["Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "British Indian Ocean Territory",
        "Brunei",
        "Cambodia",
        "People's Republic of China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Cyprus",
        "Georgia",
        "Hong Kong",
        "India",
        "Indonesia"
    ]
    const menuItems = props.states.map((x, i) => <MenuItem value={x} key={i}>{x}</MenuItem>);

    const countryTouch = props.country.meta.touched
    const countryError = props.country.meta.error

    return <div>
        <Autocomplete
            {...props.country.input}
            {...props.custom}
            size="small"
            options={countryList}
            getOptionLabel={(option) => option}
            style={{
                marginBottom: "15px"
            }}
            name="country"

            onChange={(event, index, value) => {
                var countryInput = event.target.textContent;
                countryInput || props.setStates([])
                props.handleCountryChnage(countryInput)
            }}

            renderInput={(params) => <TextField
                {...params}
                label={props.label}
                variant="outlined"
                error={Boolean(countryTouch && countryError)}
                helperText={countryTouch && countryError}
            />}
        />

        <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel >State</InputLabel>
            <Select
                name="state"
                label="state"
                {...props.state.input}
                {...props.custom}
                labelId="demo-simple-t-outlined-label"
            >
                {menuItems.length > 0 && menuItems}
            </Select>
        </FormControl>
    </div>
}
export default CountryState;

