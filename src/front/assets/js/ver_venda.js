document.addEventListener("DOMContentLoaded", function () {
    // Obtém o e-mail do usuário logado do localStorage ou de outra fonte
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Erro: Usuário não encontrado.");
        return;
    }

    // Função para buscar os detalhes da venda do usuário
    async function getVendaDetails(email) {
        try {
            const response = await fetch(`http://localhost:8081/api/vendas/listVenda/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Venda não encontrada.");
            }

            const venda = await response.json();
            console.log("Detalhes da venda:", venda);  // Verifique no console

            // Verificar e exibir dados de venda, tratando valores null
            if (venda && venda.nomeExcursao) {

                const valor = venda.valor ? `R$ ${venda.valor.toFixed(2)}` : "Valor não disponível";

                displayVendaDetails(venda, valor);
            } else {
                alert("Venda não encontrada ou dados incompletos.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar os detalhes da venda.");
        }
    }

    function displayVendaDetails(venda, valor) {
        // Exibir detalhes da venda no HTML
        document.getElementById('vendaTitle').textContent = venda.nomeExcursao;
        document.getElementById('excursionPrice').textContent = valor;  // Exibe valor com formatação
    }


    // Chama a função para buscar os detalhes da venda com base no e-mail
    getVendaDetails(userEmail);
});

// Função que será chamada quando o usuário clicar em "Sair"
document.getElementById('logoutButton').addEventListener('click', function () {
    const email = localStorage.getItem("userEmail"); // Obtém o email do usuário do localStorage

    if (!email) {
        alert("Não foi possível obter o e-mail do usuário.");
        return;
    }

    // Realizar a requisição DELETE para deletar a venda
    fetch(`http://localhost:8081/api/vendas/deleteVenda/${email}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {

                alert("Venda deletada com sucesso!");

                window.location.href = 'home.html';
            } else {

                alert("Erro ao deletar a venda. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao tentar deletar a venda:", error);
            alert("Erro ao tentar deletar a venda.");
        });
});

