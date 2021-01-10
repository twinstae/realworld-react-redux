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

const nowCss = (isActive)=> isActive ? 'nav-link active' : 'nav-link';

const onTabClick = (command, onTabClick) => (ev) => {
    ev.preventDefault();
    onTabClick(command);
};

function NavItem(name,tab, pager) {
    return <li className="nav-item">
        <a
            href=""
            className={nowCss(tab === props.tab)}
            onClick={onTabClick({
                        tab: tab,
                        pager: pager,
                        payload: pager()
                    })}>
            {name}
        </a>
    </li>;
}

const YourFeedTab = props => props.token ? NavItem(
        'Your Feed',
        'feed',
        agent.Articles.feed
    ) : null;

const GlobalFeedTab = props => NavItem(
        'Global Feed',
        'all',
        agent.Articles.all
    );

    const TagFilterTab = props => {
        if (!props.tag) return null;
        return NavItem(
            props.tag,
            'nav-link active', 
            null
        )
      };

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

export default connect(mapStateToProps, mapDispatchToProps)(MainView);