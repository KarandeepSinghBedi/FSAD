require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/Book");
const User = require("./models/User");

connectDB();

const seedData = async () => {
    try {
        const user = await User.create({
            name: "Karandeep",
            email: "Karandeep@gmail.com",
            password: "123456", // Ideally hashed
        });

        const books = [
                {
                    "title": "To Kill a Mockingbird",
                    "author": "Harper Lee",
                    "genre": "Fiction",
                    "condition": "Good",
                    "availability": true,
                    "location": "New York"
                },
                {
                    "title": "1984",
                    "author": "George Orwell",
                    "genre": "Dystopian",
                    "condition": "Excellent",
                    "availability": true,
                    "location": "London"
                },
                {
                    "title": "The Great Gatsby",
                    "author": "F. Scott Fitzgerald",
                    "genre": "Classic",
                    "condition": "Fair",
                    "availability": false,
                    "location": "Chicago"
                },
                {
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "genre": "Romance",
                    "condition": "Good",
                    "availability": true,
                    "location": "Boston"
                },
                {
                    "title": "The Catcher in the Rye",
                    "author": "J.D. Salinger",
                    "genre": "Fiction",
                    "condition": "Poor",
                    "availability": true,
                    "location": "San Francisco"
                },
                {
                    "title": "Moby-Dick",
                    "author": "Herman Melville",
                    "genre": "Adventure",
                    "condition": "Excellent",
                    "availability": false,
                    "location": "Seattle"
                },
                {
                    "title": "The Hobbit",
                    "author": "J.R.R. Tolkien",
                    "genre": "Fantasy",
                    "condition": "Good",
                    "availability": true,
                    "location": "Denver"
                },
                {
                    "title": "War and Peace",
                    "author": "Leo Tolstoy",
                    "genre": "Historical Fiction",
                    "condition": "Excellent",
                    "availability": false,
                    "location": "Los Angeles"
                },
                {
                    "title": "The Alchemist",
                    "author": "Paulo Coelho",
                    "genre": "Philosophical",
                    "condition": "Good",
                    "availability": true,
                    "location": "Houston"
                },
                {
                    "title": "Harry Potter and the Sorcerer's Stone",
                    "author": "J.K. Rowling",
                    "genre": "Fantasy",
                    "condition": "Excellent",
                    "availability": true,
                    "location": "Phoenix"
                }
        ];

        await Book.insertMany(books);

        console.log("Data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
