import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Porta padrão do backend Spring Boot
});

export default api;