import { call, select, takeLatest } from 'redux-saga/effects';
import { AppMountAction, GetAgencyAction } from 'src/store/actions/app-actions';
import { AppActions } from '../constants';
import { handleError, resolveApiCall, ResolverApiFailure } from 'src/services/api-handlers/api-resolver';
import { AppApi } from 'src/services/end-points';
import { StoreState } from '../reducers';
import { PaginationService } from 'src/services/api-handlers/pagination';
import sortingService from 'src/services/sorting';
import { PersistServiceTypeAction } from '../actions/service-type-actions';
import { SubmissionError } from 'redux-form';
import { makeFormErrors } from '../../components/redux-form/utils/make-form-errors';

function* handleAppMount(action: AppMountAction) {
    const {
        payload: { id },
    } = action;

    yield resolveApiCall(action, async () => AppApi.getEnums(id));
}

function* handleUpdateAgency(action: PersistServiceTypeAction) {
    const { payload } = action;
    const {
        data: { id, ...restData },
        callbacks,
    } = payload;

    yield resolveApiCall(
        action,
        () => AppApi.updateAgencyInfo(id, restData),
        function* () {
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
            yield handleError(result);
        },
    );
}

function* handleAgencyInfo(action: GetAgencyAction) {
    const oldData = yield select((state: StoreState) => state.providers.data);
    const { filters, sorting, page, itemsPerPage } = action.payload;

    yield PaginationService.setPageSize(itemsPerPage).resolveApiCall(action, page, oldData, () =>
        AppApi.getAgencyInfo({
            ...filters,
            order: sortingService.makeOrder(sorting),
            page,
            itemsPerPage,
            pagination: itemsPerPage === -1 ? 0 : 1,
        }),
    );
}

export default function* () {
    yield takeLatest(AppActions.APP_MOUNT, handleAppMount);
    yield takeLatest(AppActions.APP_FETCH_AGENCY, handleAgencyInfo);
    yield takeLatest(AppActions.APP_UPDATE_AGENCY, handleUpdateAgency);
}
