const form = document.getElementById("formFormaPagamento");

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

if (form) {
    const id = getIdFromUrl();

    // if editing, carregar dados existentes
    if (id) {
        carregarDados(id);
    }

    form.addEventListener("submit", async (event) => { 
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const dados = { nome };

        try {
            const headers = getHeaders();

            const method = id ? 'PUT' : 'POST';
            const url = id ? `${API_BASE_URL}/FormaPagamento/${id}` : `${API_BASE_URL}/FormaPagamento`;

            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(dados)
            });

            if (!response.ok) { 
                // tenta ler corpo da resposta para obter mensagem de erro
                let errorBody = '';
                try {
                    const text = await response.text();
                    // tenta parsear JSON, se for JSON, pretty-print
                    try {
                        const json = JSON.parse(text);
                        errorBody = JSON.stringify(json);
                    } catch { errorBody = text; }
                } catch (e) {
                    errorBody = '<sem corpo de resposta>';
                }

                const err = new Error(`Request failed: ${response.status} ${response.statusText} - ${errorBody}`);
                err.status = response.status;
                err.body = errorBody;
                throw err;
            }

            alert('Forma de pagamento salva com sucesso!');
            window.location.href = 'index.html';

        } catch (erro) {
            console.error(erro);
            alert('Erro ao salvar. Verifique o console e o endpoint.');
        }
    });
}

async function carregarDados(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar dados');
        const forma = await response.json();
        document.getElementById('nome').value = forma.nome || '';
    } catch (err) {
        console.error('Erro ao carregar forma de pagamento:', err);
    }
}