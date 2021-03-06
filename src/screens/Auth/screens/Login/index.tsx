import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, OwnProps, StateProps } from './LoginScreen';
import Login from './LoginScreen';
import { StoreState } from 'src/store/reducers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapStateToProps(state: StoreState, ownProps: OwnProps): StateProps {
    return {
        inProgress: state.auth.inProgress
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
    return {};
}

const LoginScreen = connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginScreen;
