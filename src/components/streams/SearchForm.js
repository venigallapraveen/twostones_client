import React from 'react';
import { Field, reduxForm } from 'redux-form';



class SearchForm extends React.Component {


    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field name="email" component={this.renderInput} label="Search here" />

                <button className="ui button primary">Search</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = 'You must enter a search term';
    }



    return errors;
};

export default reduxForm({
    form: 'searchForm',
    validate
})(SearchForm);
