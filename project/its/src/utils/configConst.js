export const apihost = {
    local: 'http://127.0.0.1:8080',
    dev: 'https://its-api.herokuapp.com',
    prod: 'https://its-api-prod.herokuapp.com'
};

export const FETCH_PROJECT_LIMIT = 15;
export const FETCH_ISSUE_LIMIT = 15;
export const FETCH_MEMBER_LIMIT = 15;

export const HIT_BOTTOM = 'You already hit the bottom !';

export const red_alert = {
    LOGIN_EMAIL_NOT_EXIST:
        "We don't recognize this email, please sign up to get started",
    LOGIN_FAIL: 'Login fail. Please try again',
    REGISTER_FAIL: 'Register fail. Please try again',

    REGISTER_EMAIL_EXIST: 'This email address is already in use',
    REGISTER_USERNAME_EXIST: 'This username is already in use',

    TRY_AGAIN_LATER: 'Something when wrong. Please try again later.',
    PROJECT_NAME_REPEATED: 'Project name repeated.',

    OLD_PASSWORD_NOT_CORRECT: 'Your old password is not correct.',
    PASSWORD_NOT_CONFIRM: 'Your new password and confirm password is not same.',

    NOT_FOUND: '404 NOT FOUND',

    PERMISSION_DEIED: 'Permission denied',
    USER_NOT_FOUND: 'User not found',
    USER_ALREADY_JOIN: 'User already in project'
};

export const STATE_OPTION = [
    'Open',
    'In Progress',
    'Ready To Test',
    'Resolved',
    "Won't fix",
    'Abandoned'
];
export const SEVERITY_OPTION = [
    'Wish List',
    'Low',
    'Medium',
    'High',
    'Unbreak Now'
];
export const PRIORITY_OPTION = [
    'Critical',
    'Major',
    'Moderate',
    'Minor',
    'Low'
];
export const REPRODUCIBLE_OPTION = ['Yes', 'No'];
export const IDENTITY_OPTION = ['Owner', 'Admin', 'Tester', 'Developer'];

export const inputType = {
    text_alert: 'text_alert',
    text: 'text',
    textarea: 'textarea',
    radio: 'radio',
    select: 'select',
    editor: 'editor'
};
