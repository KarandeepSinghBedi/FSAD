import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const AddBook = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        condition: "",
        location: "",
        available: true,
        image: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/books/add", bookData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage(response.title, " Book added successfully!");
            setBookData({
                title: "",
                author: "",
                genre: "",
                condition: "",
                location: "",
                available: true,
                image: "",
            });
        } catch (error) {
            setMessage("Failed to add book. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <TextField label="Title" name="title" value={bookData.title} onChange={handleChange} required />
            <TextField label="Author" name="author" value={bookData.author} onChange={handleChange} required />
            <TextField label="Genre" name="genre" value={bookData.genre} onChange={handleChange} required />
            <TextField label="Condition" name="condition" value={bookData.condition} onChange={handleChange} required />
            <TextField label="Location" name="location" value={bookData.location} onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary">Add Book</Button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddBook;
