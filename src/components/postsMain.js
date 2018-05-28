import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {
//   fetchPosts
// } from '../actions/posts'

import { fetchPosts } from '../actions/postAction'

class PostsMain extends Component {
  componentDidMount () {
    this.props.dispatch( fetchPosts() );
  }

  render() {

    console.log(this.props)

    //const { posts } = this.props;
    const { loading, posts, error } = this.props;

    if ( loading ) {
      return <div><h1>Loading</h1></div>
    }

    if ( error ) {
      return <div><h1>ERROR</h1>{ error.message }</div>
    }

    return (
      <ul>
        {/* { posts.map( post => <li key='post.id'>{ post.name }</li>) } */}
      </ul>
    );
  }
}

const mapStateToProps = ( state ) => ({
  posts: state//state.posts
});

export default connect( mapStateToProps )(PostsMain);