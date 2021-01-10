import {APP_LOAD, ARTICLE_SUBMITTED, LOGOUT, REDIRECT, REGISTER, REGISTER_PAGE_UNLOADED} from '../../constants/actionTypes';

const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0,
    currentUser: null,
  };

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case ARTICLE_SUBMITTED:
            const redirectUrl = `/article/${action.payload.article.slug}`;
            return { ...state, redirectTo: redirectUrl };
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
        case REGISTER_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
};