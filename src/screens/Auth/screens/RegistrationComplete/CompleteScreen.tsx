import React from 'react';
import styles from './assets/complete-screen.module.scss';
import CompleteForm from './components/CompleteForm';
import classNames from 'classnames';
import { RouteComponentProps } from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StateProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DispatchProps {}
interface RouteParams {
    location?: string | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OwnProps extends RouteComponentProps<RouteParams> {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

class CompleteScreen extends React.Component<Props> {
    render() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('t');

        return (
            <div className={classNames(styles.login)}>
                <div className={classNames('container')}>
                    <div className={classNames('row')}>
                        <div className={classNames('col-lg-3')}></div>
                        <div className={classNames('col-lg-6', 'py-2')}>
                            <div className={classNames(styles.authContent)}>
                                <h2 className={classNames(styles.subHeading)}>Registration Complete</h2>
                                <CompleteForm initialValues={{ key: token }} />
                            </div>
                        </div>
                        <div className={classNames('col-lg-3')}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompleteScreen;
