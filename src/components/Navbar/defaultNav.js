import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

class DefaultNavBar extends React.Component {
  render() {
    return (
      <Col md="12" className="default-navBar">
        <Row className="d-flex justify-content-center ml-3">
          <Col md="8">
            <span className="mr-1 ml-5 logo">
              <span className="logo-word">
                GOOD<span className="second-word">Reads</span>
              </span>
            </span>
          </Col>
          <Col md="3" className="mr-3 default-navBar__login-area mt-4">
            <span className="mr-1 ml-5 glyphicon glyphicon-lock">
              <Link to="/login" className="login__link ml-2">
                Login
              </Link>
            </span>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default DefaultNavBar;
