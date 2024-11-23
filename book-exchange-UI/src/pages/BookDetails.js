import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:2000/books/${id}`);
                setBook(data);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Unable to fetch book details.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="book-details">
            <button onClick={() => navigate(-1)}>&larr; Back</button>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Condition:</strong> {book.condition}</p>
            <p><strong>Availability:</strong> {book.availability ? 'Available' : 'Not Available'}</p>
            <p><strong>Location:</strong> {book.location || 'Not provided'}</p>
        </div>
    );
};

export default BookDetails;
