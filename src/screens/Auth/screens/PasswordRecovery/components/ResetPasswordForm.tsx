import React, { useMemo } from 'react';
import { FormErrors, InjectedFormProps, reduxForm } from 'redux-form';
import { FormError } from 'src/components/redux-form/FormError';
import classNames from 'classnames';
import styles from '../assets/reset-password-form.module.scss';
import { useTranslation } from 'react-i18next';
import { required, Validators } from 'src/components/redux-form/utils/validators';
import { FieldInput } from 'src/components/redux-form/fields/FieldInput';
import i18next from 'i18next';
import { asyncAuthUpdatePassword } from 'src/store/actions/auth-actions';
import { Link } from 'react-router-dom';
import Router from '../../../../../navigation/router';
import { routes } from '../../../../../navigation';

export interface ResetPasswordFormData {
    password: string;
    passwordRepeat: string;
}

interface ResetPasswordFormProps {}

type InjectedProps = InjectedFormProps<ResetPasswordFormData, ResetPasswordFormProps>;

const ResetPasswordForm: React.FunctionComponent<InjectedProps & ResetPasswordFormProps> = ({
    handleSubmit,
    submitting,
    error,
}: InjectedProps & ResetPasswordFormProps) => {
    const { t } = useTranslation();
    const validators: Validators<ResetPasswordFormData> = useMemo(
        () => ({
            password: [required()],
            passwordRepeat: [required()],
        }),
        [],
    );

    return (
        <form onSubmit={handleSubmit} className={classNames(styles.form)}>
            <div>
                <h3 className={classNames('text-center', 'mb-5')}>{t('Forgot your password?')}</h3>
                <h4 className={classNames('text-center')}>{t('Enter your new PIN:')}</h4>
                <FormError error={error} />
                <FieldInput
                    name="password"
                    type="password"
                    validate={validators.password}
                    wrapperConfig={{
                        label: 'PIN',
                    }}
                />
                <FieldInput
                    name="passwordRepeat"
                    type="password"
                    validate={validators.passwordRepeat}
                    wrapperConfig={{
                        label: 'PIN Confirmation',
                    }}
                />
            </div>
            <div className={classNames(styles.links, 'text-center')}>
                <Link to={Router.generate(routes.HOME)}>Back to Login</Link>
            </div>
            <div className={classNames('text-center')}>
                <button type="submit" className={classNames('btn', 'btn-primary', 'text-uppercase', 'w-100')}>
                    {submitting ? <span className={classNames('spinner-border')} /> : t('Confirm')}
                </button>
            </div>
        </form>
    );
};

export default reduxForm<ResetPasswordFormData, ResetPasswordFormProps>({
    form: 'reset-password',
    validate: (values: ResetPasswordFormData): FormErrors<ResetPasswordFormData> => {
        const errors: FormErrors<ResetPasswordFormData> = {};

        if (values.passwordRepeat && values.password !== values.passwordRepeat) {
            errors.passwordRepeat = i18next.t('PIN must match');
        }

        return errors;
    },
    onSubmit: asyncAuthUpdatePassword,
})(ResetPasswordForm);
