const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { searchBooks } = require('../controllers/bookController');

// Create a new book listing
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { title, author, genre, condition, available, location } = req.body;

        if (!title || !author || !genre || !condition || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newBook = new Book({
            title,
            author,
            genre,
            condition,
            available: available || true,
            location,
            owner: req.user._id,
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all book listings
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().populate("owner", "name email");
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Search Books
//router.get('/search', protect, searchBooks);

router.get("/search", authMiddleware, async (req, res) => {
    try {
        console.error("Hello Search");
        console.error(req.query);
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
        console.error("Hello World");
        // Pagination
        const skip = (page - 1) * limit;
        const books = await Book.find(filter).skip(skip).limit(limit);
        console.error(books);

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
});

// Get a single book listing by ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("owner", "name email");
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a book listing (only by the owner)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.owner.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "You are not authorized to update this book" });

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log(book);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a book listing (only by the owner)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.owner.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "You are not authorized to delete this book" });

        await Book.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
