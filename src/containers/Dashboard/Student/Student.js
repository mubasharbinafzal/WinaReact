import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Tab,
  Nav,
  Image,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import DashbordView from "./DashbordView";
import { useDispatch, useSelector } from "react-redux";
import OffersView from "./OffersView";
import Loader from "../../../components/UI/Loader";
import Coaching from "./CoachingView";
import { addMsg } from "../../../Redux/actions/admin.actions";

const Dashboard = (props) => {
  const store2 = useSelector((state) => state.student);
  const [setmsg, setSetmsg] = useState("");
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(addMsg({ name: setmsg }));
  };
  if (store2.user.student && Object.keys(store2.user.student).length > 0) {
    return (
      <div className="dashbordMain">
        {/* <Form style={{ width: "30%", display: "block" }}>
          <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              value={setmsg}
              onChange={(e) => {
                setSetmsg(e.target.value);
              }}
              name="message"
              placeholder="Message"
            />
          </Form.Group>
          <Button as={Col} onClick={submitForm} variant="primary">
            Submit
          </Button>
        </Form> */}

        <Tab.Container id="dashbordBox" defaultActiveKey="first">
          <div className="h-100 w-100 d-flex justify-content-between">
            <div className="main-coloum">
              <Nav variant="pills" className="flex-column align-items-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <div className="imagebackground">
                      <Image
                        className="hideOnactive img-fluid"
                        src="../images/dashboard.png"
                      />
                      <Image
                        className="showonactive img-fluid"
                        src="../images/dashboard_hover.png"
                      />
                    </div>
                    <div className="label">Dashboard</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
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
                    <div className="label">Offers</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
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
                  <DashbordView />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="h-100">
                  <OffersView />
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="h-100">
                  <Coaching />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    );
  } else {
    return <Loader.CenterProgress size={80} />;
  }
};
export default Dashboard;
