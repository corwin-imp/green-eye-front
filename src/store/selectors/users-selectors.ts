import { createSelector } from 'reselect';
import { StoreState } from 'src/store/reducers';
import { IUser } from 'src/types/users';
import { SelectableItem } from 'src/enumerables/enumerable.abstract';

/*
export const Selector = (state: StoreState) => state.auth.data.list;
export const mappedStaffSelector = createSelector(Selector, (staff: IUser[]): SelectableItem[] =>
    staff.map((item: IUser) => ({ name: item.username, value: item.id })),
);
*/
