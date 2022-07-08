import { bindActionCreators, compose } from "redux";
import { ContactsPage } from "./Component";
import { actions as asyncActions } from "async-ops";
import { FETCH_CONTACTS } from "./Services/getContacts";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import lifecycle from "recompose/lifecycle";
import { withState } from "recompose";
import * as utils from "utils";
import { GET_STATES } from "./Services/GetStatesFromCountry";
import { withRouter } from "react-router-dom";
import { FETCH_COUNTRIES } from "pages/CountriesPage/Services/getCountry";


const mapStateToProps = state => ({
    contactList: state.contactReducer.contactList,
    states: state.contactReducer.states,
    countryList: state.countryReducer.countryList,
})

const mapDispatchTopProps = dispatch => bindActionCreators({
    asyncOperationStart: asyncActions.asyncOperationStart
}, dispatch);

const fetStatesFromCountry = (props, countryName) => {

    props.asyncOperationStart(GET_STATES);
}

const handlers = {
    handleFetch: props => event => {
        props.asyncOperationStart(FETCH_CONTACTS)
    },
    handleInpuchnage: props => e => {
        const component = e.component;
        if (component.option('isValid')) {
            props.setFilterState({ ...props.filtersState, [e.component.option('name')]: e.component.option('value') })
        } else {
            props.setFilterState({ ...props.filtersState, [e.component.option('name')]: '' })
        }

    },
    ddlCountry_change: props => e => {
        const countryName = e.component.option('value');
        props.setFilterState({ ...props.filtersState, ['country']: countryName })
        fetStatesFromCountry(props, countryName)
    }
}
const lifecycleEvents = ({
    componentDidMount() {
        this.props.asyncOperationStart(FETCH_CONTACTS)
        this.props.asyncOperationStart(FETCH_COUNTRIES)
    }
})

const enhance = compose(
    withRouter,
    withState('filtersState', 'setFilterState', {
        fromDate: utils.getDatePast28YearsFromToday(),
        toDate: utils.getDatePast18YearsFromToday(),
        contactFullName: null,
        country: null,
        state: null
    }),
    withState('states', 'setStates', []),
    connect(mapStateToProps, mapDispatchTopProps),
    withHandlers(handlers),
    lifecycle(lifecycleEvents)
)
export default enhance(ContactsPage);