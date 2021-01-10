import agent from './agent';

describe('Articles', ()=>{
    it('get api response', async () => {
        const result = await agent.Articles.get('qwd-6btcml');
        expect(result.article.body).toEqual("wdwqdqw")
    });
    
    
    it('get api response', async () => {
        const result = await agent.Articles.all();
        expect(result.articles[0].title).toBeTruthy();
    });
})

describe('Auth', ()=>{
    
    const email = 'twinstae@naver.com';

    const login = async ()=>{
        const loginRes = await agent.Auth.login(email, '12345678');
        expect(loginRes.user).toBeTruthy();
        expect(loginRes.user.email).toEqual(email);

        return loginRes.user.token;
    }

    it('login', async ()=>{
        login();
    })

    it('login and get current user', async ()=>{
        const token = await login();
        agent.setToken(token);
        const result = await agent.Auth.current();
        expect(result.user.email).toEqual(email);
    })
})

