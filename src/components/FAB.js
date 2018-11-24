import React, {Component} from 'react'
import {Link} from 'react-router-dom'

//Renders button for adding books and links to search page
class FAB extends Component {
  render() {
    return (<div className="open-search">
      <Link to={'/search'}><button>Add a book</button></Link>
    </div>)
  }
}

export default FAB
