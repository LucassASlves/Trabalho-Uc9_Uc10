const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/ContasReceber/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar conta');
        
        const conta = await response.json();

        const dataVencimento = new Date(conta.dataVencimento).toLocaleDateString('pt-BR');
        const dataPagamento = conta.dataPagamento ? new Date(conta.dataPagamento).toLocaleDateString('pt-BR') : 'N/A';

        document.getElementById('dados-conta').innerHTML = `
            <p><strong>ID:</strong> ${conta.id}</p>
            <p><strong>Descrição:</strong> ${conta.descricao}</p>
            <p><strong>Valor:</strong> R$ ${conta.valor.toFixed(2)}</p>
            <p><strong>Data de Vencimento:</strong> ${dataVencimento}</p>
            <p><strong>Data de Pagamento:</strong> ${dataPagamento}</p>
            <p><strong>Status:</strong> ${conta.status}</p>
            <p><strong>ID do Cliente:</strong> ${conta.clienteId}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-conta').innerHTML = `<p style="color: red;">Erro ao carregar detalhes da conta.</p>`;
    }
}

buscarDetalhes();
