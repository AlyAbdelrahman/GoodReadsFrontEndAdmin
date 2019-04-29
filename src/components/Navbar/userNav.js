import React from "react";
import { Link } from "react-router-dom";
import { Nav, Col, Navbar, FormControl, Form } from "react-bootstrap";

class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.state = {
      searchValue: "",
      redirect: false
    };
  }
  onSubmit(e) {
    e.preventDefault();
    // this.setState({ redirect: true });
    this.props.history.push("/search/" + this.state.searchValue);
  }
  handleTextInput(event) {
    this.setState({ searchValue: event.target.value });
  }
  render() {
    return (
      <Col className="m-0 p-0">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/user">
            <span className="Logo-Part">Good</span>
            <span className="Logo-Part-2">Reads</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto links">
              <Link to="/user" className="nav-link">
                Home
              </Link>

              <Link to="/categories" className="nav-link">
                Categories
              </Link>

              {/* <Link to="/books" className="nav-link">
                Books
              </Link> */}

              <Link to="/authors" className="nav-link">
                Authors
              </Link>
            </Nav>
            <Form inline className="pt-3">
              <FormControl type="text" placeholder="Search" className="mr-sm-2 searchBar" />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        ;
      </Col>
    );
  }
}

export default UserNavbar;
