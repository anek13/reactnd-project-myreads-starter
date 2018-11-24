import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Search from './views/Search'
import Home from './views/Home'
import Provider, {MyContext} from './components/Provider'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider>
          <Switch>
            <Route exact path='/' render={
                () => (<MyContext.Consumer>
                {context => <Home shelves={context}/>}
              </MyContext.Consumer>)
              }/>
            <Route exact path='/search' render={
                () => (<MyContext.Consumer>
                {context => <Search shelves={context}/>}
              </MyContext.Consumer>)
              }/>
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default BooksApp
