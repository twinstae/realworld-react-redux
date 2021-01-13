import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { ADD_TAG, ARTICLE_SUBMITTED, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from '../constants/actionTypes'
import agent from '../agent';
import marked from 'marked';

const mapStateToProps = (state) => ({
    ...state.editor
})

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({ type: ADD_TAG }),
    onLoad: payload =>
        dispatch({ type: EDITOR_PAGE_LOADED, payload}),
    onRemoveTag: tag =>
        dispatch({ type: REMOVE_TAG, tag }),
    onSubmit: payload =>{
        console.log(payload)
        dispatch({ type: ARTICLE_SUBMITTED, payload })
    },        
    onUnload: payload =>
        dispatch({ type: EDITOR_PAGE_UNLOADED }),
    onUpdateField: (key, value) =>
        dispatch({ type: UPDATE_FIELD_EDITOR, key, value})
})

export class Editor extends Form {
    template = {
        'title': 'text',
        'description': 'text',
        'body': 'textarea',
        'tagInput': 'text',
    }
    submitMessage = 'Publish'

    componentDidUpdate(prevProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug){
            if (prevProps.match.params.slug) {
                this.props.onUnload();
                return this.props.onLoad(
                    agent.Articles.get(this.props.match.params.slug)
                );
            }
            this.props.onLoad(null);
        }
    }

    componentDidMount() {
        if (this.props.match.params.slug){
            return this.props.onLoad(
                agent.Articles.get(this.props.match.params.slug)
            )
        }
        this.props.onLoad(null);
    }
    
    handleInputChange(ev){
        const key = ev.target.name;
        this.props.onUpdateField(key, ev.target.value)
    }
    
    submitForm = async (ev) => {
        console.log("why am i?")
        ev.preventDefault();
        const article = {
            title: this.props.title,
            description: this.props.description,
            body: this.props.body,
            tagList: this.props.tagList
        };

        const slug = { slug: this.props.articleSlug};
        const promise = this.props.articleSlug ?
            await agent.Articles.update(Object.assign(article, slug)) :
            await agent.Articles.create(article);
        this.props.onSubmit(promise);
    }

    render = () => {
        return this.Frame(
            <div className="row">
                {this.FormBody(
                    this.props,
                    [this.Field('title', this.props.title),
                    this.Field('description', this.props.description),
                    this.Field('body',  this.props.body, 'textarea'),
                    this.Field('tagInput', this.props.tagInput, 'text', this.watchForEnter),
                    this.TagList((tag)=>{this.removeTagHandler(tag)})]                
                )}
                {this.MarkdownPreview()}
            </div>,
            'editor-page'
        )
    }

    watchForEnter = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.props.onAddTag();
        }
    }

    removeTagHandler = tag => () => {
        this.props.onRemoveTag(tag);
    }

    TagList = (onClick)=>(
        <div className="tag-list">
            {
            (this.props.tagList || []).map(tag =>  (
                <span className="tag-default tag-pill" key={'tag_'+tag}>
                    {tag+' '}
                </span>
                ))
            }
        </div>
    )

    MarkdownPreview = () => {
        const markup = { __html: marked(
            this.props.body || '',
            { sanitize: true }) };
        return <div
            className="col-md-6"
            style={{margin:'20px'}}
            dangerouslySetInnerHTML={markup}></div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
