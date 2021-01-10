import React from 'react';


class Form extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        };

        this.changeInput = this.handleInputChange.bind(this);
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

    Field (name, value, type=null){
        return (
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
    }

    SubmitButton = (text) => (
        <button 
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit">
            {text}
        </button>
    );

    Frame(child){
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        {child}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return null;
    }
}

export default Form;