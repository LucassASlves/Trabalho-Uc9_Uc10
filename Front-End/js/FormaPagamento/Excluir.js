const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);

        if (!response.ok)
            throw new Error('Erro ao carregar forma de pagamento');

        const formaPagamento = await response.json();

        document.getElementById('dados-forma-pagamento').innerHTML = `
            <h3>${formaPagamento.nome}</h3>
            <p><strong>Tipo:</strong> ${formaPagamento.ativo ? 'Débito' : 'Crédito'}</p>

        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-forma-pagamento').innerHTML =
            `<p style="color:red;">Erro ao carregar os dados.</p>`;
    }
}

document.getElementById('btn-excluir').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok)
            throw new Error('Erro ao excluir');

        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir a forma de pagamento.");
        
    }document.getElementById("btn-pagar").addEventListener("click", () => {
    alert(`Pagamento realizado com a forma: ${document.querySelector("#dados-forma-pagamento h3").innerText}`);
});
    
});

buscarDetalhes();