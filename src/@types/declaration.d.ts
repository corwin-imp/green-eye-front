declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.jpg';
declare module '*.png';
declare type ListType<T> = T[];
declare type AnyObject = Record<string, unknown>;
declare type SelectObject = { label: string; value: any };
declare type SelectMultiObj = { label: string[] | string; value: number[] | string[] | string };
