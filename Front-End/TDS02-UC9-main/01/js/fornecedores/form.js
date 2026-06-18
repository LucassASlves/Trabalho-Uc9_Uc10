const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-fornecedor');

async function carregarFornecedor() {
    if (id) {
        document.getElementById('titulo-pagina').innerText = "Editar Fornecedor";
        
        try {
            const response = await fetch(`${API_BASE_URL}/Fornecedores/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar fornecedor');
            
            const fornecedor = await response.json();
            
            document.getElementById('nome').value = fornecedor.nomeFantasia;
            document.getElementById('cnpj').value = fornecedor.cnpj;
        } catch (error) {
            console.error("Erro ao carregar fornecedor:", error);
            alert('Erro ao carregar os dados do fornecedor');
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeFantasia = document.getElementById('nome').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();

    if (!nomeFantasia || !cnpj) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }

    const fornecedorDados = {
        id: id ? parseInt(id) : 0,
        nomeFantasia: nomeFantasia,
        cnpj: cnpj
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/Fornecedores/${id}` : `${API_BASE_URL}/Fornecedores`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fornecedorDados)
        });

        if (!response.ok) throw new Error('Erro ao salvar fornecedor');
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert('Erro ao salvar o fornecedor. Tente novamente.');
    }
});

carregarFornecedor();