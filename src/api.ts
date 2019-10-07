import axios from "axios";

export const getAll = async () => {
  return axios("http://localhost:3000/accounts").then(response => response.data);
};

export const deleteAccount = async (id: string) => {
  console.log("delete", id);
  return axios("http://localhost:3000/accounts/delete").then(response => response.data);
};
