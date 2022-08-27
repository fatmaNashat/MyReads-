import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { useEffect, useState } from "react";
import BookShelves from "./BookShelves";
import PropTypes from "prop-types";
import useQuery from "../hooks/useQuery";


const MainPage = ({books,updateBookShelf}) => {
  
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  

  console.log(books);

  useEffect(() => {
    const combined = searchBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(combined);
  }, [searchBooks]);

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelves books={books} updateBookShelf={updateBookShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};
MainPage.prototype = {
  books: PropTypes.array.isRequired,
};

export default MainPage;
