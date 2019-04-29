import React from "react";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MyContext } from "./../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const uuidv1 = require("uuid/v1");

export class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      addCategoryModal: false,
      newName: "",
      editCategoryModal: false,
      editableCategoryId: "",
      editableName: "",
      showNothification: false,
      error: "",
      notificationValue: Boolean
    };
  }
  addNotification = () => {
    this.notificationDOMRef.current.addNotification({
      title: "Success",
      message: "ADD done Successfully!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  };

  failNotification = () => {
    this.notificationDOMRef.current.addNotification({
      title: "Fail",
      message: "ADD Can not done",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  };

  closeEditModal = () => {
    this.setState({ editCategoryModal: false });
  };

  showEditModal = (value, id) => e => {
    this.setState({ editCategoryModal: true, editableCategoryId: id });
  };

  handleEditChange = e => {
    const value = e.target.value;
    this.setState({ editableName: value });
  };

  submitEdit = (value, id) => e => {
    value.editCategory(id, this.state.editableName);
    this.setState({ editCategoryModal: false });
  };

  showAddModal = () => {
    this.setState({ addCategoryModal: true });
  };

  closeAddModal = () => {
    this.setState({ addCategoryModal: false });
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ newName: value });
  };

  AddNewCategory = value => e => {
    const categoryName = this.state.newName;
    if (categoryName === "") {
      this.setState({ newName: "", addCategoryModal: false });
    } else if (this.props.searchCat(categoryName)) {
      this.setState({ categoryName: "" });
      this.failNotification();
      return;
    } else if (!isNaN(categoryName)) {
      this.setState({ newName: "" });
      this.failNotification();
    } else {
      const category = {
        id: uuidv1(),
        name: categoryName
      };

      this.setState({ addCategoryModal: false, newName: "" });
      this.addNotification();
      // this.props.addCat(category);
    }
  };
  DeleteCategory = (category, id) => e => {
    category.deleteCategory(id);
  };

  render() {
    return (
      <MyContext.Consumer>
        {value => (
          <>
            <Col>
              <Row className="d-flex justify-content-center mt-5">
                <Col md="8" className="d-flex justify-content-center mt-5">
                  <ReactNotification ref={this.notificationDOMRef} />
                  <Table striped bordered hover className="table">
                    <thead>
                      <tr>
                        {value.state.Categories.header.map(ch => (
                          <td key={uuidv1()}> {ch} </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {value.state.Categories.body.map(cb => (
                        <tr key={uuidv1()}>
                          <td key={uuidv1()}>{cb.id}</td>
                          <td key={uuidv1()}>{cb.name}</td>
                          <td>
                            <>
                              <FontAwesomeIcon className="edit-icon" icon={faEdit} onClick={this.showEditModal(cb, cb.id)} />
                              <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={this.DeleteCategory(value, cb.id)} />
                            </>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md="1">
                  <FontAwesomeIcon className="add-icon" icon={faPlus} onClick={this.showAddModal} />
                </Col>
              </Row>
            </Col>

            <Modal show={this.state.addCategoryModal} onHide={this.closeAddModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                      <Form.Label>Name Of Category</Form.Label>

                      <Form.Control value={this.state.newName} onChange={this.handleChange} />
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeAddModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.AddNewCategory(value)}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.editCategoryModal} onHide={this.closeEditModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                      <Form.Label>Name Of Category</Form.Label>
                      <Form.Control placeholder={this.state.editableName} value={this.state.editableName} onChange={this.handleEditChange} />
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeEditModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.submitEdit(value, this.state.editableCategoryId)}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}
