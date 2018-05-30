import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Timestamp from "react-timestamp"

import { fetchPosts, sendPostVote, changeSortAction, sendDeletePost } from '../actions/postAction'

class PostsMain extends Component {
  componentDidMount () {
    this.props.fetchPosts();
  }

  votePostUp = (postId) => {
    this.props.sendPostVote(postId, "upVote");
  };

  votePostDown = (postId) => {
    this.props.sendPostVote(postId, "downVote");
  };

  changeSorting = value => {
    this.props.changeSortAction({ value });
  }

  deletePost = postId => {
    this.props.sendDeletePost(postId);
  };

  render() {

    const { posts } = this.props;
    const { sort } = this.props

    return (
      <div className='post-list-wrapper'>
        <button onClick={ () => this.changeSorting('votescore') }>VoteScore</button>
        <button onClick={ () => this.changeSorting('timestamp') }>Timestamp</button>
        <Link to="/addpost"><button>Add Post</button></Link>
        <ul>
          { posts && posts.length &&
            posts.filter(post => !post.deleted)
            .sort(( a, b ) => {
              switch ( sort ) {
                case "timestamp":
                  return b.timestamp - a.timestamp;
                default:
                  return b.voteScore - a.voteScore;
              }
            })
            .map( post => (
            <li key = { post.id }>
              <div className='post-wrapper'>
                <div>Category: { post.category }</div>
                <div>Title: <Link to={`/show/${post.id}`}>{ post.title }</Link></div>
                <div><Timestamp time={ post.timestamp / 1000 } format='full' /></div>
                <div>Author: { post.author }</div>
                <div>Comments: { post.commentCount }</div>
                <div>
                  <button onClick={ () => this.votePostUp( post.id ) }>Up</button>
                  CurrentScore: { post.voteScore }
                  <button onClick={ () => this.votePostDown( post.id ) }>Down</button>
                </div>
                <div><button onClick={ () => this.deletePost( post.id ) }>Remove Post</button></div>
                <div><Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  posts: state.posts,
  sort: state.sort
});

export default connect( mapStateToProps, { fetchPosts, sendPostVote, changeSortAction, sendDeletePost} )( PostsMain );