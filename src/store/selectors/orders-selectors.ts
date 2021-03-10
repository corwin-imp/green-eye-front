import { createSelector } from 'reselect';
import { StoreState } from 'src/store/reducers';
import { IOrder } from 'src/types/order';
import { SelectableItem } from 'src/enumerables/enumerable.abstract';

export const Selector = (state: StoreState) => state.orders.data.list;
export const mappedStaffSelector = createSelector(Selector, (staff: IOrder[]): SelectableItem[] =>
    staff.map((item: IOrder) => ({ name: item.name, value: item.id })),
);
export const miniLoaderForSelector = (state: StoreState) => state.orders.miniLoaderFor;
export const loaderSelector = (state: StoreState) => state.orders.inProgress;
export const selectNameSerLocations = createSelector(Selector, (items) => {
    const ids: { [key: string]: string } = {};

    items.forEach((item: IOrder) => {
        ids[item.id] = item.name;
    });

    return ids;
});
