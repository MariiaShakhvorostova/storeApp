import axios from "axios";

const API_URL = "https://dummyjson.com";

const apiService = {
  fetchProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

export default apiService;
