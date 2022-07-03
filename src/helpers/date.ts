export const getCurrentDateTime = () => {
    return new Date(Date.now()).toISOString();
};

export const getDateWithoutTime = (date: Date | string) => {
    return new Date(date).toISOString().split('T')[0];
}

export const getCurrentDateWithoutTime = () => {
    return new Date().toISOString().split('T')[0];
}