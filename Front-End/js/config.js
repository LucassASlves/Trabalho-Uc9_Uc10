const API_BASE_URL = 'https://localhost:7135/api';

// Função para montar cabeçalhos padrão
function getHeaders() {
    const headers =  {
        'Content-Type': 'application/json'
    }

    // tenta carregar o token do local storage
    const token = localStorage.getItem('token');

    if(token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}