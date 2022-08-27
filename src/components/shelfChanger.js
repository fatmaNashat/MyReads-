
const ShelfChanger=({book,changeBookShelf})=> {
    
    const HandleSelect = (value, shelf) => {
        if (value === shelf) {
          return `✓`;
        }
          return ` `;
      };

    return(
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : "none"}
            onChange={(e) => changeBookShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">{HandleSelect("currentlyReading",book.shelf)} Currently Reading</option>
            <option value="wantToRead">{HandleSelect("wantToRead",book.shelf)} Want To Read</option>
            <option value="read">{HandleSelect("read",book.shelf)} Read</option>
            <option value="none">{HandleSelect("none",book.shelf)} None</option>
          </select>
        </div>
    )
}
export default ShelfChanger;