import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { ADD_TAG, ARTICLE_SUBMITTED, EDITOR_PAGE_LOADED, EDITOR_PAGE_UNLOADED, REMOVE_TAG, UPDATE_FIELD_EDITOR } from '../constants/actionTypes'
import agent from '../agent';
import marked from 'marked';

export class Editor extends Form {
    template = {
        'title': 'text',
        'description': 'text',
        'body': 'text',
        'tagInput': 'text',
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug){
            if (nextProps.match.params.slug) {
                this.props.onUnload();
                return this.props.onLoad(
                    agent.Articles.get(this.props.match.params.slug)
                );
            }
            this.props.onLoad(null);
        }
    }

    componentWillMount() {
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
        <textarea
            className="form-control"
            rows="8"
            placeholder="Write your article (in markdown)"
            name={name}
            value={value}
            onChange={this.changeInput}>
        </textarea>
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

    TagList = ()=>(
        <div className="tag-list">
            {
            (this.props.tagList || []).map(tag =>  (
                <span className="tag-default tag-pill" key={tag}>
                    <i  className="ion-close-round"
                        onClick={this.removeTagHandler(tag)}>
                    </i>
                    {tag}
                </span>
                ))
            }
        </div>
    )

    SubmitButton = () => (
        <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="button"
            disabled={this.props.inProgress}
            onClick={this.submitForm}>      
            {this.submitMessage}
        </button>
    );

    FormBody =(submitMessage) => (   
        <form>
            <fieldset>                
                {this.Field('title', this.props.title, 'text')}
                {this.Field('description', this.props.description, 'text')}
                {this.TextareaField('body', this.props.body)}
            </fieldset>
            {this.Field('tagInput', this.props.tagInput, 'text', this.watchForEnter)}
            {this.TagList()}
            {this.SubmitButton('Publish')}
        </form>     
        );

    MarkdownPreview = () => {
        const markup = { __html: marked(this.props.body ? this.props.body : '', { sanitize: true }) };
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
