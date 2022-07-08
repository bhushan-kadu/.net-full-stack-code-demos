import { AddContactPopup } from "pages/ContactsPage/AddContactPopup/Component";
import { bindActionCreators, compose } from "redux";
import AddCountryPopup from "./Component";
import { actions as asyncActions } from "async-ops";
import { withHandlers, withState } from "recompose";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    states: state.contactReducer.states
})
const mapDispatchTopProps = dispatch =>
    bindActionCreators(
        {
            asyncOperationStart: asyncActions.asyncOperationStart
        },
        dispatch
    );

const handler = ({
    handleInpuchnage: props => (e) => {
        props.setCountry({ ...props.country, ['name']: e.component.option('value') })
    }
})
const enhance = compose(
    withState('country', 'setCountry', { name: '', id: 0 }),
    connect(mapStateToProps, mapDispatchTopProps),
    withHandlers(handler),
)

export default enhance(AddCountryPopup) as any;
