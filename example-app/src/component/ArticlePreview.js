import React from 'react';

const LikeButton = (count)=>(
    <div className="pull-xs-right">
        <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {count}
        </button>
    </div>
);

const Meta = (article)=> {
    const createdDate = new Date(article.createdAt).toDateString();

    return (
        <div className="article-meta">
            <a> <img src={article.author.image} alt="" /> </a>
            <div className="info">
                <a className="author">{article.author.username}</a>
                <span className="date"> {createdDate}</span>
            </div>
            {LikeButton(article.favoritesCount)}
        </div>
    );
};

const TagList = (tagList)=>(
    <ul className="tag-list">
        {
            tagList.map(tag => (
                <li className="tag-default tag-pill tag-outline" key={"tag_"+tag}>
                  {tag}
                </li>
            ))
        }
    </ul>
);

const GoToArticle = (article) => (
    <a to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {TagList(article.tagList)}
    </a>
);

const ArticlePreview = props => {
    const article = props.article;

    return (
        <div className="article-preview">
            {Meta(article)}
            {GoToArticle(article)}
        </div>
    );
}

export default ArticlePreview;