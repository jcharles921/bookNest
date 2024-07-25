const sortBooks = (books: Book[], preference: string) => {
  switch (preference) {
    case "Date":
      return [...books].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "Rating":
      return [...books].sort((a, b) => b.rating - a.rating);
    case "Alphabet":
      return [...books].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return books;
  }
};

export default sortBooks;
