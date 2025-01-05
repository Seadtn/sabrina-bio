import { getRequest, postRequest } from "./Request";


//const localhost = "http://135.125.1.158:8080";
const localhost = "http://localhost:8080";
const Product_URL = `${localhost}/api/v1/productManagement/`;
const Command_URL = `${localhost}/api/v1/commandManagement/`; 
const Contact_URL = `${localhost}/api/v1/contactManagement/`; 
const Category_URL= `${localhost}/api/v1/categoryManagement/`; 
const USER_URL= `${localhost}/api/v1/authDashbord/`; 

export const getAllProducts = async () => {
  try {
    const products = await getRequest(Product_URL+"getAllProducts");
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error; 
  }
};
export const getProductById = async (id) => {
  try {
    const product = await getRequest(Product_URL+"getProductById/"+id);
    return product;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error; 
  }
};

export const getBestSellers = async () => { 
  try {
    const bestSellers = await getRequest(Product_URL + "getBestSellers");
    return bestSellers;
  } catch (error) {
    console.error("Error fetching best sellers:", error.message);
    throw error; 
  }
};

export const getRelatedProducts = async (categoryId) => { 
  try {
    const relatedProducts = await getRequest(Product_URL + "getRelatedProducts/" + categoryId);
    return relatedProducts;
  } catch (error) {
    console.error("Error fetching related products:", error.message);
    throw error; 
  }
};

export const getProductsSortedByNew = async () => { 
  try {
    const sortedProducts = await getRequest(Product_URL + "getProductsSortedByNew");
    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products sorted by new:", error.message);
    throw error; 
  }
};

export const getLatestMixedProducts = async () => {
  try {
    const response = await getRequest(Product_URL + "getLatestMixedProducts");
    return response;
  } catch (error) {
    console.error("Error fetching latest mixed products:", error.message);
    throw error;
  }
};

export const addNewProduct = async (product) => {
  try {
    const response = await postRequest(Product_URL+"newProduct", product);
    return response;
  } catch (error) {
    console.error("Error adding new product:", error.message);
    throw error; 
  }
};

export const deleteProduct = async (id) => {
  try {
   await postRequest(Product_URL+"deleteProduct/"+id);
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

    export const changeCommandStatus = async (command) => {
      try {
        const response = await postRequest(Command_URL+"changeCommandStatus",command);
        return response;
      } catch (error) {
        console.error("Error updating new command:", error.message);
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
        try {
          const response = await postRequest(`${Contact_URL}newContact`, contact);
          return response;
        } catch (error) {
          console.error("Error adding new contact:", error.message);
          throw error; 
        }
      };

      export const getAllCategories = async () => {
        try {
          const products = await getRequest(Category_URL+"getAllCategories");
          return products;
        } catch (error) {
          console.error("Error fetching all categories:", error.message);
          throw error; 
        }
      };

      export const addNewCategory = async (category) => {
        try {
          const response = await postRequest(Category_URL+"newCategory", category);
          return response;
        } catch (error) {
          console.error("Error adding new category:", error.message);
          throw error; 
        }
      };

      export const login = async (user) => {
        try {
          const response = await postRequest(USER_URL+"login", user);
          return response;
        } catch (error) {
          console.error("Authentication error :", error.message);
          throw error; 
        }
      };