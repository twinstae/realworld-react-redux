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
});
let clickHandler;
const MainView = props =>{
    clickHandler = (command) => () => {
        ev.preventDefault();
        props.onTabClick(command)
    }

    return (
        <div className="col-md-9">        
            <ul className="nav nav-pills outline-active">
                <YourFeedTab
                    token={props.token}
                    tab={props.tab}/>
                <GlobalFeedTab tab={props.tab} />
                <TagFilterTab tag={props.tag} />
            </ul>
            <ArticleList articles={props.articles} />
        </div>
    )
};

const YourFeedTab = props =>
    props.token
        ? NavItem(
            'Your Feed',
            nowCss('feed' === props.tab),
            clickHandler({
                tab: 'feed',
                pager: agent.Articles.feed,
                payload: agent.Articles.feed()
            })
        )
        : null;



const GlobalFeedTab = props =>
    NavItem(
        "Global Feed",
        nowCss('all' === props.tab), 
        clickHandler({
            tab: 'all',
            pager: agent.Articles.all,
            payload: agent.Articles.all()
        })
    );

const TagFilterTab = props =>
    props.tag
        ? NavItem(props.tag, 'nav-link active')
        : null;

const nowCss = (isActive)=> isActive ? 'nav-link active' : 'nav-link';

const NavItem = (name, className, onClick=null) => (
    <li className="nav-item">
        <a
            href=""
            className={className}
            onClick={onClick}>
            {name}
        </a>
    </li>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);