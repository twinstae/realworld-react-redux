import reducer from './articleList';

describe('', () => {
    it('home page loaded', () => {
        const someArticles = 'articles';
        const result = reducer(
            {},
            {
                type: 'HOME_PAGE_LOADED',
                payload:{
                    articles: someArticles
            }
        });

        expect(result.articles).toEqual(someArticles)
    })
})
