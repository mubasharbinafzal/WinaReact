import React from "react";
import { Row, Col, Nav, Tab, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralInformations from "./GeneralInformations";
import ResearchedJob from "./ResearchedJob";
import Skills from "./Skills";
import ProfessionalProfile from "./ProfessionalProfile";
import Header from "../../Components/header";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../../Redux/actions";
import Footer from "../../Components/footer";

const DashbordView = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  return (
    <Tab.Container id="dashbord" defaultActiveKey="first" className="h-100">
      <div className="dashbord">
        <div className="dashbord-column">
          <div className="dashbordLabel">Dashboard</div>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Informations Générales</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Profil Professionnel</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Compétences</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Poste Recherché</Nav.Link>
            </Nav.Item>
          </Nav>
          <Footer />
        </div>

        <div className="dashbordLayout">
          <Header />
          <Tab.Content className="children-tab-container">
            <Tab.Pane eventKey="first" className="h-100">
              <GeneralInformations />
            </Tab.Pane>
            <Tab.Pane eventKey="second" className="h-100">
              <ProfessionalProfile />
            </Tab.Pane>
            <Tab.Pane eventKey="third" className="h-100">
              <Skills />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth" className="h-100">
              <ResearchedJob />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};
export default DashbordView;
