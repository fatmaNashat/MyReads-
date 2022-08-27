import "./App.css";
import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    //get books
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  const updateBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
    setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
    };

  return (
    <Routes>
      <Route exact path="/" element={<MainPage books={books} updateBookShelf={updateBookShelf}/>} />
      <Route path="/search" element={<SearchPage books={books} updateBookShelf={updateBookShelf}/>} />
    </Routes>
  );
}

export default App;
