import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PostsMain from './components/postsMain'
import AddPost from './components/addPost'
import EditPost from './components/editPost'
import ShowPost from './components/showPost'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component = { PostsMain } />
        <Route exact path="/addPost" component = { AddPost } />
        <Route exact path="/show/:post_id" component={ ShowPost } />
        <Route exact path="/editPost/:post_id" component = { EditPost } />
      </Switch>
    );
  }
}

export default App;
