import React from "react";
import { Row, Col, Nav, Tab, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Offers from "./Offres";
import RDVVIew from "./RDV";
import Footer from "../../Components/footer";

const CoachingView = (props) => {
  return (
    <>
      <Tab.Container id="dashbord" defaultActiveKey="first" className="h-100">
        <div className="dashbord">
          <div className="dashbord-column">
            <div className="dashbordLabel">Annonces</div>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Offres</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">RDV</Nav.Link>
              </Nav.Item>
            </Nav>
            <Footer />
          </div>

          <div className="dashbordLayout">
            <Header />
            <Tab.Content className="children-tab-container">
              <Tab.Pane eventKey="first" className="h-100">
                <Offers />
              </Tab.Pane>
              <Tab.Pane eventKey="second" className="h-100">
                <RDVVIew />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};
export default CoachingView;
