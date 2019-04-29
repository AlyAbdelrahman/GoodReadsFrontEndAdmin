import React from "react";
import { SocialIcon } from "react-social-icons";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class UpperNavBar extends React.Component {
  render() {
    return (
      <Col md="12" className="upper-navBar">
        <Row className="d-flex justify-content-center">
          <Col sm="8">
            <Row className="mt-2">
              <ul className="upper-navBar__contact-info">
                <li>
                  <span className="mr-1 ml-5 glyphicon glyphicon-earphone" /> +0233456567
                </li>
                <li>
                  <span className="mr-1 ml-4 glyphicon glyphicon-envelope" /> samarAboHabib@gmail.com
                </li>
              </ul>
            </Row>
          </Col>
          <Col sm="3">
            <Row className="ml-4">
              <SocialIcon url="http://www.twitter.com" />
              <SocialIcon url="http://www.facebook.com" />
              <SocialIcon url="http://linkedin.com/in/jaketrent" />
              <SocialIcon url="https://plus.google.com/share?url=" />
              <span className="mr-1 ml-5 logout__link-icon glyphicon glyphicon-lock">
                <Link to="/" className="logout__link ml-2">
                  Logout
                </Link>
              </span>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default UpperNavBar;
