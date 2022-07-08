import { bindActionCreators, compose } from "redux";
import { StatesPage } from "./Component";
import { actions as asyncActions } from "async-ops";
import { FETCH_STATES } from "./Services/fetchStates";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import lifecycle from "recompose/lifecycle";
import { withState } from "recompose";
import { withRouter } from "react-router-dom";


const mapStateToProps = state => ({
    stateList: state.stateReducer.stateList,
    isLoading: state.stateReducer.isLoading,
})

const mapDispatchTopProps = dispatch => bindActionCreators({
    asyncOperationStart: asyncActions.asyncOperationStart
}, dispatch);



const handlers = {
    handleInpuchnage: props => e => {
        const component = e.component;
        if (component.option('isValid')) {
            props.setFilterState({ ...props.filtersState, [e.component.option('name')]: e.component.option('value') })
        } else {
            props.setFilterState({ ...props.filtersState, [e.component.option('name')]: '' })
        }

    }
}
const lifecycleMethods = {
    componentDidMount() {
        this.props.asyncOperationStart(FETCH_STATES)
    }
}
const enhance = compose(
    withRouter,
    withState('filtersState', 'setFilterState', { state: '' }),
    connect(mapStateToProps, mapDispatchTopProps),
    withHandlers(handlers),
    lifecycle(lifecycleMethods)
)
export default enhance(StatesPage);