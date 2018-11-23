import React, {Component} from 'react'
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
      moveBook: (book, newShelf, allShelves) => {
        const newBooks = this.state.books.map(allBooks => {
          const foundID = allShelves[newShelf].find(
            bookID => bookID === allBooks.id
          );
          if (foundID) {
            allBooks.shelf = newShelf;
          }
          return allBooks;
        });
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
