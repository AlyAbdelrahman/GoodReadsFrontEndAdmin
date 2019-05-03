import axios from 'axios';
const BACKEN_URL="https://goodreadsback.herokuapp.com";

//------------------------------------Get All Authors----------------------------------//
export const AuthorInfo=(app)=>{
    return axios.get(`${BACKEN_URL}/api/Authors/GetAll`)
    .then((response) => {
      // handle success
    const data = response.data;
    //  console.log(app)
     app.setState({
      Authors : {
      ...app.state.Authors, tbody:data
    }})
    }).catch((error) => {
      // handle error
      console.log(error);
    });
}
//----------------------------------------Delete Author--------------------------------//
export const DeleteAuthorInfo=(id,app)=>{
  return axios.delete(`${BACKEN_URL}/api/Authors/${id}/Delete`)
  .then(() => {
    AuthorInfo(app);
    console.log("d is Deleted")
  }).catch((error) => {
    // handle error
    console.log(error);
  });
}
//-------------------------------------Add Author ---------------------------------------//


export const AddNewAuthor=(Author,app)=>{
  // const {tbody}=app.state.Authors;
  axios.post(`${BACKEN_URL}/api/Authors/Add`,Author)
  .then((response) => {
    // handle success
    AuthorInfo(app);
    const data = response.data;
    console.log(data)
    AuthorInfo(app);
  
}).catch((error) => {
    // handle error
    console.log("axios error")
    console.log(error);
  });



}

//-------------------------------------Edit Author ---------------------------------------//
export const EditAuthorInfo=(AuthorID,NewValues,app)=>{
  return axios.patch(`${BACKEN_URL}/api/Authors/${AuthorID}/edit`,NewValues)

  .then((response) => {
    // handle success
    console.log("iam here from edit api")
    console.log(response)
    
    AuthorInfo(app);
   

})
.catch((error) => {
  // handle error
  console.log("axios error")
  console.log(error);
});

}
