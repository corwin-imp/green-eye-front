import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { email, maxLength, required, Validators } from '../../../../../components/redux-form/utils/validators';
import { FormError } from '../../../../../components/redux-form/FormError';
import { FieldInput } from '../../../../../components/redux-form/fields/FieldInput';
import { asyncAuthCustomerLogin } from '../../../../../store/actions/auth-actions';
import Button from '../../../../../components/Button';
import styles from '../assets/login-form.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Router from '../../../../../navigation/router';
import { routes } from '../../../../../navigation';

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormProps {}

type InjectedProps = InjectedFormProps<LoginFormData, LoginFormProps>;

const validators: Validators<LoginFormData> = {
    email: [required({ message: 'Email is required.' }), email(), maxLength({ max: 255 })],
    password: [required({ message: 'Auth code is required.' }), maxLength({ max: 255 })],
};

const LoginForm: React.FunctionComponent<InjectedProps & LoginFormProps> = ({
    error,
    handleSubmit,
    submitting,
}: InjectedProps & LoginFormProps) => (
    <form onSubmit={handleSubmit}>
        <div className={classNames(styles.login, styles.blueBorder)}>
            <FormError error={error} />
            <FieldInput
                name="email"
                type="email"
                validate={validators.email}
                inputStyle={classNames(styles.blueBorder, 'form-control')}
                wrapperConfig={{
                    label: 'Email *',
                }}
            />
            <FieldInput
                name="password"
                type="password"
                validate={validators.password}
                inputStyle={classNames(styles.blueBorder, 'form-control')}
                wrapperConfig={{
                    label: 'Password *',
                }}
            />
        </div>
        <div className={classNames(styles.links, 'text-center')}>
            <Link to={Router.generate(routes.PASSWORD_RECOVERY)}>Forgot Password?</Link>
        </div>
        <div className={classNames('text-center')}>
            <Button type="submit" className={`${classNames(styles.button)} ${'btn btn-success'}`} disabled={submitting}>
                Login
            </Button>
        </div>
    </form>
);

export default reduxForm<LoginFormData, LoginFormProps>({
    form: 'customer-login',
    //initialValues: { email: 'user@fixtures.com', password: 'user@fixtures.com' },
    onSubmit: asyncAuthCustomerLogin,
})(LoginForm);
