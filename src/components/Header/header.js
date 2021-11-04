import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";

export default function header(props) {
  const { handleModal } = props;
  return (
    <Navbar collapseOnSelect expand="xl" variant="light" className="homeNavBar">
      <Navbar.Brand href="#home">
        <Image
          src="../images/logoWinaA-r.png"
          alt="logo"
          className="navbar-image"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="navbar-left-link" href="#features">
            Entreprises&nbsp; l&nbsp; Publier une offre
          </Nav.Link>
          <Nav.Link className="navbar-left-link" href="#pricing">
            Importer votre CV
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            className="navbar-right-link"
            onClick={() => handleModal("company")}
          >
            Entreprise
          </Nav.Link>
          <Nav.Link
            className=" navbar-right-link"
            onClick={() => handleModal("student")}
          >
            Étudiant
          </Nav.Link>
          <Nav.Link
            className=" navbar-right-link"
            onClick={() => handleModal("main")}
          >
            S’inscrire
          </Nav.Link>
          <Nav.Link className=" navbar-right-link-end">En savoir plus</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
