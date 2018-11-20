import React, {Component} from 'react'
import FAB from '../components/FAB'
import Shelf from '../components/Shelf'
import {getAll} from '../BooksAPI'

class Home extends Component {
  async componentDidMount() {
    try {
      const books = await getAll();
      this.props.addBooks(books);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.props.currentlyReading}/>
            <Shelf title="Want to Read" books={this.props.wantToRead}/>
            <Shelf title="Read" books={this.props.read}/>
          </div>
        </div>
        <FAB/>
      </div>
    );
  }
}

export default Home
