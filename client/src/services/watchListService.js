import { API, WATCH_API } from "../constant";
import { COMMON_ARG } from "./httpservice";

export const favorites = async () => {
    return fetch(API+'favorites', {
        ...COMMON_ARG,
        method: 'GET',
    }).then(response => {
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        throw e;
    });
}

export const allCompanies = async () => {
    return fetch(WATCH_API + 'api/companies', {method: 'GET'}).then(response => {
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        console.log(e);
        throw e;
    })
}

export const getWatchList = async (companies) => {
    return fetch(WATCH_API + 'sse/stocks', {
        method: 'POST',
        body: JSON.stringify(companies.map(company => company.symbol))
    }).then(response => {
        if (response.ok) return response.json();
        throw response.json();
    }).catch(e => {
        throw e;
    })
}