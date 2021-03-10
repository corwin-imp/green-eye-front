import { AppActions } from 'src/store/constants';
import { QueryParams } from 'src/types/grid';
import { SagaPromise } from './auth-actions';
import { Dispatch } from 'redux';
import { AgencyFormData } from 'src/screens/General/screens/AgencyInfo/components/AgencyForm';

export interface AppMountAction {
    type: string;
    payload: AnyObject;
}

export function appMount(): AppMountAction {
    return {
        type: AppActions.APP_MOUNT,
        payload: {},
    };
}

export interface GetAgencyAction {
    type: typeof AppActions.APP_FETCH_AGENCY;
    payload: QueryParams;
}

export function getAgency(params: QueryParams): GetAgencyAction {
    return {
        type: AppActions.APP_FETCH_AGENCY,
        payload: params,
    };
}

export interface UpdateAgencyAction {
    type: typeof AppActions.APP_UPDATE_AGENCY;
    payload: {
        data: Partial<AgencyFormData>;
        callbacks: SagaPromise<any>;
    };
}

export function updateAgency(data: Partial<AgencyFormData>, callbacks: SagaPromise<any>): UpdateAgencyAction {
    return {
        type: AppActions.APP_UPDATE_AGENCY,
        payload: {
            data,
            callbacks,
        },
    };
}

export const asyncPersistAgency = (data: any, dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(updateAgency(data, { resolve, reject }));
    });
};

export type Actions = AppMountAction;
