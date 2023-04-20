export const capitalizeFirstChar = (s) => {
    if (!s) {
        return;
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const containsNumbers = (str) => {
    return /\d/.test(str);
};
