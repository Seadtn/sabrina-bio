import axios from "axios";

// GET Request
export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

// POST Request
export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error.message);
    throw error;
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error putting data:", error.message);
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error.message);
    throw error;
  }
};