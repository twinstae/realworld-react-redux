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
        const empty = {}
        for (const field of Object.keys(this.template)){
            empty[field] = '';
        }
        return empty
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

    Field = (name, value, type=null) => (
            <fieldset className="form-group">
                <input
                    className="form-control form-control-lg"
                    type={type ? type : name}
                    placeholder={name}
                    name={name}
                    value={value}
                    onChange={this.changeInput} />
            </fieldset>
        );

    SubmitButton = (text) => (
        <button 
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit">
            {text}
        </button>
    );

    FormBody =(submitMessage) => (    
            <form onSubmit={this.submitForm(this.state)}>
                <fieldset>
                    {Object.keys(this.template).map((name)=>{
                        const value = this.state[name];
                        const type = this.template[name];
                        return this.Field(name, value, type);
                    })}
                    {this.SubmitButton(this.submitMessage)}
                </fieldset>
            </form>
        );

    Frame = (child) => (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        {child}
                    </div>
                </div>
            </div>
        );

    render = () => this.Frame(
        this.FormBody()
    );
}

export default Form;