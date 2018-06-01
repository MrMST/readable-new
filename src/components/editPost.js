import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updatePost, getPost, getCategories } from '../actions/postAction'

class EditPost extends Component {
  state = {
    id: '',
    category: '',
    title: '',
    author: '',
    body: ''
  };

  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getCategories();
    this.props.getPost( post_id ).then(() => {
      const {
        id,
        title,
        author,
        body,
        category
      } = this.props.posts.posts[0];

      this.setState({
        id: id,
        title: title,
        author: author,
        body: body,
        category: category
      });
    });
  }

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleInputChange = ( event ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = ( event ) => {
    event.preventDefault();
    const { id, title, category, body, author } = this.state;
    const data = {
      id: id,
      title: title,
      body: body,
      author: author,
      category: category
    };
    this.props.updatePost(data, data.id);
    this.props.history.push('/');
  };

  render() {

    const { posts } = this.props.posts;
    const { categories} = this.props.categories

    return (
      <div className='wrapper'>
        {
          posts && posts.length && Object.keys(posts[0]).length && !posts[0].error ? (<div>
            {
              posts.filter( post => !post.deleted).map(post => (
                <div key={post.id}>
                  <div>Edit Post</div>
                    <form onSubmit={ this.handleSubmit }>
                    <label>
                        Select a category:
                        <select name='category' value={this.state.category} onChange={this.setCategory}>
                        { categories && categories.length && categories.map( category => (
                            <option key={ category.name } value={ category.name }>{ category.name }</option>
                        ))}
                        </select>
                      </label>
                      <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange}/>
                      <input type='text' name='author' value={this.state.author}  onChange={this.handleInputChange}/>
                      <textarea name='body' value={this.state.body}  onChange={this.handleInputChange}/>
                      <button>Save Post</button>
                    </form>
                </div>
              ))
            }
            </div>) : (<div>Post not found! 404 <Link to={'/'} key='back'>Back</Link></div>)
        }
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => ({
  posts,
  categories
});

export default connect(mapStateToProps, { updatePost, getPost, getCategories })( EditPost );