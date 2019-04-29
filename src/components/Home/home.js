import React from "react";
import DefaultNavBar from "../Navbar/defaultNav";
import { Row, Col } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <DefaultNavBar />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center pt-5">
          <Col md="7" className="pt-5 caroul" />
          <Col md="4" className="pt-3" />
        </Row>
      </>
    );
  }
}

export default Home;
