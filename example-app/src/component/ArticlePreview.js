import React from 'react';
import { Link } from 'react-router-dom';

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
            <a> 
                <img src={article.author.image} alt=""
                    class="w3-bar-item w3-circle" style={{width:"32px"}}/>
            </a>
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
    <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {TagList(article.tagList)}
    </Link>
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