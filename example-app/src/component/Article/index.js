
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import ArticleMeta from './ArticleMeta';
import marked from 'marked';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser
  });

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});
  
const TagList = (tagList)=>(
    <ul className="tag-list">
    {
        tagList.map(tag => {
            return (
            <li
                className="tag-default tag-pill tag-outline"
                key={tag}>
                {tag}
            </li>
            );
        })
    }
    </ul>
);

const ArticleBanner = (article, canModify) =>(    
    <div className="banner">
        <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta
            article={article}
            canModify={canModify} />
        </div>
    </div>
)

const ArticleView = (article)=>{
  const markup = { __html: marked(article.body, { sanitize: true }) };
  const canModify = true;
  // this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;
  return (
    <div className="article-page">
      {ArticleBanner(article, canModify)}

      <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">
                <div dangerouslySetInnerHTML={markup}></div>
                {TagList(article.tagList)}
            </div>
          </div>

          <hr />

          <div className="article-actions"></div>
      </div>
    </div>
    );
}
  

  class Article extends React.Component {
    componentWillMount() {
      console.log('start');
      this.props.onLoad(
        agent.Articles.get(this.props.match.params.id)
      );
      console.log('end')
    }
  
    componentWillUnmount() {this.props.onUnload();}
  
    render() {
      if (!this.props.article) return null;
      
      return ArticleView(this.props.article);
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Article);
  export {ArticleView};