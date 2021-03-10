import { OrderActions } from '../constants';
import { QueryParams } from 'src/types/grid';
import { OrderFormData } from 'src/screens/General/screens/Orders/components/OrderForm';
import { Dispatch } from 'redux';
import { SagaPromise } from './auth-actions';

export interface GetOrdersAction {
    type: typeof OrderActions.FETCH_ORDERS;
    payload: QueryParams;
}

export function getOrders(params: QueryParams): GetOrdersAction {
    return {
        type: OrderActions.FETCH_ORDERS,
        payload: params,
    };
}

export interface GetOrderAction {
    type: typeof OrderActions.FETCH_ORDER;
    payload: {
        id: string | number;
    };
}

export function getOrder(id: string | number): GetOrderAction {
    return {
        type: OrderActions.FETCH_ORDER,
        payload: { id },
    };
}

export interface DeleteOrderAction {
    type: typeof OrderActions.DELETE_ORDER;
    payload: {
        id: number | string;
        onSuccess?: () => void;
        onError?: (error: string) => void;
    };
}

export function deleteOrder(
    id: number | string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
): DeleteOrderAction {
    return {
        type: OrderActions.DELETE_ORDER,
        payload: { id, onSuccess, onError },
    };
}

export interface PersistOrderAction {
    type: typeof OrderActions.PERSIST_ORDER;
    payload: {
        data: OrderFormData;
        files: any;
        callbacks: SagaPromise<any>;
    };
}

export function persistOrder(data: OrderFormData, files: any, callbacks: SagaPromise<any>): PersistOrderAction {
    return {
        type: OrderActions.PERSIST_ORDER,
        payload: {
            data,
            files,
            callbacks,
        },
    };
}

export const asyncPersistOrder = (data: OrderFormData, files: any, dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(persistOrder(data, files, { resolve, reject }));
    });
};

export const asyncCreateFilesOrder = (id: number | string, files: any, dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(createFilesOrder(id, files, { resolve, reject }));
    });
};

export interface CreateFilesOrderAction {
    type: typeof OrderActions.CREATE_FILES_ORDER;
    payload: {
        id: number | string;
        files: any;
        callbacks: SagaPromise<any>;
    };
}

export function createFilesOrder(id: number | string, files: any, callbacks: SagaPromise<any>): CreateFilesOrderAction {
    return {
        type: OrderActions.CREATE_FILES_ORDER,
        payload: {
            id,
            files,
            callbacks,
        },
    };
}

export interface GetFilesAction {
    type: typeof OrderActions.FETCH_FILES_ORDER;
    payload: {
        id: string | number;
    };
}

export function getFiles(id: string | number): GetFilesAction {
    return {
        type: OrderActions.FETCH_FILES_ORDER,
        payload: { id },
    };
}

export interface DeleteFileOrderAction {
    type: typeof OrderActions.DELETE_FILE_ORDER;
    payload: {
        id: number | string;
        onSuccess?: () => void;
        onError?: (error: string) => void;
    };
}

export function deleteFileOrder(
    id: number | string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
): DeleteFileOrderAction {
    return {
        type: OrderActions.DELETE_FILE_ORDER,
        payload: { id, onSuccess, onError },
    };
}

export type Actions = GetOrdersAction | GetOrderAction | DeleteOrderAction | PersistOrderAction;
