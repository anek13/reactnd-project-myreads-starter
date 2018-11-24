import React, {Component} from 'react'
import {getAll} from '../BooksAPI'
export const MyContext = React.createContext();

//Holds the state of books distributed over a set of shelves
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
          newBooks.push(movedBook);
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

  async componentDidMount() {
    try {
      const books = await getAll();
      this.state.addBooks(books);
    } catch(error) {
      console.log(error);
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
