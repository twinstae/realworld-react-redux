import { ADD_TAG, ARTICLE_SUBMITTED, ASYNC_START, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from "../../constants/actionTypes"

export default (state = {}, action) => {
    switch (action.type) {
        case EDITOR_PAGE_LOADED:
            if (!action.payload){
                return {
                    ...state,
                    articleSlug: '',
                    title: '',
                    description: '',
                    body: '',
                    tagInput: '',
                    tagList: []
                };
            } 
            
            const article = action.payload.article;
            return {
                ...state,
                articleSlug: article.slug,
                title: article.title,
                description: article.description,
                body: article.body,
                tagInput: '',
                tagList: article.tagList,
            };
        case EDITOR_PAGE_UNLOADED:
            return {};
        case ARTICLE_SUBMITTED:
            return {
                ...state,
                inProgress: null,
                errors: action.error ? action.payload.errors : null
            };
        case ASYNC_START:
            if(action.subtype === ARTICLE_SUBMITTED){
                return { ...state, inProgress: true };
            }
            break;
        case ADD_TAG:
            return {
                ...state,
                tagList: state.tagList.concat([state.tagInput]),
                tagInput: ''
            };
        case REMOVE_TAG:
            return {
                ...state,
                tagList: state.tagList.filter(tag => tag !== action.tag)
            };
        case UPDATE_FIELD_EDITOR:
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
    return state;
}
