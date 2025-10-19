import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody = null) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
  };

  try {
    const response = await axios(reqConfig);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; 
  }
};

export default commonAPI;
