const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

const book = getBook(2);
const { title, author, genres, pages, hasMovieAdaptation, publicationDate } =
  book;

console.log(author, title);
// rest operator
//const [primary, seconday, ...other] = genres;
//console.log(primary, seconday, other);

//spread operator
const newGenre = [...genres, "void"];
newGenre;
// spread: creating new property, updating property
const updatedBook = { ...book, moviePublicationYear: 2020, pages: 1000 };
updatedBook;

// template literals
const summary = `Our book is ${title}. The book has ${
  hasMovieAdaptation ? "" : "not"
} been adapted to movie.`;
summary;

const pagerange = updatedBook.pages > 500 ? "yes" : "no";
pagerange;

// arrow functions
const getYear = (str) => str.split("-")[0];
console.log(getYear(publicationDate));

// short circuiting logical operators && || ??
console.log(hasMovieAdaptation && "This book has movie");

// optional chaining - if librarything is undefined, it wont try to go ahead reviewCount
function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}
console.log(getTotalReviewCount(book));

// array map, filter, reduce -> create new array
const newGENRES = book.genres.map((el) => el + "VVVVVV");
newGENRES;
const books = getBooks();
const titles = books.map((el) => el.title);
titles;
const essential = books.map((el) => ({ title: el.title, author: el.author }));
essential;

// filter (with chaining)
const countFilter = books
  .filter((el) => el.pages > 500)
  .filter((el) => el.hasMovieAdaptation);
countFilter;

const adventureBooks = books
  .filter((el) => el.genres.includes("adventure"))
  .map((el) => el.title);
adventureBooks;

//reduce -> reduces 1 object/array to 1 value
const allPages = books.reduce((s, el) => s + el.pages, 0);
allPages;

//sort - mutates og array
const x = [23, 42, 54, 12, 10, 1, 99];
const sorted = x.slice().sort((a, b) => a - b); // slice -> copy
sorted;
x;
const sortedbyPages = books
  .slice()
  .sort((a, b) => a.pages - b.pages)
  .map((el) => ({ title: el.title, pages: el.pages }));
sortedbyPages;

//add edit delete element without changing original array
const newBook = {
  id: 6,
  title: "Harry Potter",
  author: "J. K. Rowling",
};

const booksAfterAdd = [...books, newBook];
booksAfterAdd;

const booksAfterDelete = booksAfterAdd.filter((el) => el.id != 3);
booksAfterDelete;

const booksAfterEdit = booksAfterDelete.map((el) =>
  el.id === 1 ? { ...el, pages: 6969 } : el
);
booksAfterEdit;

//async await

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

async function getTodo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
}

console.log("asasasasasasa");
