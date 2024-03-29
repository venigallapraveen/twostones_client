import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions';
import SignUpForm from './SignUpForm';

class StreamCreate extends React.Component {
    onSubmit = formValues => {
        this.props.signUp(formValues);
    };

    render() {
        return (
            <div>
                <h3>SignUp</h3>
                <SignUpForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(
    null,
    { signUp }
)(StreamCreate);