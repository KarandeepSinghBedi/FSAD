import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import SearchBook from "./pages/BookSearch";
import Navbar from "./components/Navbar";
import UserProvider from "./context/UserContext";
import EditBook from "./pages/EditBook";
import BookDetails from './pages/BookDetails';

function App() {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/book-search" element={<SearchBook />} />
                    <Route path="/book-edit/:id" element={<EditBook />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
