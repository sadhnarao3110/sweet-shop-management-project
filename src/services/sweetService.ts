import axios from "axios";

const API_URL = "http://localhost:3000/api/sweets";

export const getAllSweets = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const purchaseSweet = async (sweetId: number) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `http://localhost:3000/api/sweets/${sweetId}/purchase`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const restockSweet = async (sweetId: number, quantity: number) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `http://localhost:3000/api/sweets/${sweetId}/restock`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


