import React from "react";
import { Nav, Tab, Image } from "react-bootstrap";
import ViewOffers from "./OfferTab/ViewOffers";
import MatchResearch from "./ResearchTab/MatchResearch";
import Header from "../../Components/header";
import Footer from "../../Components/footer";
const OffersView = (props) => {
  const selectTab = () => {
    window.location.reload(true);
  };
  return (
    <Tab.Container id="dashbord" defaultActiveKey="first" className="h-100">
      <div className="dashbord">
        <div className="dashbord-column">
          <div className="dashbordLabel">Offers</div>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Vue générale des offres</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Recherche match</Nav.Link>
            </Nav.Item>
          </Nav>
          <Footer />
        </div>
        <div className="dashbordLayout">
          <Header />
          <Tab.Content className="children-tab-container">
            <Tab.Pane eventKey="first" className="h-100">
              <ViewOffers />
            </Tab.Pane>
            <Tab.Pane eventKey="second" className="h-100">
              <MatchResearch />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};
export default OffersView;
