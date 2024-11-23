import React from "react";
import { Grid2 } from "@mui/material";
import BookCard from "./BookCard";

const BooksGrid = ({ books }) => {
    return (
        <Grid2 container spacing={3} style={{ padding: "20px" }}>
            {books.map((book) => (
                <Grid2 item xs={12} sm={6} md={4} key={book.id}>
                    <BookCard book={book} />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default BooksGrid;
