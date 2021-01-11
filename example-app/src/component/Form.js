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
        const name = target.name;
        this.setState(state => {
            const newState = {
                ...state,
                [name] : target.value
            }
            return newState
        });
    }

    componentWillUnmount(){ this.props.onUnload ? this.props.onUnload() : null }

    Field = (name, value, type, onKeyUp) => (
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
            type="submit">
            {message}
        </button>
    );

    FormBody =() => (   
        <div className="row">
            <form onSubmit={this.submitForm(this.state)}>
                <fieldset>                
                    {Object.keys(this.template).map((name)=>{
                        const value = this.state[name];
                        const type = this.template[name];
                        return this.Field(name, value, type);
                    })}
                </fieldset>
                {this.SubmitButton(this.submitMessage)}
            </form>   
        </div>
        );

    Frame = (child, pageCSS='auth-page') => (
            <div className={pageCSS} data-testid={this.testid}>
                <div className="container page">
                    {ListErrors(this.props.errors)}
                    {child}
                </div>
            </div>
        );

    render = () => this.Frame(this.FormBody());
}

export default Form;