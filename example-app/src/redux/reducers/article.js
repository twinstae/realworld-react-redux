import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
} from '../../constants/actionTypes';
  
export default (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_PAGE_LOADED:
        return {
            ...state,
            article: action.payload[0].article,
            comments: action.payload[1].comments
        };
        case ARTICLE_PAGE_UNLOADED:
        return {};
        default:
        return state;
    }
};