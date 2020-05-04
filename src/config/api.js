import axios from "axios";

// set config defaults while creating instance
export const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://hello-corona.herokuapp.com/api/v1",
});
