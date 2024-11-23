import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const BookCard = ({ book }) => {
    return (
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
                    Availability: {book.available ? "Available" : "Not Available"}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                >
                    Request Exchange
                </Button>
            </CardContent>
        </Card>
    );
};

export default BookCard;
