import * as React from 'react';
import { FormErrors, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLength, required, Validators } from 'src/components/redux-form/utils/validators';
import { FormError } from 'src/components/redux-form/FormError';
import { FieldInput } from 'src/components/redux-form/fields/FieldInput';
import { asyncCompleteRegistation } from 'src/store/actions/auth-actions';
import Button from 'src/components/Button';
import styles from '../assets/complete-form.module.scss';
import classNames from 'classnames';

export interface CompleteFormData {
    plainPassword: string;
    confirm: string;
    key: string | null;
}

export interface CompleteForm {}

type InjectedProps = InjectedFormProps<CompleteFormData, CompleteForm>;

const validators: Validators<CompleteFormData> = {
    confirm: [required({ message: 'Auth code is required.' }), maxLength({ max: 255 })],
    plainPassword: [required({ message: 'Auth code is required.' }), maxLength({ max: 255 })],
};

const CompleteForm: React.FunctionComponent<InjectedProps & CompleteForm> = ({
    error,
    handleSubmit,
    submitting,
}: InjectedProps & CompleteForm) => (
    <form onSubmit={handleSubmit}>
        <div className={classNames(styles.login, styles.blueBorder)}>
            <FormError error={error} />
            <FieldInput
                name="key"
                type="hidden"
                inputStyle={classNames(styles.blueBorder, 'form-control')}
                wrapperConfig={{
                    label: '',
                }}
            />
            <FieldInput
                name="plainPassword"
                type="password"
                validate={validators.plainPassword}
                inputStyle={classNames(styles.blueBorder, 'form-control')}
                wrapperConfig={{
                    label: 'Password *',
                }}
            />
            <FieldInput
                name="confirm"
                type="password"
                validate={validators.confirm}
                inputStyle={classNames(styles.blueBorder, 'form-control')}
                wrapperConfig={{
                    label: 'Confirm Password *',
                }}
            />
        </div>
        <div className={classNames('text-center')}>
            <Button type="submit" className={styles.button} disabled={submitting}>
                Save & Login
            </Button>
        </div>
    </form>
);

export default reduxForm<CompleteFormData, CompleteForm>({
    form: 'complete-form',
    //initialValues: { plainPassword: 'user@fixtures.com', confirm: 'user@fixtures.com' },
    validate: (values: CompleteFormData): FormErrors<CompleteFormData> => {
        const errors: FormErrors<CompleteFormData> = {};

        if (values.confirm && values.plainPassword !== values.confirm) {
            errors.confirm = 'Password must match';
        }

        return errors;
    },
    onSubmit: asyncCompleteRegistation,
})(CompleteForm);
