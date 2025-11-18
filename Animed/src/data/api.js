import axios from 'axios';

// SEMPRE use o IP da máquina aqui
const API_URL = "http://10.0.0.10:3000/api/vets";

export const getVets = async () => {
  try {
    console.log("[getVets] Tentando acessar:", API_URL);
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("[getVets] Falha na chamada da API:", error);
    throw error;
  }
};
