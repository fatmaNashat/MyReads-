import BookShelf from "./BookShelf";
import PropTypes from 'prop-types'; 

const BookShelves=({books , updateBookShelf})=> {

    const currentlyReading = books.filter((book)=> book.shelf === "currentlyReading");
    const wantToRead = books.filter((book)=> book.shelf === "wantToRead");
    const read = books.filter((book)=> book.shelf === "read")

    return (
        <div>
            <BookShelf title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf}/>
            <BookShelf title="Want To Read" books={wantToRead} updateBookShelf={updateBookShelf}/>
            <BookShelf title="Read" books={read} updateBookShelf={updateBookShelf}/>
        </div>
    )
}
    
    BookShelves.prototype = {
    books : PropTypes.array.isRequired ,
    updateBookShelf : PropTypes.func.isRequired
}
export default BookShelves;