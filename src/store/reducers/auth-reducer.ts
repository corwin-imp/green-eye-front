import { Actions } from 'src/store/actions/auth-actions';
import { AuthActions } from '../constants';
import { requestType, successType, failureType } from 'src/services/api-handlers/api-resolver';
import user from 'src/services/user-auth';

export interface AuthState {
    inProgress: boolean;
    authorized: boolean;
    data: { [key: string]: any };
    error: { [key: string]: any };
}

const authorized = !!user.getUsername();

const initialState = {
    inProgress: false,
    authorized: authorized,
    data: {},
    error: {},
};

export function auth(state: AuthState = initialState, action: Actions | any): AuthState {
    switch (action.type) {
        
        case requestType(AuthActions.AUTH_LOGIN):
            return { ...state, inProgress: true };
        case successType(AuthActions.AUTH_LOGIN):
            return { ...state, inProgress: false, data: action.payload, authorized: true };
        case failureType(AuthActions.AUTH_LOGIN):
            return { ...state, inProgress: false, error: action.error };
        case successType(AuthActions.AUTH_LOGOUT):
            return { ...state, inProgress: false, authorized: false };

        default:
            return state;
    }
}
