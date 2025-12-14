import axios from "axios";

const API_URL = "http://localhost:3000/api/sweets";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};


export const getAllSweets = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};


export const purchaseSweet = async (id: number) => {
  const response = await axios.post(
    `${API_URL}/${id}/purchase`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const restockSweet = async (sweetId: number, quantity: number) => {
  const response = await axios.post(
    `${API_URL}/${sweetId}/restock`,
    { quantity },
    getAuthHeaders()
  );
  return response.data;
};

