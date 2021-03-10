export interface PaginationProps {
    page?: number;
    itemsPerPage?: number;
    pagination?: 0 | 1;
}

export interface QueryParams extends PaginationProps {
    filters?: AnyObject;
    sorting?: AnyObject;
}
export interface QueryMultiParams extends PaginationProps {
    filters?: any;
    sorting?: AnyObject;
}
export type SortDirection = 'asc' | 'desc' | null;
