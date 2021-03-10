import { AxiosPromise } from 'axios';
import { EndPointService } from 'src/services/api-handlers/axios';

function login(email: string, password: string): AxiosPromise {
    return EndPointService.post('/login-check', { username: email, password });
}
function completeRegistration(plainPassword: string, confirm: string, key: any): AxiosPromise {

    return EndPointService.post(
        `/provider/complete-registration`,
        { password: { plainPassword, confirm } },
        { params: { token: key } },
    );
}

function resetPasswordRequest(payload: any): AxiosPromise {
    return EndPointService.post('/forgot-password', payload);
}

function validateResetPasswordToken(payload: any): AxiosPromise {
    return EndPointService.post('/forgot-password/validate-token', payload);
}

function updatePassword(payload: any): AxiosPromise {
    return EndPointService.post('/users/reset-password', payload);
}

export default {
    login,
    resetPasswordRequest,
    completeRegistration,
    validateResetPasswordToken,
    updatePassword,
};
