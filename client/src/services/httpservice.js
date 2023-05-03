const CSRFTOKEN = () => document.cookie.split('=')[1];
console.log(CSRFTOKEN());

const HEADER = {
    'Content-Type': 'application/json',
    // 'X-CSRF-Token': CSRFTOKEN()
}

const COMMON_ARG = {
    method: 'POST',
    credentials: 'include',
    headers: HEADER,
}

export {
    HEADER,
    COMMON_ARG
}