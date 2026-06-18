async function carregarContas() {
    try {
        const response = await fetch(`${API_BASE_URL}/ContasReceber`);
        if (!response.ok) throw new Error('Erro ao carregar contas a receber');
        
        const contas = await response.json();
        
        const tbody = document.getElementById('tabela-contas');
        tbody.innerHTML = '';

        contas.forEach(conta => {
            const dataVencimento = new Date(conta.dataVencimento).toLocaleDateString('pt-BR');
            const statusClass = conta.status === 'Pago' ? 'status-pago' : conta.status === 'Cancelado' ? 'status-cancelado' : 'status-pendente';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${conta.id}</td>
                <td>${conta.descricao}</td>
                <td>R$ ${conta.valor.toFixed(2)}</td>
                <td>${dataVencimento}</td>
                <td><span class="${statusClass}">${conta.status}</span></td>
                <td class="actions">
                    <a href="detalhes.html?id=${conta.id}">Detalhes</a>
                    <a href="form.html?id=${conta.id}">Editar</a>
                    <a href="excluir.html?id=${conta.id}" style="color: var(--danger-color);">Excluir</a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar as contas a receber:", error);
        document.getElementById('tabela-contas').innerHTML = '<tr><td colspan="6" style="color: red;">Erro ao carregar contas a receber.</td></tr>';
    }
}

carregarContas();
