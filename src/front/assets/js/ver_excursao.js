document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (isNaN(excursionId)) {
            alert("ID da excursão não fornecido ou inválido.");
            window.location.href = "pesquisa.html";
            return;
        }

        const excursions = JSON.parse(localStorage.getItem("excursions") || '[]');
        if (!excursions || excursions.length === 0) {
            alert("Nenhuma excursão encontrada no localStorage.");
            window.location.href = "pesquisa.html";
            return;
        }

        const excursion = excursions.find(e => parseInt(e.id, 10) === parseInt(excursionId, 10));

        if (excursion) {
            document.getElementById("title").textContent = excursion.nome || "Nome não disponível";
            document.getElementById("description").textContent = excursion.descricao || "Descrição não disponível";
            document.getElementById("startDate").textContent = formatDate(excursion.dataInicio) || "Data de início não disponível";
            document.getElementById("endDate").textContent = formatDate(excursion.dataFim) || "Data de fim não disponível";
            document.getElementById("location").textContent = excursion.local || "Local não disponível";
            document.getElementById("price").textContent = excursion.valor ? `R$ ${excursion.valor.toFixed(2).replace('.', ',')}` : "Preço não disponível";
        } else {
            alert("Excursão não encontrada.");
            window.location.href = "pesquisa.html";
        }
    }

    loadExcursionDetails();

    // Função para formatar a data no formato dd/mm/aaaa
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date)) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Abrir o modal de confirmação quando o usuário clica em "Participar"
    document.getElementById("participateButton").addEventListener("click", () => {
        const excursionId = new URLSearchParams(window.location.search).get("id");

        if (!excursionId || isNaN(excursionId)) {
            alert("ID da excursão não fornecido ou inválido.");
            return;
        }

        const userEmail = localStorage.getItem("userEmail") || "Usuário não identificado";
        const user = { email: userEmail };

        participateInExcursion(parseInt(excursionId, 10), user);
        $('#confirmModal').modal('show');
    });

    // Confirmar a participação e adicionar o usuário na excursão
    document.getElementById("confirmParticipateButton").addEventListener("click", () => {
        const userEmail = localStorage.getItem("userEmail") || "Usuário não identificado";
        const priceText = document.getElementById("price").textContent;  // Obtenha o texto do preço
        const valor = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());


        const participant = {
            valor: valor,
            emailUsuario: userEmail
        };
        console.log(participant);
        participateInExcursion(participant);
        $('#confirmModal').modal('hide');
        voltar();
    });

    // Exemplo de requisição POST para o backend
    function participateInExcursion(participant) {
        // URL da API onde você vai enviar os dados
        const url = 'http://localhost:8081/api/vendas/cadastro';

        // Enviar os dados do participante para o backend
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(participant)
        })
            .then(response => {
                // Verificar se a resposta foi bem-sucedida (status 2xx)
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro: ${response.status} - ${text || response.statusText}`);
                    });
                }
                // Tentar converter a resposta para JSON
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);

                // Verificar se o campo 'success' está presente na resposta (ajuste conforme a API)
                if (data.success) {
                    alert("Você entrou na excursão com sucesso!");
                    // Pode redirecionar ou fazer outra ação aqui, caso necessário
                }
            })

    }


    // Função para voltar à página de pesquisa
    function voltar() {
        window.location.href = "home.html";
    }

    // Função para realizar logout
    function logout() {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userType");
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    }
});
