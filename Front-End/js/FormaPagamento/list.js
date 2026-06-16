async function carregarFormasPagamento() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento`);
        const formasPagamento = await response.json();

        const tbody = document.getElementById('tabela-formas-pagamento');
        tbody.innerHTML = '';

        formasPagamento.forEach(formaPagamento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formaPagamento.id}</td>
                <td>${formaPagamento.nome}</td>
                <td>${formaPagamento.ativo ? 'Sim' : 'Não'}</td>
                <td class="actions">
                    <a href="form.html?id=${formaPagamento.id}">Editar</a>
                    <a href="excluir.html?id=${formaPagamento.id}" style="color: var(--danger-color);">Excluir</a>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Erro ao carregar as formas de pagamento:", error);
    }
}

carregarFormasPagamento();