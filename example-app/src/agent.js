import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const resBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {req.set('authorization', `Token ${token}`);}
}

const full = (url) => `${API_ROOT}${url}`;

const requests = {
    get: url => 
        superagent.get(full(url)).then(resBody),
    post: (url, body) => 
        superagent.post(full(url),body).use(tokenPlugin).then(resBody),
    put: (url, body) =>
    superagent.put(full(url), body).use(tokenPlugin).then(resBody),
};

const Auth = {
    current: () => requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login',{ user: { email, password }}),
    register: (username, email, password) => 
        requests.post('/users', { user: { username, email, password }}),
    save: user => 
        requests.put('/user', { user })
}

const Articles = {
    all : page =>
        requests.get(`/articles?limit=10`),
    get: slug =>
        requests.get(`/articles/${slug}`),
};

export default {
    Articles,
    Auth
};