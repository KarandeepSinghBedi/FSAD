import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    //const [ setUser] = useState(null);

    // Check if user is logged in
//    useEffect(() => {
//    const userData = JSON.parse(localStorage.getItem('user'));
//    if (userData) {
//        setUser(userData);
//    }
//}, []);
    
    const handleLogout = () => {
        // Clear user data from localStorage and redirect to login page
        localStorage.removeItem('user');
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        //setUser(null);
        navigate('/');
    };

    return (
        <nav>
            <div>
                {name ? (
                        <span>Hello, {name}</span>
                ) : (
                    <span>Please log in</span>
                )}
                &nbsp;&nbsp;<button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
