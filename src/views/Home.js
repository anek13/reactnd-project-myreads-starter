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
            <Shelf/>
          </div>
        </div>
        <FAB/>
      </div>
    );
  }
}

export default Home