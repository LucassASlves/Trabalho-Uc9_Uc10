const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/Fornecedores/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar fornecedor');
        
        const fornecedor = await response.json();

        document.getElementById('dados-fornecedor').innerHTML = `
            <h3>${fornecedor.nomeFantasia}</h3>
            <p><strong>CNPJ:</strong> ${fornecedor.cnpj}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-fornecedor').innerHTML = `<p style="color: red;">Erro ao carregar dados do fornecedor.</p>`;
    }
}

document.getElementById('btn-excluir').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Fornecedores/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir fornecedor');
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert('Erro ao excluir o fornecedor. Tente novamente.');
    }
});

buscarDetalhes();