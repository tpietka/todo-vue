import moment from 'moment';
const dateFormat = 'YYYY/MM/DD'

export const getCurrentDateTime = () => {
    return moment().toNow();
};

export const formatDateToYYYYMMDD = (date: Date | string) => {
    return moment(date).format(dateFormat);
}

export const getCurrentDate = () => {
    return moment().format(dateFormat);
}

export const formatDateToDDMMYYYY = (date: string) => {
    return moment(date).format('DD/MM/YYYY');
}

export const getCurrentDateDDMMYYYY = () => {
    return moment().format('DD/MM/YYYY');
}

export const getTomorrowsDate = () => {
    return moment().add(1, 'days').format(dateFormat);
}

export const getCurrentDayName = () => {
    return moment().format('dddd');
}

const dateRegex = /^\d{4}\/(0?[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
export const isDateValid = (date: string) => {
    return dateRegex.test(date) && Date.parse(date) != NaN;
};