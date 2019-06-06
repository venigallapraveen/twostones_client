import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    //sending post id, user id and form values to post edit action  creator
    this.props.editStream(this.props.match.params.id, this.props.userID, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Post</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'content')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id],
  userID: state.auth.userId};
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
