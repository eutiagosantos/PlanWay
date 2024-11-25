document.addEventListener("DOMContentLoaded", function () {
    const excursionId = new URLSearchParams(window.location.search).get('id');
    const userEmail = localStorage.getItem("userEmail"); // Aqui você pode buscar o email do usuário que está logado

    if (!excursionId || !userEmail) {
        alert("Erro: Dados da excursão ou usuário não encontrados.");
        return;
    }

    // Função para buscar os detalhes da excursão
    async function getExcursionDetails(id) {
        try {
            const response = await fetch(`http://localhost:8081/api/excursoes/listExcursao/${id}`); // Ajuste a URL conforme necessário
            if (!response.ok) {
                throw new Error("Não foi possível carregar os detalhes da excursão.");
            }
            const excursion = await response.json();
            console.log(excursion);
            displayExcursionDetails(excursion);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar os detalhes da excursão.");
        }
    }

    // Função para mostrar os detalhes da excursão na página
    function displayExcursionDetails(excursion) {
        document.getElementById('title').textContent = excursion.nome;
        document.getElementById('description').textContent = excursion.descricao;
        document.getElementById('startDate').textContent = formatDate(excursion.dataInicio);
        document.getElementById('endDate').textContent = formatDate(excursion.dataFim);
        document.getElementById('location').textContent = excursion.local;
        document.getElementById('price').textContent = `R$ ${excursion.valor.toFixed(2)}`;

        // Salvar os dados da excursão para enviar quando o usuário clicar no botão
        window.excursionData = excursion;
    }

    // Função para formatar a data
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para realizar a venda
    async function realizarVenda(excursionData, userEmail) {
        try {
            const venda = {
                valor: excursionData.valor,
                emailUsuario: userEmail,
                nomeExcursao: excursionData.nome,
                localExcursao: excursionData.local
                // Aqui você pode adicionar mais informações da excursão se necessário
            };

            const response = await fetch('http://localhost:8081/api/vendas/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(venda)
            });

            if (!response.ok) {
                throw new Error("Erro ao realizar a venda.");
            }

            const result = await response.json();
            alert("Venda realizada com sucesso!");
            console.log(result); // Exibe o resultado da venda no console
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar a venda.");
        }
    }

    // Ação ao clicar no botão de participar
    document.getElementById('participateButton').addEventListener('click', function () {
        // Exibir o modal de confirmação
        $('#confirmModal').modal('show');
    });

    // Quando o usuário confirma no modal
    document.getElementById('confirmParticipateButton').addEventListener('click', function () {
        // Fechar o modal
        $('#confirmModal').modal('hide');

        // Realizar a venda
        realizarVenda(window.excursionData, userEmail);
    });

    // Carregar os detalhes da excursão
    getExcursionDetails(excursionId);
});
