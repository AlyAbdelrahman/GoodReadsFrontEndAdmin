import axios from 'axios';
const BACKEN_URL="http://localhost:3000";


//------------------------------------Get All Books----------------------------------//
export const BooksInfo=(app)=>{
    return axios.get(`${BACKEN_URL}/api/books/GetAll`)
    .then((response) => {
      // handle success
    const data = response.data;
    //  console.log(app)
     app.setState({
      Books : {
      ...app.state.Books, tbody:data
    }})
    }).catch((error) => {
      // handle error
      console.log(error);
    });
}
//---------------------------------Add Book --------------------------------------//
export const AddNewBookInfo=(Book,app)=>{
  // const {tbody}=app.state.Authors;
  axios.post(`${BACKEN_URL}/api/books/Add`,Book)
  .then((response) => {
    // handle success
    BooksInfo(app);
    const data = response.data;
    // console.log(data)
  //   AuthorInfo(app);
  
}).catch((error) => {
    // handle error
    console.log("axios error")
    console.log(error);
  });}
  //-----------------------------Edit Book ------------------------------------------//
  export const EditBookInfo=(BookID,NewValues,app)=>{
    return axios.patch(`${BACKEN_URL}/api/books/${BookID}/edit`,NewValues)
  
    .then((response) => {
      // handle success
      console.log("iam here from edit api")
      console.log(response)
    BooksInfo(app);
      
     
  
  })
  .catch((error) => {
    // handle error
    console.log("axios error")
    console.log(error);
  });
}
//-----------------------------------Delete Book--------------------------------------------//
export const DeleteBookInfo=(id,app)=>{
  return axios.delete(`${BACKEN_URL}/api/books/${id}/Delete`)
  .then(() => {
    BooksInfo(app);
    console.log("B is Deleted")
  }).catch((error) => {
    // handle error
    console.log(error);
  });
}