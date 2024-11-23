// src/components/BookForm.js
import React, { useState } from 'react';
import { addBook } from '../api';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({ title, author, genre }, token);
      alert('Book added successfully!');
    } catch (error) {
      alert('Failed to add book!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
