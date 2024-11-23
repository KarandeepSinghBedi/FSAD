import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        availability: false,
    });

    // Fetch Book Details
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:2000/books/${id}`);
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBook({
            ...book,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2000/books/${id}`, book, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert('Book updated successfully!');
            navigate('/'); // Redirect to home or book list
        } catch (error) {
            console.error("Error updating book:", error);
            alert('Failed to update the book.');
        }
    };

    return (
        <div>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Author</label>
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Genre</label>
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Condition</label>
                <input
                    type="text"
                    name="condition"
                    value={book.condition}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="availability"
                        checked={book.availability}
                        onChange={handleChange}
                    />
                    Available
                </label>
            </div>
            <button type="submit">Update Book</button>
        </form>
    </div>
    );
};

export default EditBook;
