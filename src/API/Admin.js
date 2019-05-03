import axios from "axios";

const URL = process.env.REACT_APP_BackEnd_URL || "https://goodreadsback.herokuapp.com";

export const adminLogin = ({ name, password }) => {
  //   debugger;
  return axios.post(`${URL}/admin/login`, { name, password }).then(res => res.data);
};

export const getAdminProfile = () => {
  return axios.get(`${URL}/admin/dashboard`, { headers: { authorization: `Bearer ${localStorage.getItem("adminToken")}` } }).then(res => res.data);
};
