import React, {Component} from 'react'
import {get} from '../BooksAPI'
export const MyContext = React.createContext();


class Provider extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      addBooks: books => {
        const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter(book => book.shelf === 'wantToRead');
        const read = books.filter(book => book.shelf ==='read');
        this.setState({books, currentlyReading, wantToRead, read});
      },
      moveBook: async (movedBook, newShelf, allShelves) => {
        let newBooks = this.state.books;
        if (!newBooks.find(book => book.id === movedBook.id)) {
          newBooks.push(await get(movedBook.id));
        }
        newBooks = newBooks.map(book => {
          book.shelf = Object.keys(allShelves).find(
            shelf => allShelves[shelf].find(
              bookID => bookID === book.id
            ));
          return book.shelf ? book : null;
        }).filter(book => book);

        this.state.addBooks(newBooks);
      }
    }
  }

  render() {
    return (
      <MyContext.Provider value = {{...this.state}}>
        {this.props.children}
        </MyContext.Provider>
    );
  }
}

export default Provider
