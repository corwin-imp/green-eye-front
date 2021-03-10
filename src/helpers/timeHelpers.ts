import moment from 'moment';

export const changeToZeroZone = (date: string) => {
    return new Date(date).toLocaleString('en-US', { timeZone: 'America/Danmarkshavn' });
};
export const changeToZeroZoneDate = (date: string): Date => {
    let dateFormat = new Date();
    if (date) {
        dateFormat = new Date(date);
    }
    const dateUtc = new Date(
        dateFormat.getUTCFullYear(),
        dateFormat.getUTCMonth(),
        dateFormat.getUTCDate(),
        dateFormat.getUTCHours(),
        dateFormat.getUTCMinutes(),
        dateFormat.getUTCSeconds(),
    );
    return dateUtc;
};

export const changeToZeroMoment = (date: string, form = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.utc(date).zone('0').format(form);
};
export const changeToZeroMomentDate = (date: string | undefined) => {
    return moment.utc(date).zone('0').format('YYYY-MM-DD');
};
export const changeToZeroMomentNoFormat = (date: string) => {
    return moment.utc(date).zone('0');
};
