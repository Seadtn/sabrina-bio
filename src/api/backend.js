import { getRequest, postRequest } from "./Request";
import axios from "axios";

//const localhost = "https://135.125.1.158:8080";
// const localhost = "https://sabrina-bio.tn"; // Production
// const localhost = "http://localhost:8080"; // Local
const localhost = "http://192.168.1.10:8080"; // phone test
// const localhost = "http://192.168.234.10:8080"; // Telnet
const Product_URL = `${localhost}/api/v1/productManagement/`;
const Command_URL = `${localhost}/api/v1/commandManagement/`;
const Contact_URL = `${localhost}/api/v1/contactManagement/`;
const Category_URL = `${localhost}/api/v1/categoryManagement/`;
const ProductOTY_URL = `${localhost}/api/v1/productoty/`;
const USER_URL = `${localhost}/api/v1/authDashbord/`;

export const getAllProducts = async () => {
  try {
    const products = await getRequest(Product_URL + "getAllProducts");
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
};

export const getPaginatedProducts = async (params) => {
  const queryParams = new URLSearchParams({
    offset: params.offset || 0,
    limit: params.limit || 9,
    ...(params.categoryId && { categoryId: params.categoryId }),
    ...(params.subcategoryId && { subcategoryId: params.subcategoryId }),
    ...(params.search && { search: params.search }),
    ...(params.sort && { sort: params.sort })
  }).toString();

  const response = await getRequest(`${Product_URL}getAllProductsbyPages?${queryParams}`);
  return response;
};

export const getPaginatedProductsTable = async (params) => {
  const queryParams = new URLSearchParams({
    offset: params.offset || 0,
    limit: params.limit || 10,
    ...(params.categoryId && { categoryId: params.categoryId }),
    ...(params.subcategoryId && { subcategoryId: params.subcategoryId }),
    ...(params.search && { search: params.search }),
    ...(params.sort && { sort: params.sort })
  }).toString();

  const response = await getRequest(`${Product_URL}getAllProductsbyPagesTable?${queryParams}`);
  return response;
};
export const getProductById = async (id) => {
  try {
    const product = await getRequest(Product_URL + "getProductById/" + id);
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
    const relatedProducts = await getRequest(
      Product_URL + "getRelatedProducts/" + categoryId
    );
    return relatedProducts;
  } catch (error) {
    console.error("Error fetching related products:", error.message);
    throw error;
  }
};

export const getProductsInHomePage = async () => {
  try {
    const sortedProducts = await getRequest(
      Product_URL + "getHomePageProducts"
    );
    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products Home page:", error.message);
    throw error;
  }
};

export const getLatestOnSoldProduct = async () => {
  try {
    const sortedProducts = await getRequest(
      Product_URL + "getLatestPromotionedProducts"
    );
    return sortedProducts;
  } catch (error) {
    console.error("Error fetching products Home page:", error.message);
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
    const response = await postRequest(Product_URL + "newProduct", product);
    return response;
  } catch (error) {
    console.error("Error adding new product:", error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await postRequest(Product_URL + "deleteProduct/" + id);
  } catch (error) {
    console.error("Error adding new product:", error.message);
    throw error;
  }
};
export const searchProductsByName = async (name) => {
  const response = await getRequest(`${Product_URL}search?name=${name}`);
  return response; 
};
export const getAllCommands = async (offset = 0, limit = 10) => {
  try {
    const response = await getRequest(
      `${Command_URL}getAllCommands?offset=${offset}&limit=${limit}`
    );
    return response; 
  } catch (error) {
    console.error("Error fetching all commands:", error.message);
    throw error;
  }
};


export const addNewCommand = async (command) => {
  try {
    const response = await postRequest(Command_URL + "newCommand", command);
    return response;
  } catch (error) {
    console.error("Error adding new command:", error.message);
    throw error;
  }
};

export const changeCommandStatus = async (command) => {
  try {
    const response = await postRequest(
      Command_URL + "changeCommandStatus",
      command
    );
    return response;
  } catch (error) {
    console.error("Error updating new command:", error.message);
    throw error;
  }
};
export const getAllContacts = async () => {
  try {
    const contacts = await getRequest(Contact_URL + "getAllContacts");
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
    const products = await getRequest(Category_URL + "getAllCategories");
    return products;
  } catch (error) {
    console.error("Error fetching all categories:", error.message);
    throw error;
  }
};

export const addNewCategory = async (category) => {
  try {
    const response = await postRequest(Category_URL + "newCategory", category);
    return response;
  } catch (error) {
    console.error("Error adding new category:", error.message);
    throw error;
  }
};
export const getAllSousCategories = async () => {
  try {
    const products = await getRequest(Category_URL + "getAllSousCategories");
    return products;
  } catch (error) {
    console.error("Error fetching all subcategories:", error.message);
    throw error;
  }
};

export const addNewSousCategory = async (category) => {
  try {
    const response = await postRequest(
      Category_URL + "newSousCategory",
      category
    );
    return response;
  } catch (error) {
    console.error("Error adding new subcategories:", error.message);
    throw error;
  }
};
export const promoteSubCategory = async (subCategoryId) => {
  try {
    // Making a POST request to promote the subcategory by passing the ID
    const response = await postRequest(`${Category_URL}promote-souscategory/${subCategoryId}`);
    return response;
  } catch (error) {
    console.error("Error promoting subcategory:", error.message);
    throw error;
  }
};
export const getSousCategoriesbyIdCategory = async (id) => {
  try {
    const products = await getRequest(
      Category_URL + "getSousCategoriesbyIdCategory/" + id
    );
    return products;
  } catch (error) {
    console.error("Error fetching all  subcategories:", error.message);
    throw error;
  }
};
export const login = async (user) => {
  try {
    const response = await postRequest(USER_URL + "login", user);
    return response;
  } catch (error) {
    console.error("Authentication error :", error.message);
    throw error;
  }
};

// Get paginated ProductOTY items with total count
export const getPaginatedProductOTY = async (offset = 0, limit = 10) => {
  const response = await axios.get(ProductOTY_URL, {
    params: { offset, limit },
  });
  return response.data; // { products: [...], totalCount: number }
};

// Get a specific ProductOTY by ID
export const getProductOTYById = async (id) => {
  const response = await axios.get(`${ProductOTY_URL}${id}`);
  return response.data;
};

// Get a active ProductOTY by ID
export const getActiveProductOTY = async () => {
    try {
      const product = await getRequest(ProductOTY_URL + "active");
      if (!product || Object.keys(product).length === 0) {
        // Handle the case where no active product exists
        console.log("No active Product of the Year found.");
        return null; // or return a default value
      }
      return product;
    } catch (error) {
      console.error("Error fetching active Product of the Year:", error.message);
      throw error;
    }
};

// Create a new ProductOTY
export const createProductOTY = async (productOTY) => {
  const response = await axios.post(ProductOTY_URL, productOTY);
  return response.data;
};

// Update an existing ProductOTY by ID
export const updateProductOTY = async (id, productOTY) => {
  const response = await axios.put(`${ProductOTY_URL}${id}`, productOTY);
  return response.data;
};

// Delete a ProductOTY by ID
export const deleteProductOTY = async (id) => {
  const response = await axios.delete(`${ProductOTY_URL}${id}`);
  return response.data;
};