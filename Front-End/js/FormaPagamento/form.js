const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const form = document.getElementById("form-forma-pagamento");

async function carregarFormaPagamento() {
    if (id) {
        document.getElementById("titulo-pagina").innerText = "Editar Forma de Pagamento";

        try {
            const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);

            if (!response.ok)
                throw new Error("Erro ao carregar forma de pagamento.");

            const formaPagamento = await response.json();

            document.getElementById("nome").value = formaPagamento.nome;
            document.getElementById("ativo").value = formaPagamento.ativo.toString();

        } catch (error) {
            console.error(error);
            alert("Erro ao carregar os dados.");
        }
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const ativo = document.getElementById("ativo").value === "true";

    if (!nome) {
        alert("Informe o nome da forma de pagamento.");
        return;
    }

    const dados = {
        id: id ? parseInt(id) : 0,
        nome: nome,
        ativo: ativo
    };

    const method = id ? "PUT" : "POST";
    const url = id
        ? `${API_BASE_URL}/FormaPagamento/${id}`
        : `${API_BASE_URL}/FormaPagamento`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok)
            throw new Error("Erro ao salvar.");

        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao salvar a forma de pagamento.");
    }
});

carregarFormaPagamento();