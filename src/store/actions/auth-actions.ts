import { Dispatch } from 'redux';
import { ResolverApi, ResolverApiFailure, ResolverApiSuccess } from 'src/services/api-handlers/api-resolver';
import { AuthActions } from '../constants';
import { LoginFormData as CustomerLoginFormData } from '../../screens/Auth/screens/Login/components/LoginForm';
import { ResetPasswordFormData } from '../../screens/Auth/screens/PasswordRecovery/components/ResetPasswordForm';
import { ValidateCodeFormData } from '../../screens/Auth/screens/PasswordRecovery/components/ValidateCodeForm';
import { RecoveryRequestFormData } from '../../screens/Auth/screens/PasswordRecovery/components/RecoveryRequestForm';
import { CompleteFormData } from '../../screens/Auth/screens/RegistrationComplete/components/CompleteForm';

export interface SagaPromise<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export interface AuthLoginAction {
    type: typeof AuthActions.AUTH_LOGIN;
    payload: {
        data: CustomerLoginFormData;
        callbacks: SagaPromise<any>;
    };
}

export interface AuthLogoutAction {
    type: typeof AuthActions.AUTH_LOGOUT;
    payload: AnyObject;
}

export interface AuthCheckAction {
    type: typeof AuthActions.AUTH_CHECK;
    payload: AnyObject;
}

export interface AuthSignResetAction {
    type: string;
    payload: AnyObject;
}

export function authCheck(): AuthLogoutAction {
    return {
        type: AuthActions.AUTH_CHECK,
        payload: {},
    };
}

export function authLogout(): AuthLogoutAction {
    return {
        type: AuthActions.AUTH_LOGOUT,
        payload: {},
    };
}

export function authCustomerLogin(data: CustomerLoginFormData, callbacks: SagaPromise<any>): AuthLoginAction {
    return {
        type: AuthActions.AUTH_LOGIN,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncAuthCustomerLogin = (data: CustomerLoginFormData, dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(authCustomerLogin(data, { resolve, reject }));
    });
};
export const asyncCompleteRegistation = (data: CompleteFormData, dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
        dispatch(authCompleteRegistration(data, { resolve, reject }));
    });
};

export interface AuthCompleteRegAction {
    type: typeof AuthActions.AUTH_COMPLETE_REGISTRATION;
    payload: {
        data: CompleteFormData;
        callbacks: SagaPromise<any>;
    };
}
export function authCompleteRegistration(data: CompleteFormData, callbacks: SagaPromise<any>): AuthCompleteRegAction {
    return {
        type: AuthActions.AUTH_COMPLETE_REGISTRATION,
        payload: {
            data,
            callbacks,
        },
    };
}
export interface AuthResetPasswordRequestAction {
    type: typeof AuthActions.AUTH_REQUEST_PASSWORD_RESET;
    payload: {
        data: RecoveryRequestFormData;
        callbacks: SagaPromise<any>;
    };
}

export function authResetPasswordRequest(
    data: RecoveryRequestFormData,
    callbacks: SagaPromise<any>,
): AuthResetPasswordRequestAction {
    return {
        type: AuthActions.AUTH_REQUEST_PASSWORD_RESET,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncAuthResetPasswordRequest = (data: RecoveryRequestFormData, dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
        dispatch(authResetPasswordRequest(data, { resolve, reject }));
    });
};

export interface AuthValidateRecoveryCodeAction {
    type: typeof AuthActions.AUTH_CHECK_RESET_CODE;
    payload: {
        data: ValidateCodeFormData;
        callbacks: SagaPromise<any>;
    };
}

export function authValidateRecoveryCode(
    data: ValidateCodeFormData,
    callbacks: SagaPromise<any>,
): AuthValidateRecoveryCodeAction {
    return {
        type: AuthActions.AUTH_CHECK_RESET_CODE,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncAuthValidateRecoveryCode = (data: ValidateCodeFormData, dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
        dispatch(authValidateRecoveryCode(data, { resolve, reject }));
    });
};

export interface AuthUpdatePasswordAction {
    type: typeof AuthActions.AUTH_UPDATE_PASSWORD;
    payload: {
        data: ResetPasswordFormData;
        callbacks: SagaPromise<any>;
    };
}

export function authUpdatePassword(data: ResetPasswordFormData, callbacks: SagaPromise<any>): AuthUpdatePasswordAction {
    return {
        type: AuthActions.AUTH_UPDATE_PASSWORD,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncAuthUpdatePassword = (data: ResetPasswordFormData, dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
        dispatch(authUpdatePassword(data, { resolve, reject }));
    });
};

export type Actions =
    | AuthLoginAction
    | AuthLogoutAction
    | AuthCheckAction
    | AuthResetPasswordRequestAction
    | AuthValidateRecoveryCodeAction
    | AuthUpdatePasswordAction
    | (ResolverApi & ResolverApiFailure)
    | (ResolverApi & ResolverApiSuccess);
