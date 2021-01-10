import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
import article from './reducers/article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import common from './reducers/common';
import editor from './reducers/editor';

export default combineReducers({
    articleList,
    article,
    auth,
    common,
    editor,
    router: routerReducer
})