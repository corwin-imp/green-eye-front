import { failureType, requestType, successType } from 'src/services/api-handlers/api-resolver';
import { Paginated } from '../../services/api-handlers/pagination';

import { Actions } from '../actions/order-actions';
import { OrderActions } from '../constants';
import { IOrder } from 'src/types/order';

export interface OrderState {
    inProgress: boolean;
    authCode: string;
    error: string;
    data: Paginated<IOrder>;
    miniLoaderFor: { [key: string]: boolean };
    current: IOrder | null;
    currentFiles: any | null;
}

const initialState = {
    inProgress: false,
    miniLoaderFor: {},
    authCode: '',
    error: '',
    data: {
        list: [],
        page: 1,
        meta: {
            updatedAt: null,
        },
        inProgress: false,
    },
    current: null,
    currentFiles: null,
};

export function orders(state: OrderState = initialState, action: Actions | any): OrderState {
    switch (action.type) {
        case requestType(OrderActions.PERSIST_ORDER):
            return { ...state, error: '', inProgress: true };
        case successType(OrderActions.PERSIST_ORDER):
            return { ...state, inProgress: false };
        case failureType(OrderActions.PERSIST_ORDER):
            return { ...state, inProgress: false };
        case requestType(OrderActions.FETCH_ORDERS):
            return {
                ...state,
                data: {
                    ...state.data,
                    list: [],
                    page: 1,
                    meta: state.data?.meta,
                    inProgress: true,
                },
                error: '',
                inProgress: true,
            };
        case successType(OrderActions.FETCH_ORDERS):
            return { ...state, data: { ...action.payload, inProgress: false }, inProgress: false };
        case failureType(OrderActions.FETCH_ORDERS):
            return { ...state, data: { ...state.data, inProgress: false }, error: action.error, inProgress: false };

        case requestType(OrderActions.FETCH_ORDER):
            return { ...state, inProgress: true, current: null, error: '' };
        case successType(OrderActions.FETCH_ORDER):
            return { ...state, inProgress: false, current: action.payload };
        case failureType(OrderActions.FETCH_ORDER):
            return { ...state, inProgress: false, error: action.error };
        case requestType(OrderActions.DELETE_ORDER):
            return { ...state, error: '', inProgress: true };
        case successType(OrderActions.DELETE_ORDER):
            return {
                ...state,
                inProgress: false,
                data: {
                    ...state.data,
                    list: state.data.list.filter((user: IOrder) => {
                        return user.id !== action.payload.id;
                    }),
                    meta: {
                        updatedAt: 0,
                    },
                },
            };
        case failureType(OrderActions.DELETE_ORDER):
            return { ...state, inProgress: false, error: action.error.response.data?.errorMessage ?? 'Unknown error' };
        case requestType(OrderActions.FETCH_FILES_ORDER):
            return { ...state, error: '', miniLoaderFor: { FILE: true } };
        case successType(OrderActions.FETCH_FILES_ORDER):
            return { ...state, miniLoaderFor: {}, currentFiles: action.payload };
        case failureType(OrderActions.FETCH_FILES_ORDER):
            return { ...state, miniLoaderFor: {}, error: action.error };
        case requestType(OrderActions.DELETE_FILE_ORDER):
            return { ...state, error: '', miniLoaderFor: { FILE: true } };
        case successType(OrderActions.DELETE_FILE_ORDER):
            const { sagaPayload } = action;
            const curNewFiles = (state.currentFiles ?? []).filter((file: any) => file.id !== sagaPayload.id);

            return {
                ...state,
                miniLoaderFor: {},
                currentFiles: curNewFiles,
            };
        case failureType(OrderActions.DELETE_FILE_ORDER):
            return { ...state, miniLoaderFor: {}, error: action.error.response.data?.errorMessage ?? 'Unknown error' };

        case requestType(OrderActions.CREATE_FILES_ORDER):
            return { ...state, error: '', miniLoaderFor: { FILE: true } };
        case successType(OrderActions.CREATE_FILES_ORDER):
            const curFiles = [...(state.currentFiles ?? [])];
            curFiles.push(action.payload);

            return {
                ...state,
                miniLoaderFor: {},
                currentFiles: curFiles,
            };
        case failureType(OrderActions.CREATE_FILES_ORDER):
            return { ...state, miniLoaderFor: {}, error: action.error.response.data?.errorMessage ?? 'Unknown error' };

        default:
            return state;
    }
}
