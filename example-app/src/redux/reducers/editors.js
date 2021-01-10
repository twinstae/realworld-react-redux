import { ASYNC_START } from "../../constants/actionTypes"

export default (state = {}, { type, payload }) => {
    switch (type) {
        case EDITOR_PAGE_LOADED:
            if (!payload) return {
                ...state,
                articleSlug: '',
                title: '',
                description: '',
                body: '',
                tagInput: '',
                tagList: []
            };
            
            const article = payload.article;
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
            return {};
        case ASYNC_START:
            return {};
        case ADD_TAG:
            return {};
        case REMOVE_TAG:
            return {};
        default:
            return state
    }
}
