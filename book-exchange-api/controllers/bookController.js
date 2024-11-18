// controllers/bookController.js
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author, genre, condition } = req.body;
  try {
    const book = new Book({ title, author, genre, condition, owner: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book' });
  }
};

exports.getBooks = async (req, res) => {
  const { title, author, genre } = req.query;
  let filters = {};
  if (title) filters.title = { $regex: title, $options: 'i' };
  if (author) filters.author = { $regex: author, $options: 'i' };
  if (genre) filters.genre = genre;

  try {
    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch books' });
  }
};

// Search and filter books
exports.searchBooks = async (req, res) => {
    try {
        const { title, author, genre, availability, location, page = 1, limit = 10 } = req.query;
        
        // Build the search filter object
        let filter = {};
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (author) {
            filter.author = { $regex: author, $options: 'i' };
        }
        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' };
        }
        if (availability !== undefined) {
            filter.availability = availability === 'true';
        }
        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }
        console.log(filter);
        // Pagination
        const skip = (page - 1) * limit;
        const books = await Book.find(filter).skip(skip).limit(limit);
        console.log(books);

        const totalBooks = await Book.countDocuments(filter); // Get total count of books
        const totalPages = Math.ceil(totalBooks / limit);

        res.json({
            books,
            totalBooks,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

