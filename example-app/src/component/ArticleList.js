import React from 'react';

const Loading = <div className="article-preview">Loading...</div>;
const NoArticles = (
    <div className="article-preview">
      No articles are here... yet.
    </div>
  );
const Content = (articles)=>(
    <div>
    { articles.map(article => <h2>{article.title}</h2>) }
    </div>
);

const ArticleList = props => {
    if (!props.articles) { return Loading; }
    if (props.articles.length === 0) { return NoArticles; }

    return Content(props.articles);
};

export default ArticleList;