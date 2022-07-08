import CountryState from "./CountryState";
import { compose, withHandlers, withState } from "recompose";
import $ from 'jquery';


const handlers = {
    handleCountryChnage: props => countryName => {

        $.get("statesList.json").done(function (data, status) {

            let statesIndex = data.countries.findIndex((item) => {
                return item.country === countryName;
            })
            let statesArray = [];
            if (statesIndex !== -1) {
                statesArray = data.countries[statesIndex];
                props.setStates(statesArray.states)
            }
        });
    }
}
const enhance = compose(
    withState("states", "setStates", []),
    withHandlers(handlers)
)

export default enhance(CountryState)
