import React, {Component} from 'react'
import { update } from '../BooksAPI'

/*Renders UI widget displaying book information icluding:
  book thumbnail, title and authors name; and allows moving
  books between shelves.
*/
class Book extends Component {
  handleChange = async e => {
    try {
      const book = this.props.book;
      const shelf = e.target.value;
      const result = await update(book, shelf);
      this.props.moveBook(book, shelf, result);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''})`
                }}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.handleChange} value={this.props.book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : ''}</div>
        </div>
      </li>
    );
  }
}

export default Book
