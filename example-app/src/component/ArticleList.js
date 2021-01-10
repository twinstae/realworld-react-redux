import React from 'react';
import ArticlePreview from './ArticlePreview';

const Loading = <div className="article-preview">Loading...</div>;
const NoArticles = (
    <div className="article-preview">
      No articles are here... yet.
    </div>
  );
const Content = (articles)=>(
    <div>
    { articles.map(article => <ArticlePreview article={article} key={article.slug} />) }
    </div>
);

const ArticleList = props => {
  if (!props.articles) { return Loading; }
  if (props.articles.length === 0) { return NoArticles; }
  return Content(props.articles);
};

export default ArticleList;