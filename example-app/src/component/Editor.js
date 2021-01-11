import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { ADD_TAG, ARTICLE_SUBMITTED, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from '../constants/actionTypes'
import agent from '../agent';
import marked from 'marked';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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

    componentWillUnmount(){
        this.props.onUnload();
    } 

    TextareaField = (name, value) => (
        <fieldset className="form-group">
            <textarea
                className="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                name={name}
                value={value}
                onChange={this.changeInput}>
            </textarea>
        </fieldset>
        
    )

    handleInputChange(ev){
        const key = ev.target.name;
        this.props.onUpdateField(key, ev.target.value)
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

    submitForm = async (ev) => {
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

    TagList = (onClick)=>(
        <div className="tag-list">
            {
            (this.props.tagList || []).map(tag =>  (
                <span className="tag-default tag-pill" key={'tag_'+tag}>
                    {tag+' '}<FontAwesomeIcon icon={faTimes} data-testid={'tag_'+tag}
                        onClick={onClick(tag)} alt="close tag" />
                </span>
                ))
            }
        </div>
    )

    SubmitButton = (submitMessage) => (
        <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="button"
            disabled={this.props.inProgress} // 한 줄 때문에...
            onClick={this.submitForm}>      
            {submitMessage}
        </button>
    );

    FormBody =() => (   
        <form>
            <fieldset>                
                {this.Field('title', this.props.title, 'text')}
                {this.Field('description', this.props.description, 'text')}
                {this.TextareaField('body', this.props.body)}
                {this.Field('tagInput', this.props.tagInput, 'text', this.watchForEnter)}
            </fieldset>            
            {this.TagList((tag)=>{this.removeTagHandler(tag)})}
            {this.SubmitButton(this.submitMessage)}
        </form>     
        );

    MarkdownPreview = () => {
        const markup = { __html: marked(
            this.props.body || '',
            { sanitize: true }) };
        return <div
            className="col-md-6"
            style={{margin:'20px'}}
            dangerouslySetInnerHTML={markup}></div>;
    }

    Columns = () => (
        <div className="row">
            {this.FormBody()}
            {this.MarkdownPreview()}
        </div>
    )

    render = () => {
        return this.Frame(
            this.Columns(),
            'editor-page'
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
