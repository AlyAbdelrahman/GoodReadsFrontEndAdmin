import axios from 'axios';

const BACKEN_URL="http://localhost:3000";

//------------------------------------Get All Authors----------------------------------//
export const CategoryiesInfo=(app)=>{
    return axios.get(`${BACKEN_URL}/api/categories/GetAll`)
    .then((response) => {
      // handle success
    const data = response.data;
    //  console.log(data)
     app.setState({
        Categories : {
      ...app.state.Categories, tbody:data
    }})
    }).catch((error) => {
      // handle error
      console.log(error);
    });
}
//-----------------------------AddNewCategory----------------------//
export const AddNewCategory=(Category,app)=>{
    // const {tbody}=app.state.Authors;
    axios.post(`${BACKEN_URL}/api/categories/Add`,Category)
    .then((response) => {
      // handle success
      CategoryiesInfo(app);
      const data = response.data;
      console.log(data)
    //   AuthorInfo(app);
    
  }).catch((error) => {
      // handle error
      console.log("axios error")
      console.log(error);
    });}

 //----------------------------delete category-------------------------///   
 export const DeleteCategoryInfo=(id,app)=>{
   
  return axios.delete(`${BACKEN_URL}/api/categories/${id}/Delete`)
  .then(() => {
    CategoryiesInfo(app);
    console.log("c is Deleted")
  }).catch((error) => {
    // handle error
    console.log("error fel frint")
    console.log(error);
  });
}

//---------------------------------Edit Category----------------------//
export const EditCategoryInfo=(CategoryID,NewValues,app)=>{
  
  return axios.patch(`${BACKEN_URL}/api/categories/${CategoryID}/edit`,NewValues)

.then((response) => {
  // handle success
  console.log("iam here from edit api")
  console.log(response)
  
  CategoryiesInfo(app);
  // const data = response.data;
  // AuthorInfo(app);

}).catch((error) => {
  // handle error
  console.log("axios error")
  console.log(error);
});
}
