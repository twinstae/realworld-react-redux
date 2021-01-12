import { MemoryRouter } from "react-router";
import ArticleList from "./ArticleList";

const fakeJson = `
{"articles":[{"title":"Hello","slug":"hello-iljpvk","body":"esdfg","createdAt":"2021-01-12T13:29:26.336Z","updatedAt":"2021-01-12T13:29:26.336Z","tagList":[],"description":"sdfgf","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-tiujgs","body":"erdgf","createdAt":"2021-01-12T13:29:21.292Z","updatedAt":"2021-01-12T13:29:21.292Z","tagList":[],"description":"esfdg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-s21p8d","body":"esdfg","createdAt":"2021-01-12T13:29:17.026Z","updatedAt":"2021-01-12T13:29:17.026Z","tagList":[],"description":"aesrdfg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-5km5ye","body":"sasdfg","createdAt":"2021-01-12T13:29:12.995Z","updatedAt":"2021-01-12T13:29:12.995Z","tagList":[],"description":"dsfgf","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-bs04yj","body":"sdfgf","createdAt":"2021-01-12T13:29:08.167Z","updatedAt":"2021-01-12T13:29:08.167Z","tagList":[],"description":"asdfg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"asdf","slug":"asdf-pncqoh","body":"sadf","createdAt":"2021-01-12T13:29:03.522Z","updatedAt":"2021-01-12T13:29:03.522Z","tagList":[],"description":"sdfg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-p080jf","body":"dsfg","createdAt":"2021-01-12T13:28:58.541Z","updatedAt":"2021-01-12T13:28:58.541Z","tagList":[],"description":"asdfg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-av5yl7","body":"asdfgf","createdAt":"2021-01-12T13:28:55.043Z","updatedAt":"2021-01-12T13:28:55.043Z","tagList":[],"description":"asdfgf","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"Hello","slug":"hello-y0ecp1","body":"sdfgdsf","createdAt":"2021-01-12T13:28:51.154Z","updatedAt":"2021-01-12T13:28:51.154Z","tagList":[],"description":"esrdfg","author":{"username":"arjunanashok","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0},
{"title":"naslov","slug":"naslov-54zoxh","body":"opis 2","createdAt":"2021-01-12T13:28:06.107Z","updatedAt":"2021-01-12T13:28:06.107Z","tagList":[],"description":"opis 1","author":{"username":"3031","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":false,"favoritesCount":0}],"articlesCount":500}
`
const fakeArticles = JSON.parse(fakeJson)["articles"];

it("articles have not loaded", () => {
    const wrapper = shallow(<ArticleList />);
    expect(wrapper.find('div').text()).toEqual("Loading...");
})

it("no article", () => {
    const wrapper = shallow(<ArticleList articles={[]} />);
    expect(wrapper.find('div').text()).toEqual("No articles are here... yet.");
})

it("render articles", () => {
    const wrapper = mount(
        <MemoryRouter>
            <ArticleList articles={fakeArticles}/>
        </MemoryRouter>
    );
    expect(wrapper.find('.article-preview').length).toEqual(fakeArticles.length);
})