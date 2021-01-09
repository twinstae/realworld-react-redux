import { render } from 'react-dom';
import agent from './agent';
import {ArticleView} from './component/Article';

test('get api response', async () => {
    const result = await agent.Articles.get('qwd-6btcml');
    console.log(result);
    expect(result.article.body).toBe("wdwqdqw")
});
