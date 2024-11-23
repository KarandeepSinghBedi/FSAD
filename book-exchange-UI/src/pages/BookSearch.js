import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const BookSearch = () => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        genre: '',
        availability: '',
        location: '',
    });
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    // Perform the search based on query params
    const handleSearch = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:2000/books/search', {
                params: {
                    ...searchParams,
                    page: pagination.currentPage,
                    limit: 5, // Limit results per page
                },
            });
            setBooks(data.books);
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger search whenever current page changes or filters are updated
    useEffect(() => {
        handleSearch();
    }, [pagination.currentPage, searchParams]); // Runs whenever pagination or searchParams change

    return (
        <div>
            <h2>Book Search</h2>
            <div className="spaced-div">
                <input
                    type="text"
                    name="title"
                    value={searchParams.title}
                    onChange={handleChange}
                    placeholder="Search by Title"
                />&nbsp;
                <input
                    type="text"
                    name="author"
                    value={searchParams.author}
                    onChange={handleChange}
                    placeholder="Search by Author"
                />&nbsp;
                <input
                    type="text"
                    name="genre"
                    value={searchParams.genre}
                    onChange={handleChange}
                    placeholder="Search by Genre"
                />&nbsp;
                <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleChange}
                    placeholder="Search by Location"
                />&nbsp;
                <select
                    name="availability"
                    value={searchParams.availability}
                    onChange={handleChange}
                >&nbsp;
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>&nbsp;
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="spaced-div">
                {books.length === 0 ? (
                    <p>No books found</p>
                ) : (
                    <div>
                        {books.map((book) => (
                            <div key={book._id}>
                                <h3>{book.title}</h3>
                                <p>Author: {book.author}</p>
                                <p>Genre: {book.genre}</p>
                                <p>Condition: {book.condition}</p>
                                <p>Location: {book.location}</p>
                                <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
                                <Link to={`/books/${book._id}`}>View Details</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="spaced-div">
                <button
                    onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={pagination.currentPage === 1}
                >
                    Previous
                </button>&nbsp;&nbsp;
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>&nbsp;&nbsp;
                <button
                    onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookSearch;
