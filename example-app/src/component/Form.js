import React from 'react';
import ListErrors from './ListErrors';

class Form extends React.Component {
    template = {};
    submitMessage = "Submit";
    testid = "Form";

    constructor(){
        super();
        this.changeInput = this.handleInputChange.bind(this);
        this.state = this.emptyState(); 
    }

    componentWillUnmount(){
        if (this.props.onUnload){ this.props.onUnload() }
    }

    submitForm = (fields) => ev => {
        ev.preventDefault();
        this.props.onSubmit(fields);
    };  

    emptyState(){
        return Object.keys(this.template).reduce(
            (obj, field)=> {obj[field]= ''; return obj;}, {}
        );
    }

    handleInputChange(ev){
        const target = ev.target;
        this.setState(state => {
            const newState = {
                ...state,
                [target.name] : target.value
            }
            return newState
        });
    }

    Field = (name, value, type='text', onKeyUp=null) => 
        type==='textarea' ? (
            <fieldset className="form-group" key={'field_'+name}>
                <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    name={name}
                    value={value}
                    onChange={this.changeInput}>
                </textarea>
            </fieldset>
        ) : (
            <fieldset className="form-group" key={'field_'+name}>
                <input
                    className="form-control form-control-lg"
                    type={type ? type : name}
                    placeholder={name}
                    data-testid={'form_field_'+name}
                    name={name}
                    value={value}
                    onChange={this.changeInput}
                    onKeyUp={onKeyUp} />
            </fieldset>
        );

    SubmitButton = (message) => (
        <button 
            className="btn btn-lg btn-primary pull-xs-right"
            data-testid="submit"
            disabled={ this.props && this.props.inProgress }
            type="submit">
            {message}
        </button>
    );

    FormBody =(state, children) => (   
            <form onSubmit={()=>{this.submitForm(state)}}>
                <fieldset>                
                    {
                    children
                    || Object.keys(this.template).map((name)=>{
                            const value = state[name];
                            const type = this.template[name];
                            return this.Field(name, value, type);
                        })
                    }
                </fieldset>
                {this.SubmitButton(this.submitMessage)}
            </form>   
        );

    Frame = (child, pageCSS='auth-page') => (
            <div className={pageCSS} data-testid={this.testid}>
                <div className="container page">
                    {ListErrors(this.props.errors)}
                    {child}
                </div>
            </div>
        );

    render = () => this.Frame(            
        <div className="row">
            {this.FormBody(this.state)}
        </div>
    )
}

export default Form;