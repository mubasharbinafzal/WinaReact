import React from "react";
import { Row, Col, Tab, Nav, Image, Container } from "react-bootstrap";
import Annonces from "./AnnoncesView";
import Coaching from "./CoachingView";

const Dashboard = (props) => {
  return (
    <div className="dashbordMain">
      <Tab.Container id="dashbordBox" defaultActiveKey="first">
        <div className="h-100 w-100 d-flex justify-content-between">
          <div className="main-coloum">
            <Nav variant="pills" className="flex-column align-items-center">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <div className="imagebackground">
                    <Image
                      className="hideOnactive"
                      src="../images/offers.png"
                    />
                    <Image
                      className="showonactive"
                      src="../images/offer_hover.png"
                    />
                  </div>
                  <div className="label">Annonces</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <div className="imagebackground">
                    <Image
                      className="showonactive"
                      src="../images/twomen.png"
                    />
                    <Image
                      className=" hideOnactive"
                      src="../images/twomen_hover.png"
                    />
                  </div>
                  <div className="label">Coaching</div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="main-column-2">
            <Tab.Content className="h-100">
              <Tab.Pane eventKey="first" className="h-100">
                <Annonces />
              </Tab.Pane>
              <Tab.Pane eventKey="second" className="h-100">
                <Coaching />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};
export default Dashboard;
