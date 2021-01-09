import ArticleList from '../ArticleList';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state =>({
    articles: state.articleList.articles
});

const MainView = props =>(
    <div className="col-md-9">        
        <ArticleList articles={props.articles}>
        </ArticleList>
    </div>
);

export default connect(mapStateToProps)(MainView);