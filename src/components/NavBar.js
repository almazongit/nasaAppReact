import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { Link } from 'react-router-dom';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
              <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/apod" className={activeLink === 'apod' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('apod')}>Apod</Nav.Link>
              <Nav.Link as={Link} to="/epic" className={activeLink === 'epic' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('epic')}>Epic</Nav.Link>
              <Nav.Link as={Link} to="/rover" className={activeLink === 'rover' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('rover')}>Rover</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://mail.ru/"><img src={navIcon1} alt="" /></a>
                <a href="https://vk.com/"><img src={navIcon2} alt="" /></a>
                <a href="https://ya.ru/"><img src={navIcon3} alt="" /></a>
              </div>
                {/* <button className="vvd"><span>Начнем</span></button> */}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
