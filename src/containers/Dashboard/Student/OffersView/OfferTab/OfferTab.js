import React from "react";
import { Row, Col, Nav, Tab, Tabs, Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { MdLocationOn } from "react-icons/md";
import CardItem from "../../../../../components/UI/CardWithImage/OfferCardItem";

export default function OfferTab({ eventKey }) {
  if (eventKey == "PreSelectedOffers") {
    return (
      <Row>
        <Col lg={2}>
          <div className="OffersImage">
            <Image src="../images/match card 1.png" />
          </div>
        </Col>
        <Col lg={10}>
          <div className="rightSection">
            <div className="schoolheading">
              Store & Supply
              <span className="edit_icons">04/01/2021</span>
            </div>
            <div className="duration">
              Marketing/Communication
              <br />
              <div className="location">
                <span>
                  <MdLocationOn size={24} />
                </span>{" "}
                4 Rue du Général de Larminat - 75015 Paris
              </div>
            </div>

            <div className="card-with-image-desc">
              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Domaine : Webdesign`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Durée : 1 an`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Niveau d’étude : Brevet`}
              />
            </div>
            <Row className="OfferDecision">
              <Col lg={2}>
                <Button className="button1" variant="outlined">
                  Voir
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  } else if (eventKey == "RefusedOffers") {
    return (
      <Row>
        <Col lg={2}>
          <div className="OffersImage">
            <Image src="../images/match card 1.png" />
          </div>
        </Col>
        <Col lg={10}>
          <div className="rightSection">
            <div className="schoolheading">
              Store & Supply
              <span className="edit_icons">04/01/2021</span>
            </div>
            <div className="duration">
              Marketing/Communication
              <br />
              <div className="location">
                <span>
                  <MdLocationOn size={24} />
                </span>{" "}
                4 Rue du Général de Larminat - 75015 Paris
              </div>
            </div>

            <div className="card-with-image-desc">
              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Domaine : Webdesign`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Durée : 1 an`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Niveau d’étude : Brevet`}
              />
            </div>
            <Row className="OfferDecision">
              <Col lg={2}>
                <Button className="button1" variant="outlined">
                  Voir
                </Button>
              </Col>
              <Col lg={2}>
                <Button className="button2" variant="outlined">
                  Approuvé
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  } else if (eventKey == "Suggestion") {
    return (
      <Row className="offer-tab-3">
        <Col lg={2}>
          <div className="OffersImage">
            <Image src="../images/match card 1.png" />
          </div>
        </Col>
        <Col lg={10}>
          <div className="rightSection">
            <div className="schoolheading">
              Store & Supply
              <span className="edit_icons">04/01/2021</span>
            </div>
            <div className="duration">
              Marketing/Communication
              <br />
              <div className="location">
                <span>
                  <MdLocationOn size={24} />
                </span>{" "}
                4 Rue du Général de Larminat - 75015 Paris
              </div>
            </div>

            <div className="card-with-image-desc">
              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Domaine : Webdesign`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Durée : 1 an`}
              />

              <CardItem
                className="offer-card-item-bordered company-offer-detail-content"
                content={`Niveau d’étude : Brevet`}
              />
            </div>
            <Row className="Suggestion">
              <Col lg={2}>
                <Button className="button1" variant="outlined">
                  Voir
                </Button>
              </Col>
              <Col lg={3}>
                <Button className="button2" variant="outlined">
                  Accepter
                </Button>
              </Col>
              <Col lg={2}>
                <Button className="button3" variant="outlined">
                  Refuser
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <div className="offer-tab-3-perc">90%</div>
      </Row>
    );
  }
}
{
  /* <Row className="Suggestion">
<Col lg={2}>
  <Button className="button1" variant="outlined">
    Voir
  </Button>
</Col>
<Col lg={3}>
  <Button className="button2" variant="outlined">
    Accepter
  </Button>
</Col>
<Col lg={2}>
  <Button className="button3" variant="outlined">
    Refuser
  </Button>
</Col>
</Row> */
}
{
  /* <Row className="OfferDecision">
<Col lg={2}>
  <Button className="button1" variant="outlined">
    Voir
  </Button>
</Col>
<Col lg={2}>
  <Button className="button2" variant="outlined">
    Approuvé
  </Button>
</Col>
</Row> */
}
