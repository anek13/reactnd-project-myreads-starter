import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {search, getAll} from '../BooksAPI'
import Book from '../components/Book'

class Search extends Component {
  constructor(props) {
    super(props);
    this.queryCounter = 0;
    this.state = {
      query: '',
      books: [],
      queryNumber: 0
    };
  }

  async componentDidMount() {
    try {
      const books = await getAll();
      this.props.addBooks(books);
    } catch(error) {
      console.log(error);
    }
  }

  handleChange = async e => {
  try {
    const query = e.target.value;
    this.setState({query});
    this.queryCounter += 1;
    let newState = {books: [],
                    queryNumber: this.queryCounter
                    };

    if (query.trim()) {
      const results = await search(query);
      if (!results.error) {
        newState.books = results;
      }
    }
    if (newState.queryNumber > this.state.queryNumber) {
      this.setState(newState);
    }
  } catch(error) {
    console.log(error);
  }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={'/'}>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 &&
              this.state.books.map(book => {
                const foundShelf = this.props.books.find(
                  searchBook => searchBook.id === book.id
                );
                if (foundShelf) {
                  book.shelf = foundShelf.shelf;
                } else {
                  book.shelf = 'none';
                }
                return (
                  <Book key={book.id} {...book} moveBook={this.props.moveBook}/>
                );
            })}
            {this.state.books.length === 0 && (
              <h1 style={{textAlign: 'center'}}>No results found</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search
