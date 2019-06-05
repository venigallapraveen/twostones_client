import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signUp, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isSignedIn !== prevProps.isSignedIn) {
      this.renderAuthButton();
    }
  }

  onSignOutClick = () => {
    this.props.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="ui blue google button">
            <i className="google icon" />
            Sign Up
          </Link>

          <Link to="/login" className="ui red google button">
            <i className="google icon" />
            Sign In
          </Link>
        </>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, signUp }
)(GoogleAuth);
