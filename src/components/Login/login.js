import React from "react";
import { withRouter } from "react-router";
import { Row, Col } from "react-bootstrap";
import { MyContext } from "../../App";
import { Alert } from "reactstrap";
import { getAdminProfile, adminLogin } from "./../../API/Admin";

class Login extends React.Component {
  state = {
    name: "",
    password: "",
    message: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, password } = this.state;
    // debugger;
    if (name === "" && password === "") this.setState({ message: "Fill The data please" });
    else if (password === "") this.setState({ message: "Enter password..." });
    else if (name === "") this.setState({ message: "Enter userName..." });
    else {
      // debugger;
      adminLogin({ name, password })
        .then(res => {
          // debugger;
          localStorage.setItem("adminToken", res.adminToken);
          getAdminProfile()
            .then(res => {})
            .catch(err => {
              // debugger;
              this.setState({ message: "Try Again" });
            });
          this.props.history.push("/admin");
        })
        .catch(err => {
          this.setState({ message: "Make sure of your data" });
        });
    }
  };

  onChange = e => {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <MyContext.Consumer>
        {value => (
          <>
            <Col>
              <Row className="pt-5">
                <Col md="3" />
                <Col md="6" className="pt-3 pr-0">
                  <Row>
                    <Col md="12" className="pt-3 mt-5">
                      <form className="login-form">
                        {this.state.message === "" ? (
                          <h2>Login Here ...</h2>
                        ) : (
                          <h2>
                            <Alert color="danger">{this.state.message}</Alert>
                          </h2>
                        )}
                        <div className="form-group form-group1 ">
                          <input type="text" onChange={this.onChange} name="name" className="form-control form-control1 mt-5" placeholder="Name..." />
                        </div>
                        <div className="form-group form-group1  ">
                          <input type="password" onChange={this.onChange} name="password" className="form-control form-control1" placeholder="Password..." />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className=" login__btn ">
                          Login
                        </button>
                      </form>
                    </Col>
                  </Row>
                </Col>
                <Col md="3" />
              </Row>
            </Col>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default withRouter(Login);
