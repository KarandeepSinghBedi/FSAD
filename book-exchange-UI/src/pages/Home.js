import React from "react";
import { Link } from "react-router-dom";



const Home = () => {

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome to the Book Exchange Platform</h1>
            <p>Discover, share, and exchange books.</p>
            <div>
                <Link to="/login" style={{ margin: "10px", textDecoration: "none", color: "blue" }}>
                    Login
                </Link>
                <Link to="/register" style={{ margin: "10px", textDecoration: "none", color: "blue" }}>
                    Register
                </Link>
                <Link to="/books" style={{ margin: "10px", textDecoration: "none", color: "blue" }}>
                    Browse Books
                </Link>
                <Link to="/book-search" style={{ margin: "10px", textDecoration: "none", color: "blue" }}>
                    Search Books
                </Link>
                <Link to="/add-book" style={{ margin: "10px", textDecoration: "none", color: "blue" }}>
                    Add Books
                </Link>
            </div>
        </div>
    );
};

export default Home;
