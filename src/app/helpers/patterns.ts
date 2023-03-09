export const USERNAME_PATTERN = /[а-яёА-ЯЁa-zA-Z!@#$%^&*]{6,12}/;
export const PASSWORD_PATTERN = /(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9а-яёА-ЯЁa-zA-Z!@#$%^&*]{8,}/;
export const PHONE_NUMBER_PATTERN = /(?=.*[0-9])(?=.*[-])[0-9!-]{11,}/;
export const EMAIL_PATTERN = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
export const CODE_LENGTH = /(?=.*[0-9])[0-9!]{6,}/;
