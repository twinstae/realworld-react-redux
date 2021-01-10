import reducer from './article';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from "../../constants/actionTypes";

describe('article actions', () => {
    it('page load', () => {
        const someArticle = "some article";
        const result = reducer({}, {
            type: ARTICLE_PAGE_LOADED,
            payload:{
                article:someArticle
            },
        });
        expect(result.article).toEqual(someArticle);
    })

    it('page unload', () => {
        const result = reducer({}, {
            type: ARTICLE_PAGE_UNLOADED,
        });
        expect(result).toEqual({});
    })
})