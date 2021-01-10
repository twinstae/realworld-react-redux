import React from 'react';

class Form extends React.Component {

    template = {};
    submitMessage = "Submit";

    constructor(){
        super();
        this.changeInput = this.handleInputChange.bind(this);
        this.submitForm = (fields) => ev => {
            ev.preventDefault();
            this.props.onSubmit(fields);
        };       
        this.state = this.emptyState(); 
    }

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

    componentWillUnmount(){ this.props.onUnload(); }

    Field = (name, value, type, className="form-control form-control-lg") => (
            <fieldset className="form-group">
                <input
                    className={className}
                    type={type ? type : name}
                    placeholder={name}
                    name={name}
                    value={value}
                    onChange={this.changeInput} />
            </fieldset>
        );

    SubmitButton = () => (
        <button 
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit">
            {this.submitMessage}
        </button>
    );

    FormBody =(submitMessage) => (    
            <fieldset>                
                {Object.keys(this.template).map((name)=>{
                    const value = this.state[name];
                    const type = this.template[name];
                    return this.Field(name, value, type);
                })}
                {this.SubmitButton()}
            </fieldset>
        );

    Frame = (child) => (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <form onSubmit={this.submitForm(this.state)}>
                            {child}
                        </form>
                    </div>
                </div>
            </div>
        );

    render = () => this.Frame(this.FormBody());
}

export default Form;