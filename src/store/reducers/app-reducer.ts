import { Actions } from 'src/store/actions/app-actions';
import { failureType, requestType, successType } from '../../services/api-handlers/api-resolver';
import { AppActions } from '../constants';
import user from 'src/services/user-auth';
import orderEnum from 'src/enumerables/order-enum';
import generalEnum from 'src/enumerables/general-enum';

import { IAgencyInfo } from 'src/types/app';

export interface BaseConfig {}

export interface AppState {
    baseConfig: BaseConfig;
    agencyInfo: IAgencyInfo | null;
    inProgress: boolean;
    error: string;
}

// Define initial state
const initialState = {
    baseConfig: {},
    agencyInfo: null,
    inProgress: false,
    error: '',
};

export function app(state: AppState = initialState, action: Actions | any): AppState {
    switch (action.type) {
        case requestType(AppActions.APP_MOUNT):
            return { ...state, error: '', inProgress: true };
        case successType(AppActions.APP_MOUNT):
            user.setAllRoles(action.payload.UserRole);
            user.setAllStatuses(action.payload.UserStatus);
            user.setUserAvailableStatus(action.payload.UserAvailableStatus);
            user.setStudentAvailableStatus(action.payload.StudentStatus);
            orderEnum.setEnum({
                AllocatedPeriod: action.payload.AllocatedPeriod,
                AuthorizationSource: action.payload.AuthorizationSource,
                OrderStatus: action.payload.OrderStatus,
                OrderSubtype: action.payload.OrderSubtype,
                OrderType: action.payload.OrderType,
            });
            caseEnum.setEnum({
                caseType: action.payload.CaseType,
                CaseStatus: action.payload.CaseStatus,
                MinPerUnit: action.payload.MinPerUnit,
                InvoiceSigner: action.payload.InvoiceSigner,
                OrderType_1: action.payload.OrderType_1,
                OrderType_2: action.payload.OrderType_2,
                OrderType_3: action.payload.OrderType_3,
                OrderType_4: action.payload.OrderType_4,
            });
            seanceEnum.setEnum({
                SeanceStatus: action.payload.SeanceStatus,
            });

            generalEnum.setEnum({
                InvoiceStatus: action.payload.InvoiceStatus,
                InvoiceSigner: action.payload.InvoiceSigner,
                PaymentStatus: action.payload.PaymentStatus,
                PaymentCreditStatus: action.payload.PaymentCreditStatus,
                AdminWorkStatus: action.payload.AdminWorkStatus,
                ExpenseStatus: action.payload.ExpenseStatus,
                InternalStatus: action.payload.InternalStatus,
                PayrollStatus: action.payload.PayrollStatus,
            });

            return { ...state, baseConfig: action.payload, inProgress: false };

        case failureType(AppActions.APP_MOUNT):
            return { ...state, error: action.error, inProgress: false };
        case requestType(AppActions.APP_FETCH_AGENCY):
            return { ...state, error: '', inProgress: true };
        case successType(AppActions.APP_FETCH_AGENCY):
            const info = action.payload ? action.payload.list[0] : {};
            return { ...state, agencyInfo: info, inProgress: false };
        case failureType(AppActions.APP_FETCH_AGENCY):
            return { ...state, error: action.error, inProgress: false };
        case requestType(AppActions.APP_UPDATE_AGENCY):
            return { ...state, error: '', inProgress: true };
        case successType(AppActions.APP_UPDATE_AGENCY):
            return { ...state, agencyInfo: action.payload, inProgress: false };
        case failureType(AppActions.APP_UPDATE_AGENCY):
            return { ...state, error: action.error, inProgress: false };
        default:
            return state;
    }
}
