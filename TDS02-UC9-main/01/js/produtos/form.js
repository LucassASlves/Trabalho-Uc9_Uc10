const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-produto');

async function carregarProduto() {
    if (id) {
        document.getElementById('titulo-pagina').innerText = "Editar Produto";
        
        try {
            const response = await fetch(`${API_BASE_URL}/Produtos/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar produto');
            
            const produto = await response.json();
            
            document.getElementById('nome').value = produto.nome;
            document.getElementById('preco').value = produto.preco;
            document.getElementById('quantidadeEstoque').value = produto.quantidadeEstoque;
            document.getElementById('fornecedorId').value = produto.fornecedorId;
        } catch (error) {
            console.error("Erro ao carregar produto:", error);
            alert('Erro ao carregar os dados do produto');
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidadeEstoque = parseInt(document.getElementById('quantidadeEstoque').value);
    const fornecedorId = parseInt(document.getElementById('fornecedorId').value);

    if (!nome || !preco || !quantidadeEstoque || !fornecedorId) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }

    if (preco < 0) {
        alert('O preço não pode ser negativo');
        return;
    }

    if (quantidadeEstoque < 0) {
        alert('A quantidade em estoque não pode ser negativa');
        return;
    }

    const produtoDados = {
        id: id ? parseInt(id) : 0,
        nome: nome,
        preco: preco,
        quantidadeEstoque: quantidadeEstoque,
        fornecedorId: fornecedorId
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/Produtos/${id}` : `${API_BASE_URL}/Produtos`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoDados)
        });

        if (!response.ok) throw new Error('Erro ao salvar produto');
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert('Erro ao salvar o produto. Tente novamente.');
    }
});

carregarProduto();