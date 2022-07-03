export const getCurrentDateTime = () => {
    return new Date(Date.now()).toISOString();
};

export const getDateWithoutTime = (date: Date | string) => {
    return new Date(date).toISOString().split('T')[0];
}

export const getCurrentDateWithoutTime = () => {
    return new Date().toISOString().split('T')[0];
}

const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
export const isDateValid = (date: string) => {
    return dateRegex.test(date) && Date.parse(date) != NaN;
};