import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [genre, setGenre] = useState('');
    const [availability, setAvailability] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        onSearch({ keyword, genre, availability, location });
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Science">Science</option>
                <option value="Biography">Biography</option>
            </select>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="">All Availability</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
            </select>
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
