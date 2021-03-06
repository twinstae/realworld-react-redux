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
        ev.preventDefault();
        const props = this.props;
        const article = {
            title: props.title,
            description: props.description,
            body: props.body,
            tagList: props.tagList
        };

        const slug = { slug: props.articleSlug };
        const promise = props.articleSlug ?
            await agent.Articles.update(Object.assign(article, slug)) :
            await agent.Articles.create(article);
        props.onSubmit(promise);
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
                    this.TagList()]                
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

    TagList = ()=>(
        <div className="tag-list">
            {
            (this.props.tagList || []).map(tag =>  (
                <span className="tag-default tag-pill" key={'tag_'+tag}>
                    {tag+' '}
                    <i className="ion-close-round"
                       onClick={(tag) => {this.props.onRemoveTag(tag);}}>
                    </i>
                </span>
                ))
            }
        </div>
    )

    MarkdownPreview = () => {
        const markup = {
            __html: marked( this.props.body || '', { sanitize: true })
        };
        return <div
            className="col-md-6"
            style={{margin:'20px'}}
            dangerouslySetInnerHTML={markup}></div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
