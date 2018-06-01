import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import Timestamp from 'react-timestamp'
// import {
// //  getPost,
// //  fetchComments,
//   fetchAddComment,
//   fetchDeleteComment,
//   sendVoteComment,
// //  sendDeletePost,
//   sendVotePost
// } from "../actions"
import { getPost, deletePost, getComments } from '../actions/postAction'

class ShowPost extends Component {

  state = {
    author: '',
    body: ''
  };

  componentDidMount() {

    const { post_id } = this.props.match.params;

    this.props.getPost( post_id ).then(() => {
      const {
        id,
        title,
        author,
        body,
        category
      } = this.props.posts.posts[0];

    });
  }

  deletePost = ( postId ) => {
    this.props.deletePost(postId);
    this.props.history.push('/');
  };

  voteUp = ( postId ) => {
    this.props.votePost( postId, 'upVote' );
  };

  voteDown = ( postId ) => {
    this.props.votePost (postId, 'downVote' );
  };

  deleteComment = ( commentId ) => {
    this.props.deleteComment( commentId );
  };

  voteCommentUp = ( commentId ) => {
    this.props.voteComment( commentId, 'upVote' );
  };

  voteCommentDown = (commentId) => {
    this.props.voteComment( commentId, 'downVote' );
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSaveComment = (event) => {
    event.preventDefault();
    // const values = serializeForm(event.target, { hash: true })
    // this.props.addComment(values);
    // this.setState({
    //   author: '',
    //   body: ''
    // });
  };

  render() {
    const { posts } = this.props.posts;
    const { comments } = this.props.comments;

    return (
      <div className='posts-wrapper'>
        <div>Show Post</div>
        {
          posts && posts.length && Object.keys(posts[0]).length && !posts[0].error ? (<div>
            {
              posts.filter( post => !post.deleted).map(post => (
                <div key={post.id}>
                  <input type='text' name='pCategory' value={post.category} readOnly/>
                  <input type='text' name='pTitle' value={post.title} readOnly/>
                  <input type='text' name='pAuthor' value={post.author} readOnly/>
                  <textarea name='pContent' value={post.body} readOnly/>
                  <Timestamp time={ post.timestamp / 1000 } format='full' />
                  <div>
                    <button onClick={ () => this.voteUp(post.id) }>Up</button>
                    Score { post.voteScore }
                    <button onClick={ () => this.voteDown(post.id) }>Down</button>
                  </div>
                  <div> Comment count {post.commentCount} </div>
                  <div><button onClick={ () => this.deletePost( post.id ) }>Remove Post</button></div>
                  <Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link>
                  <div className="comments-wrapper">
                    {
                      comments && comments.length && comments.filter ( comment => !comment.deleted ).map( comment => (
                        <div key={uuidv1()} className="comment">
                          <div>{comment.author}</div>
                          <div>{comment.body}</div>
                          <Timestamp time={ comment.timestamp / 1000 } format='full' />
                          <div>
                            <button onClick={ () => this.voteCommentUp(comment.id) }>Up</button>
                            Score {comment.voteScore}
                            <button onClick={ () => this.voteCommentDown(comment.id) }>Down</button>
                          </div>
                          <Link to={`/editcomment/${comment.id}`}><button>Edit Comment</button></Link>
                          <button onClick={ () => this.deleteComment(comment.id) }>Delete Comment</button>
                        </div>
                      ))
                    }
                    <div className="add-comment-wrapper">
                      <form onSubmit={ this.handleSaveComment }>
                        <input type="hidden"  name="id" value={uuidv1()}/>
                        <input type="hidden"  name="parentId" value={post.id}/>
                        <input type="hidden"  name="timestamp" value={Date.now()}/>
                        <input type="hidden"  name="deleted" value="false"/>
                        <input type="hidden"  name="parentDeleted" value="false"/>
                        <input type="hidden"  name="voteScore" value="1"/>

                        <input type='text' name='author' value={this.state.author} onChange={this.handleInputChange}/>
                        <textarea name='body' value={this.state.body}  onChange={this.handleInputChange}/>
                        <button>Save Comment</button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>) : (<div>Post not found! 404 <Link to={'/'} key='back'>Back</Link></div>)
        }
      </div>
    );
  }

}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
});

// const mapStateToProps = ({ posts, comments }) => ({
//   posts,
//   comments
// });

const mapDispatchToProps = dispatch => ({
  getPost: postId =>
    dispatch(getPost( postId )).then(() =>
      dispatch(getComments( postId ))
    ),
  deletePost: postId => dispatch(deletePost(postId)),
//   votePost: (postId, option) => dispatch(sendVotePost(postId, option)),
//   addComment: comment => dispatch(fetchAddComment(comment)),
//   deleteComment: commentId => dispatch(fetchDeleteComment(commentId)),
//   voteComment: (commentId, option) =>
//     dispatch(sendVoteComment(commentId, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)( ShowPost );

// export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
