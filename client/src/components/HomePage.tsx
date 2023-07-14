import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {NavLink, useLocation } from "react-router-dom";


const HomePage: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top"> 
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link to="/movie-list/movies-coming" as={NavLink} className={location.pathname.includes("/movie-list/movies-coming") ? "active" : ""}>Coming Soon</Nav.Link>

              <Nav.Link to="/movie-list/movies-in-theaters" as={NavLink} className={location.pathname.includes("/movie-list/movies-in-theaters") ? "active" : ""}>Movies in Theaters</Nav.Link>

              <Nav.Link to="/movie-list/top-rated-india" as={NavLink} className={location.pathname.includes("/movie-list/top-rated-india") ? "active" : ""}>Top Rated Indian</Nav.Link>

              <Nav.Link to="/movie-list/top-rated-movies"  as={NavLink} className={location.pathname.includes("/movie-list/top-rated-movies") ? "active" : ""}>Top Rated Movies</Nav.Link>
              
              <Nav.Link to="/movie-list/favourite" as={NavLink} className={location.pathname.includes("/movie-list/favourite") ? "active" : ""}>Favorites</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </>
  );
};

export default HomePage;








