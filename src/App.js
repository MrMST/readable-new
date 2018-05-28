import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PostsMain from './components/postsMain'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component = { PostsMain } />
      </Switch>
    );
  }
}

export default App;
