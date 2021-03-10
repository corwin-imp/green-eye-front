import React from 'react';
import styles from './assets/login-screen.module.scss';
import LoginForm from './components/LoginForm';
import classNames from 'classnames';
import Loader from 'src/components/Loader';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateProps {
    inProgress: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DispatchProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

class LoginScreen extends React.Component<Props> {

    render() {
        if (this.props.inProgress) {
            return <Loader />;
        }
        return (
            <div className={classNames(styles.loginWrapper)}>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-3')}></div>
                        <div className={classNames('col-lg-6')}>
                            <div className={classNames(styles.authContent)}>
                                <h2 className={classNames(styles.subHeading)}>Login</h2>
                                <LoginForm />
                            </div>
                        </div>
                        <div className={classNames('col-lg-3')}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;
