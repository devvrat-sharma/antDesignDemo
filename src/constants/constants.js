export const alphaNumericRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%_*$]).{4,10}$/);
export const alphaNumericWithoutSpecialsRegex = RegExp(/^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z]*$/);