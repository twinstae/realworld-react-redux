import agent from './agent';

    
const email = 'twinstae@naver.com';

const login = async ()=>{
    const loginRes = await agent.Auth.login(email, '12345678');
    expect(loginRes.user).toBeTruthy();
    expect(loginRes.user.email).toEqual(email);

    return loginRes.user.token;
}

let testSlug;

describe('Articles', ()=>{
    beforeAll(async ()=>{
        const token = await login();
        agent.setToken(token);

        const result = await agent.Articles.create({
                title: "api test",
                description: "test description",
                body: "한국어 글입니다.",
                tagList: ['한국어']
            });
        
        const article = result.article;
        testSlug = article.slug;
        expect(article.description).toEqual("test description");
        
    })

    afterAll(async () =>{    
        const result = await agent.Articles.del(testSlug);
        expect(result).toEqual({});
    })
    
    it('get all articles', async () => {
        const result = await agent.Articles.all();
        expect(result.articles[0].title).toBeTruthy();
    });

    it('get article', async () => {
        const result = await agent.Articles.get(testSlug);
        expect(result.article.body).toEqual("한국어 글입니다.")
    });
    
    it('update article', async () => {
        const now = `${Date.now()}`;

        const result = await agent.Articles.update({
                slug: testSlug,
                title: "api test",
                description: now,
                body: "한국어 글입니다.",
                tagList: ['한국어']
            });
        
        expect(result.article.description).toEqual(now);
    })
})

describe('Auth', ()=>{
    it('login and get current user', async ()=>{
        const token = await login();
        agent.setToken(token);
        const result = await agent.Auth.current();
        expect(result.user.email).toEqual(email);
    })
})

