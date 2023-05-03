import { API } from "../constant";
import { COMMON_ARG } from "./httpservice";

export const favorites = async () => {
    return fetch(API+'favorites', {
        ...COMMON_ARG,
        method: 'GET',
    }).then(response => {
        console.log(response);
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        throw e;
    });
}