import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, OwnProps, StateProps } from './CompleteScreen';
import Complete from './CompleteScreen';
import { StoreState } from 'src/store/reducers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapStateToProps(state: StoreState, ownProps: OwnProps): StateProps {
    return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
    return {};
}

const CompleteScreen = connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps,
)(Complete);

export default CompleteScreen;
