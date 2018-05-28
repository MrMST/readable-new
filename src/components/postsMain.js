import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPosts
} from '../actions/posts'

class PostsMain extends Component {
  componentDidMount () {
    this.props.dispatch( fetchPosts() );
  }

  render() {

    const { loading, posts, error } = this.props;

    if ( loading ) {
      return <div><h1>Loading</h1></div>
    }

    if ( error ) {
      return <div><h1>ERROR</h1>{ error }</div>
    }

    return (
      <ul>
        {/* { posts.map( post => <li key='post.id'>{ post.name }</li>) } */}
      </ul>
    );
  }
}

const mapStateToProps = ( state ) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  error: state.posts.error
});

export default connect( mapStateToProps )(PostsMain);