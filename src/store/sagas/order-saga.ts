import { select, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { OrderActions } from '../constants';
import { OrderApi } from 'src/services/end-points';
import { StoreState } from '../reducers';
import { PaginationService } from '../../services/api-handlers/pagination';
import { groupOrder } from 'src/helpers/order';

import {
    DeleteOrderAction,
    GetOrderAction,
    GetOrdersAction,
    PersistOrderAction,
    CreateFilesOrderAction,
    GetFilesAction,
    DeleteFileOrderAction,
} from '../actions/order-actions';
import sortingService from '../../services/sorting';
import {
    handleError,
    resolveApiCall,
    ResolverApiFailure,
    ResolverApiSuccess,
} from '../../services/api-handlers/api-resolver';
import { SubmissionError } from 'redux-form';
import { makeFormErrors } from '../../components/redux-form/utils/make-form-errors';
import { convertValuesToFormData } from '../../components/redux-form/utils/values-to-form-data';
import { push } from 'connected-react-router';
import Router from '../../navigation/router';
import routes from '../../navigation/routes';

function* handleFetchOrders(action: GetOrdersAction) {
    const oldData = yield select((state: StoreState) => state.orders.data);
    const { filters, sorting, page, itemsPerPage } = action.payload;

    yield PaginationService.setPageSize(itemsPerPage).resolveApiCall(action, page, oldData, () =>
        OrderApi.getOrders({
            status: 1,
            ...filters,
            order: sortingService.makeOrder(sorting),
            page,
            itemsPerPage,
            pagination: itemsPerPage === -1 ? 0 : 1,
        }),
    );
}

function* handleFetchOrder(action: GetOrderAction) {
    const {
        payload: { id },
    } = action;

    yield resolveApiCall(action, () => OrderApi.getOrder(id));
}

function* handleDeleteOrder(action: DeleteOrderAction) {
    const {
        payload: { id, onSuccess, onError },
    } = action;

    yield resolveApiCall(
        action,
        () => OrderApi.deleteOrder(id),
        function () {
            if (onSuccess) {
                onSuccess();
            }
        },
        function (result: ResolverApiFailure) {
            if (result.error && result.error.response && result.error.response.status) {
                if (onError) {
                    onError(result.error.message ?? 'Unknown error');
                }
            }
            handleError(result);
        },
    );
}

function* handlePersistOrder(action: PersistOrderAction) {
    const { payload } = action;
    const {
        data: { id },
        files,
        callbacks,
    } = payload;

    const groupData = groupOrder(payload.data);
    yield resolveApiCall(
        action,
        () => (id ? OrderApi.updateOrder(id, groupData) : OrderApi.createOrder(groupData)),
        function* (data: ResolverApiSuccess) {
            const actionFiles: CreateFilesOrderAction = {
                type: OrderActions.CREATE_FILES_ORDER,
                payload: {
                    id: data.payload.id,
                    files,
                    callbacks,
                },
            };
            yield call(handleCreateFilesOrder, actionFiles);
            yield call(callbacks.resolve);

            toast.success(`Order was successfully ${!id ? 'created' : 'updated'}.`);
            if (!id) {
                yield put(push(Router.generate(routes.ORDERS_LIST)));
            } else {
                yield put(push(Router.generate(routes.ORDER_DETAIL, { id: +id })));
            }
        },
        function* (result: ResolverApiFailure) {
            if (result.error && result.error.response && result.error.response.status) {
                yield call(
                    callbacks.reject,
                    result.error instanceof SubmissionError
                        ? result.error
                        : new SubmissionError({
                              _error: result.error.message ?? 'Incorrect response',
                              ...makeFormErrors(result.error.response?.data),
                          }),
                );
            }
            handleError(result);
        },
    );
}

function* handleGetFilesOrder(action: GetFilesAction) {
    const {
        payload: { id },
    } = action;

    yield resolveApiCall(action, () => OrderApi.getFilesOrder(id));
}

function* handleCreateFilesOrder(action: CreateFilesOrderAction) {
    const {
        payload: { id, files, callbacks },
    } = action;

    for (let i = 0; i < files.length; i++) {
        if (files[i].id || files[i]?.attach) {
            continue;
        }
        const formData = convertValuesToFormData({ order: id, attachFile: files[i] }, '');
        yield resolveApiCall(
            action,
            () => OrderApi.createFilesOrder(formData),
            function* (data: ResolverApiSuccess) {
                yield call(callbacks.resolve);
            },
            function* (result: ResolverApiFailure) {
                if (result.error && result.error.response && result.error.response.status) {
                    yield call(
                        callbacks.reject,
                        result.error instanceof SubmissionError
                            ? result.error
                            : new SubmissionError({
                                  _error: result.error.message ?? 'Incorrect response',
                                  ...makeFormErrors(result.error.response?.data),
                              }),
                    );
                }
                handleError(result);
            },
        );
    }
}

function* handleDeleteFileOrder(action: DeleteFileOrderAction) {
    const {
        payload: { id, onSuccess, onError },
    } = action;

    yield resolveApiCall(
        action,
        () => OrderApi.deleteFileOrder(id),
        function (data) {
            if (onSuccess) {
                onSuccess();
            }
        },
        function (result: ResolverApiFailure) {
            if (result.error && result.error.response && result.error.response.status) {
                if (onError) {
                    onError(result.error.message ?? 'Unknown error');
                }
            }
            handleError(result);
        },
    );
}

export default function* () {
    yield takeLatest(OrderActions.FETCH_ORDERS, handleFetchOrders);
    yield takeLatest(OrderActions.FETCH_ORDER, handleFetchOrder);
    yield takeLatest(OrderActions.DELETE_ORDER, handleDeleteOrder);
    yield takeLatest(OrderActions.PERSIST_ORDER, handlePersistOrder);
    yield takeLatest(OrderActions.DELETE_FILE_ORDER, handleDeleteFileOrder);
    yield takeLatest(OrderActions.CREATE_FILES_ORDER, handleCreateFilesOrder);
    yield takeLatest(OrderActions.FETCH_FILES_ORDER, handleGetFilesOrder);
}
