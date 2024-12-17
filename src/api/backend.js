import axios from "axios";
import { getRequest, postRequest } from "./Request";


const localhost = "http://localhost:8080";
const Product_URL = `${localhost}/api/v1/productManagement/`;
const Command_URL = `${localhost}/api/v1/commandManagement/`; 
const Contact_URL = `${localhost}/api/v1/contactManagement/`; 

export const getAllProducts = async () => {
  try {
    const products = await getRequest(Product_URL+"getAllProducts");
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error; 
  }
};

export const addNewProduct = async (product, imageFile) => {
  try {

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("productJson", JSON.stringify(product)); 

    const response = await axios.post(Product_URL + "newProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding new product:", error.message);
    throw error;
  }
};

  export const getAllCommands = async () => {
    try {
      const commands = await getRequest(Command_URL+"getAllCommands");
      return commands;
    } catch (error) {
      console.error("Error fetching all commands:", error.message);
      throw error; 
    }
  };
  
  export const addNewCommand = async (command) => {
      try {
        const response = await postRequest(Command_URL+"newCommand", command);
        return response;
      } catch (error) {
        console.error("Error adding new command:", error.message);
        throw error; 
      }
    };


    export const getAllContacts = async () => {
        try {
          const contacts = await getRequest(Contact_URL+"getAllContacts");
          return contacts;
        } catch (error) {
          console.error("Error fetching all commands:", error.message);
          throw error; 
        }
      };
      
      export const addNewContact = async (contact) => {
        console.log("Data:", contact);
        try {
          const response = await postRequest(`${Contact_URL}newContact`, contact);
          console.log("Contact added successfully:", response);
          return response;
        } catch (error) {
          console.error("Error adding new contact:", error.message);
          throw error; 
        }
      };