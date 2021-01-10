import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ARTICLE_SUBMITTED, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG } from '../constants/actionTypes'

export class Editors extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.editor
})

const mapDispatchToProps = dispatch => ({
    onAddTag: () => dispatch({ type: ADD_TAG }),
    onLoad: payload =>
        dispatch({ type: EDITOR_PAGE_LOADED, payload}),
    onRemoveTag: tag =>
        dispatch({ type: REMOVE_TAG, tag }),
    onSubmit: payload =>
        dispatch({ type: ARTICLE_SUBMITTED, payload}),
    onUnload: payload =>
        dispatch({ type: EDITOR_PAGE_UNLOADED }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Editors)
