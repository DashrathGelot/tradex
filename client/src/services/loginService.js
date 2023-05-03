import { API } from "../constant"
import { COMMON_ARG } from "./httpservice";

export const signup = async (user) => {
    return fetch(API + 'signup', {
        ...COMMON_ARG,
        body: JSON.stringify({user: user})
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).catch(e => {
        throw e;
    });
}

export const login = async (user) => {
    return fetch(API+'login', {
        ...COMMON_ARG,
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        throw e;
    });
}

export const logout = async () => {
    return fetch(API+'logout', {
        ...COMMON_ARG,
        method: 'DELETE',
        body: {}
    }).then(response => {
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        throw e;
    });
}