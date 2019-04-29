
import React from 'react';
import { thead, tr, Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { MyContext } from '../../../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const uuidv1 = require('uuid/v1');


export class AuthorsListing extends React.Component {
    constructor(props) {
        super(props);

        this.OpenAddPopUp = this.OpenAddPopUp.bind(this);
        this.ColseAddPopUp = this.ColseAddPopUp.bind(this);
        this.Typing = this.Typing.bind(this);
        // this.TypingEditAuthor = this.TypingEditAuthor.bind(this);
        this.ColseEditPopUp = this.ColseEditPopUp.bind(this);

        this.state = {
            Search: '',
            _id: '',
            photo: '',
            file:'',
            FirstName: '',
            LastName: '',
            DateOfBirth: '',
            description: '',

            NewAuthorPopSHow: false,
            EditPopShow: false,
        
            // EditedAuthorValues: [],
            // NewEditedValues: [

            // ]
        }

    }
    ColseEditPopUp() {
        this.setState({ EditPopShow: false });
    }

    OpenEditPopUp = (value) => (e) => {

        this.setState({
            EditPopShow: true,
            FirstName: value.FirstName,
            LastName: value.LastName,
            DateOfBirth: value.DateOfBirth,
            photo: value.photo,
            description: value.description,
            _id: value._id
        });
    }


    SaveEdit = (inputvalue, id) => (e) => {

        const newAuthorEditedInfo = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            photo: this.state.photo,
            DateOfBirth: this.state.DateOfBirth,
            description: this.state.description,
            _id: this.state._id
        }

        inputvalue.EditAuthor(id, newAuthorEditedInfo)
        this.setState({ EditPopShow: false })
    }

    OpenAddPopUp() {
        this.setState({ NewAuthorPopSHow: true });
    }

    ColseAddPopUp() {
        this.setState({ NewAuthorPopSHow: false });
    }

    Typing(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(value, name)
        this.setState({ [name]: value });
    }
    photoUpdload=(e)=>{
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            photo: reader.result
          });
        }
    
        reader.readAsDataURL(file)
        // this.setState({
        //     photo: URL.createObjectURL(e.target.files[0])
        //   })
    }

    AddNewAuthor = (inputvalue) => (e) => {
        const photo = this.state.photo;
        const FirstName = this.state.FirstName;
        const LastName = this.state.LastName;
        const DateOfBirth = this.state.DateOfBirth;
        const description = this.state.description;

        if (!FirstName && !photo && !LastName && !DateOfBirth & !description) return;
        const Author = {
            photo, FirstName, LastName, DateOfBirth, description, deleted: false
        };
        console.log(Author)
        inputvalue.AddNewAuthor(Author)
        this.setState({
            NewAuthorPopSHow: false,
            photo: '',
            FirstName: '',
            LastName: '',
            DateOfBirth: '',
            description: '',


        })
    }

    DeleteAuthor = (inputvalue, id) => (e) => {
        inputvalue.DeleteAuthor(id)
    }


    render() {
        return (
            <MyContext.Consumer>
                {
                    value => (
                        <React.Fragment>

                            <Container>
                                <Row>
                                    <Col md={9}>  <Form.Control className="Search" type="text" placeholder="Search Author FirstName" name="Search" onChange={this.Typing} /></Col>

                                    <Col md={3}><Button className="AddNewCategory" variant="primary" onClick={this.OpenAddPopUp}>Add Author</Button></Col>
                                </Row>
                            </Container>


                            <Container>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {value.state.Authors.th.map((p, i) => (<td key={uuidv1()}> {p}   </td>))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {value.state.Authors.tbody.filter(c => (!(c.deleted)&&(c.FirstName).includes(this.state.Search))).map(z => */}

                                        {value.state.Authors.tbody.filter(c => (!(c.deleted) && (c.FirstName))).map(z =>
                                        // {let imageUri = "data:image/png;base64," + blob;}
                                            <tr key={uuidv1()} >

                                                <td key={uuidv1()}>{z._id}</td>
                                               
                                                <td key={uuidv1()}><img  className="AuthorPhoto"  src={z.photo} alt={z.photo}/>
 
                                                </td>
                                                <td key={uuidv1()}>{z.FirstName}</td>
                                                <td key={uuidv1()}>{z.LastName}</td>
                                                <td key={uuidv1()}>{z.DateOfBirth}</td>

                                                <td>
                                                    <>
                                                        <FontAwesomeIcon className="EditIcon" icon={faEdit} onClick={this.OpenEditPopUp(z)} />
                                                        <FontAwesomeIcon className="DeleteIcon" icon={faTrash} onClick={this.DeleteAuthor(value, z._id)} />
                                                    </>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                            </Container>
                            {/* -------------------------------------new Author---------------------------------------------------- */}
                            <Modal show={this.state.NewAuthorPopSHow} onHide={this.ColseAddPopUp}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridAddress1" >
                                                <Form.Label >Photo Url</Form.Label>
                                                <Form.Control value={this.state.photo} onChange={this.Typing} name="photo" />

                                               
                                                <Form.Control type="file" ref={e => (this.photo = e)} onChange={this.photoUpdload} name="photo"/>
                                               

                                                <Form.Label >First Name</Form.Label>
                                                <Form.Control value={this.state.FirstName} onChange={this.Typing} name="FirstName" />


                                                <Form.Label >last Name</Form.Label>
                                                <Form.Control value={this.state.LastName} onChange={this.Typing} name="LastName" />
                                                {/* DatePicekr search 3leha fel el upgrades */}
                                                <Form.Label >Date Of Birth</Form.Label>
                                                <Form.Control value={this.state.DateOfBirth} onChange={this.Typing} name="DateOfBirth" />

                                                <Form.Label >Description</Form.Label>
                                                <Form.Control as="textarea" value={this.state.description} onChange={this.Typing} name="description" />

                                                


                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.ColseAddPopUp}>
                                        Close
            </Button>
                                    <Button variant="primary" onClick={this.AddNewAuthor(value)}>
                                        Add
            </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* -------------------------------------------Edit---------------------------------------------------- */}

                            <Modal show={this.state.EditPopShow} onHide={this.ColseEditPopUp}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridAddress1" >

                                                <Form.Label >Photo Url</Form.Label>

                                                <Form.Control value={this.state.photo} onChange={this.Typing} name="photo" />
                                                <Form.Control type="file" ref={e => (this.photo = e)} onChange={this.photoUpdload} name="photo"/>

                                                <Form.Label >First Name</Form.Label>
                                                <Form.Control placeholder={this.state.FirstName} value={this.state.FirstName} onChange={this.Typing} name="FirstName" />

                                                <Form.Label >Last Name</Form.Label>
                                                <Form.Control placeholder={this.state.LastName} value={this.state.LastName} onChange={this.Typing} name="LastName" />

                                                <Form.Label >Date Of Birth</Form.Label>
                                                <Form.Control placeholder={this.state.DateOfBirth} value={this.state.DateOfBirth} onChange={this.Typing} name="DateOfBirth" />

                                                <Form.Label >Description</Form.Label>
                                                <Form.Control as="textarea" placeholder={this.state.description} value={this.state.description} onChange={this.Typing} name="description" />


                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.ColseEditPopUp}>
                                        Close
                </Button>
                                    <Button variant="primary" onClick={this.SaveEdit(value, this.state._id)}>
                                        Save Changes
            </Button>
                                </Modal.Footer>
                            </Modal>

                        </React.Fragment>
                    )
                }
            </MyContext.Consumer>
        );
    }
}
