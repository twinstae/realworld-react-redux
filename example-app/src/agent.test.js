import agent from './agent';

test('renders learn react link', async () => {
    const result = await agent.Articles.get('request-from-api-28sq91');
    expect(result.article.body).toBe("wdwqdqw")
});
