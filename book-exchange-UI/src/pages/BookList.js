import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, Typography, Button, Grid2 } from "@mui/material";


const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:2000/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`http://localhost:2000/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBooks(books.filter(book => book._id !== id));
            } catch (error) {
                console.error("Error deleting book:", error);
                alert('Failed to delete the book.');
            }
        }
    };

    const handleEdit = async (id) => {
        navigate(`/book-edit/${id}`);
    };

    return (
        <Grid2 container spacing={3} style={{ padding: "20px" }}>
            {books.map((book) => (
                <Grid2 item xs={12} sm={6} md={4} key={book.id}>
                    <Card style={{ maxWidth: 345, margin: "10px" }}>
                        {/* Image Placeholder */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={book.image || "https://via.placeholder.com/150"} // Add image link or placeholder
                            alt={book.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {book.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Author: {book.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Genre: {book.genre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Condition: {book.condition}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Available: {book.availability ? "Yes" : "No"}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                                onClick={() => handleDelete(book._id)}
                            >Delete</Button>&nbsp;&nbsp;
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                                onClick={() => handleEdit(book._id)}
                            >Edit</Button>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default BookList;
