const express = require("express");
const router = express.Router();
const axios = require("axios"); // Import Axios if you're in a Node.js environment
let list = [
  {
    isbn: "9781593279509",
    title: "Eloquent JavaScript, Third Edition",
    author: "Marijn Haverbeke",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781491943533",
    title: "Practical Modern JavaScript",
    author: "Nicolás Bevacqua",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781593277574",
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9798602477429",
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781484200766",
    title: "Pro Git",
    author: "Scott Chacon and Ben Straub",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9781484242216",
    title: "Rethinking Productivity in Software Engineering",
    author: "Caitlin Sadowski, Thomas Zimmermann",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
  {
    isbn: "9798602477439",
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    bookReview: [
      {
        email: "johnwick@gamil.com",
        review: "Good",
      },
    ],
  },
];

router.get("/", (req, res) => {
  res.send(list);
});
router.post("/", (req, res) => {
  const search_by_author = req.query.search_by_author;
  const search_by_title = req.query.search_by_title;
  /*if (search_by_author) {
    let str = search_by_author.toLowerCase();
    const filtered_book = list.filter((book) => {
      let author = book.author;
      let pos = author.toLowerCase().search(str);
      return pos != -1;
    });
    console.log(filtered_book);
    res.send(filtered_book);
  }
  if (search_by_title) {
    let str = search_by_title.toLowerCase();
    const filtered_book = list.filter((book) => {
      let title = book.title;
      let pos = title.toLowerCase().search(str);
      return pos != -1;
    });
    console.log(filtered_book);
    res.send(filtered_book);
  }*/
  function searchForData(searchItem) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const results = list.filter(
          (item) =>
            item.author.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        if (results.length > 0) {
          resolve(results);
        } else {
          reject("No matching data found");
        }
      }, 1000);
    });
  }
  if (search_by_author) {
    searchForData(search_by_author)
      .then((results) => {
        res.send(results);
      })
      .catch((error) => {
        res.send(error);
      });
  }
  if (search_by_title) {
    searchForData(search_by_title)
      .then((results) => {
        res.send(results);
      })
      .catch((error) => {
        res.send(error);
      });
  }
});
router.get("/allbook", (req, res) => {
  //res.send("Hello from all book");
  function fetchData(callback) {
    axios
      .get("http://localhost:5000/book")
      .then(function (response) {
        callback(null, response.data);
      })
      .catch(function (error) {
        callback(error, null);
      });
  }

  function handleResponse(error, data) {
    if (error) {
      res.send(error);
    } else {
      //console.log("Data:", data);
      res.send(data);
    }
  }
  fetchData(handleResponse);
});

router.get("/:isbn", (req, res) => {
  const isbn_no = req.params.isbn;
  // const filtered_book = list.filter((book) => book.isbn === isbn_no);
  // if (filtered_book.length > 0) {
  //   console.log(filtered_book[0]["bookReview"]);
  //   res.send(filtered_book);
  // } else {
  //   res.send("No book found");
  // }
  function searchForData(isbn_no) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const results = list.filter((item) => item.isbn == isbn_no);

        if (results.length > 0) {
          resolve(results);
        } else {
          reject("No matching data found");
        }
      }, 1000);
    });
  }

  searchForData(isbn_no)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/:isbn", (req, res) => {
  const isbn_no = req.params.isbn;
  const email = req.body.email;
  const review = req.body.review;

  const filtered_book = list.filter((book) => book.isbn === isbn_no);
  if (filtered_book.length > 0) {
    filtered_book[0]["bookReview"].push({
      email: email,
      review: review,
    });
    console.log(filtered_book[0]["bookReview"]);
    res.send(filtered_book);
  } else {
    res.send("No book found");
  }
});

router.get("/:isbn/review", (req, res) => {
  const isbn_no = req.params.isbn;
  // res.send("Here is Book review of :" + isbn_no);
  const filtered_book = list.filter((book) => book.isbn === isbn_no);
  if (filtered_book.length > 0) {
    res.send(filtered_book[0]["bookReview"]);
  } else {
    res.send("There is no review about this Book");
  }
});

module.exports = router;
