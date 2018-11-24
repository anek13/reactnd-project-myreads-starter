import React, {Component} from 'react'
import FAB from '../components/FAB'
import Shelf from '../components/Shelf'

class Home extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.props.shelves.currentlyReading} moveBook={this.props.shelves.moveBook}/>
            <Shelf title="Want to Read" books={this.props.shelves.wantToRead} moveBook={this.props.shelves.moveBook}/>
            <Shelf title="Read" books={this.props.shelves.read} moveBook={this.props.shelves.moveBook}/>
          </div>
        </div>
        <FAB/>
      </div>
    );
  }
}

export default Home
