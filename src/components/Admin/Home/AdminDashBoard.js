import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { CategoriesList } from '../Categories/CategoriesListing'
import {BooksListing} from '../BooksListing/BooksListing'
import {AuthorsListing} from '../Authors/AuthorListing'
import { MyContext } from '../../../App'

const uuidv4 = require('uuid/v4');


export default class AdminDashBoard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }

render() 
{
return (
    <MyContext.Consumer>{
        
        value => (
            <React.Fragment>

        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

            <Tab key={uuidv4()} eventKey="Categories" title="Categories" >    
                <CategoriesList />
            </Tab>

            <Tab eventKey="Books" title="Books">
               <BooksListing/>
            </Tab>

            <Tab eventKey="Author" title="Author" >
                <AuthorsListing/>
            </Tab>

        </Tabs>

        </React.Fragment>
                    )
                }
</MyContext.Consumer>
)
}}

