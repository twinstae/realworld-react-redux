import ArticleList from '../ArticleList';
import React from 'react';
import {connect} from 'react-redux';
import agent from '../../agent';
import {CHANGE_TAB} from '../../constants/actionTypes';

const mapStateToProps = state =>({
    articles: state.articleList.articles
});

const mapDispatchToProps = dispatch => ({
    onTabClick: ({tab, pager, payload}) => dispatch({
        type: CHANGE_TAB,
        tab, pager, payload
    })
})

const MainView = props =>(
    <div className="col-md-9">        
        <ul className="nav nav-pills outline-active">
            <YourFeedTab
                token={props.token}
                tab={props.tab}
                onTabClick={props.onTabClick} />
            <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />
            <TagFilterTab tag={props.tag} />
        </ul>
        <ArticleList articles={props.articles} />
    </div>
);

const YourFeedTab = props =>
    props.token
    ? NavItem(
        'Your Feed',
        nowCss('feed' === props.tab),
        onTabClick({
            tab: 'feed',
            pager: agent.Articles.feed,
            payload: agent.Articles.feed()
        }, props.onTabClick)
    )
    : null;

const GlobalFeedTab = props =>
    NavItem(
        "Global Feed",
        nowCss('all', props.tab), 
        onTabClick({
            tab: 'all',
            pager: agent.Articles.all,
            payload: agent.Articles.all()
        }, props.onTabClick)
    )

const TagFilterTab = props =>
    props.tag
    ? NavItem(
        props.tag,
        'nav-link active', 
        null
    )
    : null

const nowCss = (isActive)=> isActive ? 'nav-link active' : 'nav-link';

const onTabClick = (command, onTabClick) => (ev) => {
    ev.preventDefault();
    onTabClick(command);
};

function NavItem(name, className, onClick) {
    return <li className="nav-item">
        <a
            href=""
            className={className}
            onClick={onClick}>
            {name}
        </a>
    </li>;
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);