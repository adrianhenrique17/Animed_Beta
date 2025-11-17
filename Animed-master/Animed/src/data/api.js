import axios from 'axios';
import { Platform } from 'react-native';

// Endereço IP da sua máquina.
// Use '192.168.18.11' para o seu celular, como você confirmou.
const YOUR_LOCAL_IP_ADDRESS = '192.168.18.11'; 

// Esta é a lógica que define a URL da API automaticamente
let apiUrl;

if (Platform.OS === 'android') {
  // Para o emulador Android
  apiUrl = 'http://10.0.2.2:3000/api/vets';
} else if (Platform.OS === 'ios') {
  // Para o simulador iOS
  apiUrl = 'http://localhost:3000/api/vets';
} else {
  // Para dispositivos físicos (seu celular, por exemplo) e para o Web
  apiUrl = `http://${YOUR_LOCAL_IP_ADDRESS}:3000/api/vets`;
}

// A sua tela VetsScreen importará esta constante e a função getVets
export const API_URL = apiUrl;

export const getVets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("[getVets] Falha na chamada da API:", error);
    throw error;
  }
};