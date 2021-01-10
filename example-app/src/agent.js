import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const resBody = res => res.body;

let _token = null;
const tokenPlugin = req => {
    if (_token) {
        req.set('Authorization', `Token ${_token}`);
    }
}

const full = (url) => `${API_ROOT}${url}`;

const requests = {
    get: url => 
        superagent.get(full(url)).use(tokenPlugin).then(resBody),
    post: (url, body) => 
        superagent.post(full(url),body).use(tokenPlugin).then(resBody),
    put: (url, body) =>
        superagent.put(full(url), body).use(tokenPlugin).then(resBody),
};

const Auth = {
    current: () => {
        return requests.get('/user')
    },
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
    feed: () =>
        requests.get('/articles/feed?limit=10&offset=0')
};

export default {
    Articles,
    Auth,
    setToken: token => { _token = token; }
};