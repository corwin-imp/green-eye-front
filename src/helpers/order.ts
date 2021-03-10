import { IOrderSend } from 'src/types/order';
import { OrderFormData } from 'src/screens/General/screens/Orders/components/OrderForm';

export const groupOrder = (dataForm: Partial<OrderFormData>): Partial<IOrderSend> => {
    const {
        studentDropDown,
        serviceTypeDropDown,
        orderTypeDropDown,
        statusDropDown,
        authorizationSourceDropDown,
        allocatedPeriodDropDown,
        orderSubtypeDropDown,
        allocatedHours,
        allocatedMoney,
        maximumAvailableHours,
        ...data
    } = dataForm;
    const dataSend: Partial<IOrderSend> = { ...data };
    if (studentDropDown) {
        dataSend.student = studentDropDown.value;
    }
    if (serviceTypeDropDown) {
        dataSend.serviceType = serviceTypeDropDown.value;
    }

    if (orderTypeDropDown) {
        dataSend.orderType = orderTypeDropDown.value;
    }

    if (statusDropDown) {
        dataSend.status = statusDropDown.value;
    }
    if (authorizationSourceDropDown) {
        dataSend.authorizationSource = authorizationSourceDropDown.value;
    }
    if (allocatedPeriodDropDown) {
        dataSend.allocatedPeriod = allocatedPeriodDropDown.value;
    }

    if (orderSubtypeDropDown) {
        dataSend.orderSubtype = orderSubtypeDropDown.value;
    }

    if (allocatedHours) {
        dataSend.allocatedHours = parseFloat(allocatedHours);
    }
    if (maximumAvailableHours) {
        dataSend.maximumAvailableHours = parseFloat(`${maximumAvailableHours}`);
    }

    if (allocatedMoney) {
        dataSend.allocatedMoney = parseFloat(allocatedMoney);
    }

    return dataSend;
};
