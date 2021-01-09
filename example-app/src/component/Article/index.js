
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

  class Article extends React.Component {
    componentWillMount() {
      this.props.onLoad(
        agent.Articles.get(this.props.match.params.id)
      );
    }
  
    componentWillUnmount() {
      this.props.onUnload();
    }
  
    render() {
      if (!this.props.article) {
        return null;
      }
        const canModify = true;
         // this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;

        const markup = { __html: marked(this.props.article.body, { sanitize: true }) };

        return (
            <div className="article-page">
              {ArticleBanner(this.props.article, canModify)}

              <div className="container page">

                  <div className="row article-content">
                    <div className="col-xs-12">
                        <div dangerouslySetInnerHTML={markup}></div>
                        {TagList(this.props.article.tagList)}
                    </div>
                  </div>

                  <hr />
      
                  <div className="article-actions"></div>
              </div>
            </div>
        );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Article);