const defaultState = {
    appName: 'conduit',
    articles: null,
};

export default (state = defaultState, action) => {
    switch (action.type){
        case 'HOME_PAGE_LOADED':
            return { ...state, articles: action.payload.articles };
        default:
            return state;
    }
};