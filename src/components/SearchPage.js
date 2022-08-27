import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BookAPI from "../BooksAPI";
import Book from "./Book";

const SearchPage = ({ books, updateBookShelf }) => {
  const [Search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [id, setID] = useState("");
  const [shelf, setShelf] = useState("");
  const [getId, setGetId] = useState();
  const [getData, setGetData] = useState({});
  const [choice, setChoice] = useState();


  useEffect(() => {
    let isActive = true;
    if (query) {
      BookAPI.search(query).then((data) => {
        if (data.error) {
          setSearch([]);
        } else {
          if (isActive) {
            data=data.map(searchedBook=>{
              let bookExisted = books.filter(b=>b.id===searchedBook.id)[0]
              return bookExisted?bookExisted:searchedBook;
            })
            console.log(data);
            setSearch(data);
          }
        }
      });
    }
  }, [query]);

  useEffect(() => {
    const updateBook = (id, shelf) => {
      const updated = BookAPI.update(id, shelf);
      setQuery(updated);
    };
    updateBook(id, shelf);
  }, [id, shelf]);

  useEffect(() => {
    BookAPI.get(getId).then((e) => setGetData(e));
  }, [getId]);

  const HandleChange = (i, s) => {
    setID(i);
    setShelf(s);
  };


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {Search ? (
            Search.map((book) => (
              <li key={book.id}>
                <Book book={book} changeBookShelf={updateBookShelf}/>
              </li>
            ))
          ) : (
            <h2></h2>
          )}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
