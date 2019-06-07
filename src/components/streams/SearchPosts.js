import React from "react";
import { connect } from "react-redux";
import {search} from "../../actions";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

class SearchPosts extends React.Component {

    componentDidUpdate(prevProps) {

        if(this.props.searchTerm !== prevProps.searchTerm){

            this.renderSearchResults();
        }

    }


    onSubmit = formValues => {
    this.props.search(formValues);
  };


    renderAdmin(stream) {
        if (stream.creator === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream._id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream._id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    }


  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream._id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream._id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.username}</div>
            <div className="description">{stream.content}</div>
          </div>
        </div>
      );
    });
  }

  renderSearchResults = () => {
    if (this.props.streams) {
      return (
        <div>
          <h2>Posts</h2>

          <div className="ui celled list">{this.renderList()}</div>
        </div>
      );
    } else {
      return <div>loading ...</div>;
    }
  };

  render() {
    return (
      <div>
        <div>
          <h3>Search</h3>
          <SearchForm onSubmit={this.onSubmit} />
        </div>
        {this.renderSearchResults()}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.search),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        searchTerm: state.search.searchTerm
    };
};

export default connect(
    mapStateToProps,
  { search }
)(SearchPosts);


