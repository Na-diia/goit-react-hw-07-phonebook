import axios from "axios";

axios.defaults.baseURL ="https://6400999163e89b0913b2bc0a.mockapi.io/contacts";

export const getAllContacts = async() => {
   const {data} = await axios.get("/");
   return data;
};

export const addOneContact = async(data) => {
    const {data: result} = await axios.post("/", data);
    return result;
};

export const fetchRemoveContact = async(id) => {
    const {data} = await axios.delete(`/${id}`);
    return data;
};
