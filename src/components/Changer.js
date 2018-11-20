import React, {Component} from 'react'
import { update } from '../BooksAPI'

class Changer extends Component {
  constructor(book) {
    super();
    this.book = book;
  }

  handleChange = async e => {
    try {
      const shelf = e.target.value;
      console.log(this.book);
      const result = await update(this.book.props, shelf);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  render()   {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Changer
