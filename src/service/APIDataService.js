import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL ?? 'http://localhost:3001/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default {
    async getAll() {
        try {
            const response = await apiClient.get(`/cadastros`);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async getSearch(params) {
        try {
            const response = await apiClient.get(`/cadastros${params}`);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async getID(id) {
        try {
            const response = await apiClient.get(`/cadastros/${id}`);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async create(data) {
        try {
            const response = await apiClient.post(`/cadastros`, data);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async update(id, data) {
        try {
            const response = await apiClient.put(`/cadastros/${id}`, data);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async delete(id) {
        try {
            const response = await apiClient.delete(`/cadastros/${id}`);
            return response;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },

    async getCEP(cep) {
        cep = cep.replace('-', '')

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar os dados da API.');
        }
    },
}