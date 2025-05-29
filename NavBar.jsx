import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, Stack, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Notification from "./chat/Notification";

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const colors = ["red", "gold", "orange", "yellow"];
    const [colorIndex, setColorIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000); 

        return () => clearInterval(interval); // Clean up the interval
    }, []);

    const currentColor = colors[colorIndex];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // Add logic to change the background color of the page
        const body = document.querySelector('body');
        body.style.backgroundColor = isDarkMode ? '#FFFFFF' : 'rgb(73,74,75)'; // Change colors as needed


    };

    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2 style={{ 
                    fontSize: "2rem", 
                    fontWeight: "bold", 
                    color: "#fff", 
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    position: "relative" // Enable absolute positioning for animation
                }}>
                    <Link to="/" className="link-light text-decoration-none">
                        Dialogue<span style={{ color: currentColor }}>X</span>
                    </Link>
                </h2>
                {user && (
                    <span className="text-warning">
                        Logged in as {user?.name}
                    </span>
                )}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {user && (
                            <Button
                                variant="outline-light"
                                onClick={() => logoutUser()}
                            >
                                Logout
                            </Button>
                        )}

                        {!user && (
                            <>
                                <Link to="/login" className="link-light text-decoration-none">
                                    <Button variant="outline-light" className="fw-bold">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register" className="link-light text-decoration-none">
                                    <Button variant="outline-light" className="fw-bold">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}

                        <Button
                            variant="outline-light"
                            onClick={toggleDarkMode}
                        >
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                        </Button>

                        <Button
                            variant="outline-light"
                            onClick={() => {
                                window.location.href = "mailto:larakondeti14@gmail.com";
                            }}
                        >
                            <FontAwesomeIcon icon={faExclamationCircle} />
                        </Button>
                        {user && <Notification />}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
