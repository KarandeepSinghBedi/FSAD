import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksGrid from "../components/BooksGrid";

const UserProfile = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const response = await axios.get("http://localhost:2000/books/user", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };

        fetchUserBooks();
    }, []);

    return (
        <div>
            <h1>Your Books</h1>
            <BooksGrid books={books} />
        </div>
    );
};

export default UserProfile;
