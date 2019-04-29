import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import UpperNavBar from "./components/Navbar/upperNav";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import AdminDashBoard from "./components/Admin/Home/AdminDashBoard";
import { categories, myBooks, authors } from "./data/data";
import {AuthorInfo,DeleteAuthorInfo,AddNewAuthor,EditAuthorInfo} from './API/Author';
import {CategoryiesInfo,AddNewCategory,DeleteCategoryInfo,EditCategoryInfo} from './API/Categories';
import{BooksInfo,DeleteBookInfo,AddNewBookInfo,EditBookInfo} from './API/Books';

export const MyContext = React.createContext();
class App extends React.Component {
  state = {
    Categories : {
      th: ['ID', 'Name','Action'],
      tbody: []},

   Books : {
    th: ['ID', 'photo','Name','CategoryId','AuthorId','Action'],
    tbody: []
},

    Authors: {
      th:['ID' , 'photo' , 'FirstName' , 'LastName' , 'DateOfBirth', 'Action'],

      tbody: []
    }
  };
 

//-------------Books------------------------------//
AddNewBook=(Book)=>{
  // console.log(Book)
  AddNewBookInfo(Book,this);
  }

DeleteBook=(BookID)=>{
  console.log(BookID);
  DeleteBookInfo(BookID,this);
  }
 
  EditBook=(BookID, NewValues)=>{
    EditBookInfo(BookID,NewValues,this);
    }

  
//---------------Categories---------------------------//
AddCategory=(Category)=>{
AddNewCategory(Category,this);
}

DeleteCategory=(CategoryID)=>{
DeleteCategoryInfo(CategoryID,this);
}
  
EditCategory=(CategoryID, NewValues)=>{
EditCategoryInfo(CategoryID,NewValues,this);
}



  // -----------Author----------------------------------//


  componentDidMount(){
    CategoryiesInfo(this);
    AuthorInfo(this);
    BooksInfo(this);
  }
  AddNewAuthor=(Author)=>{
    AddNewAuthor(Author,this)
  }
  
  EditAuthor=(AuthorID, NewValues)=>{
  EditAuthorInfo(AuthorID,NewValues,this);
  }
  
  DeleteAuthor=(AuthorID)=>{
  DeleteAuthorInfo(AuthorID,this);
  }
  
  // /////////////////////////////////////////////////////////////////////////////////////////


  render() {
    const value = {
      state: this.state,

      AddNewAuthor:this.AddNewAuthor,
      EditAuthor:this.EditAuthor,
      DeleteAuthor:this.DeleteAuthor,

     
      AddCategory:this.AddCategory,
      DeleteCategory :this.DeleteCategory,
      EditCategory:this.EditCategory,

      AddNewBook:this.AddNewBook,
      DeleteBook:this.DeleteBook,
      EditBook:this.EditBook,
      


      myBooks: myBooks,
      authors: authors
    };

    return (
      <MyContext.Provider value={value}>
        <div className="App" id="App">
          <Router>
            <UpperNavBar />
            <>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/Admin" exact component={AdminDashBoard} />

              </Switch>
            </>
          </Router>
        </div>
      </MyContext.Provider>
    );
  }
}

export default App;
