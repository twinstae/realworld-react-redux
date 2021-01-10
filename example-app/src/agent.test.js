import agent from './agent';

test('get api response', async () => {
    const result = await agent.Articles.get('qwd-6btcml');
    expect(result.article.body).toEqual("wdwqdqw")
});


test('get api response', async () => {
    const result = await agent.Articles.all();
    console.log(result);
    expect(result.articles[0].title).toBeTruthy();
});
