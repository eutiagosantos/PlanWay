document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = JSON.parse(localStorage.getItem("excursions")) || [];
        const eventPast = JSON.parse(localStorage.getItem("eventPast")) || [];
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html";
            return;
        }

        // Busca na lista de excursões ativas e passadas
        let excursion = excursions.find(e => e.id === parseInt(excursionId, 10));
        if (!excursion) {
            excursion = eventPast.find(e => e.id === parseInt(excursionId, 10));
        }

        if (!excursion) {
            alert("Excursão não encontrada.");
            window.location.href = "pesquisa.html";
            return;
        }

        // Exibe os detalhes da excursão
        document.getElementById("title").value = excursion.nome;
        document.getElementById("description").value = excursion.descricao;
        document.getElementById("startDate").value = excursion.dataInicio;
        document.getElementById("endDate").value = excursion.dataFim;
        document.getElementById("location").value = excursion.local;
        document.getElementById("price").value = excursion.valor;

        // Exibe os participantes
        displayParticipants(excursion.participantes || []);
        
        // Verifica se a excursão já foi finalizada ou está ativa
        if (eventPast.some(e => e.id === excursion.id)) {
            document.getElementById("finishExcursionBtn").disabled = true; // Desabilita o botão de finalizar
            document.getElementById("finishExcursionBtn").style.display = 'none'; // Oculta o botão
        } else {
            document.getElementById("finishExcursionBtn").disabled = false; // Habilita o botão
        }
    }

    loadExcursionDetails();

    // Função para exibir os participantes e o contador
    function displayParticipants(participants) {
        const participantsList = document.getElementById("participants");
        participantsList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        // Exibe o número de participantes
        const participantsCount = participants.length;
        const participantsCountDisplay = document.getElementById("participantsCount");
        participantsCountDisplay.textContent = `Total de participantes: ${participantsCount}`;

        if (participantsCount > 0) {
            participants.forEach(participant => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.textContent = participant.email; // Exibindo o email ou outro dado do participante
                participantsList.appendChild(listItem);
            });
        } else {
            const noParticipantsMessage = document.createElement("li");
            noParticipantsMessage.className = "list-group-item";
            noParticipantsMessage.textContent = "Nenhum participante registrado ainda.";
            participantsList.appendChild(noParticipantsMessage);
        }
    }

    // Função para finalizar a excursão
    function finishExcursion() {
        let excursions = JSON.parse(localStorage.getItem("excursions")) || [];
        let eventPast = JSON.parse(localStorage.getItem("eventPast")) || [];

        // Encontra a excursão que será finalizada
        const excursion = excursions.find(e => e.id === parseInt(excursionId, 10));

        if (!excursion) {
            alert("Excursão não encontrada.");
            return;
        }

        // Remove a excursão de "excursions"
        excursions = excursions.filter(e => e.id !== excursion.id);

        // Adiciona a excursão a "eventPast"
        eventPast.push(excursion);

        // Atualiza o localStorage com as listas modificadas
        localStorage.setItem("excursions", JSON.stringify(excursions));
        localStorage.setItem("eventPast", JSON.stringify(eventPast));

        alert("A excursão foi finalizada e movida para eventos passados.");
        window.location.href = "pesquisa.html"; // Redireciona de volta à página de pesquisa
    }

    // Adiciona o evento de clique no botão "Finalizar Excursão"
    const finishBtn = document.getElementById("finishExcursionBtn");
    if (finishBtn) {
        finishBtn.addEventListener("click", finishExcursion);
    }

    // Função para salvar as alterações feitas
    function saveChanges() {
        const userDocumento = sessionStorage.getItem("documento");

        if (!userDocumento) {
            alert("Usuário não está logado.");
            window.location.href = "login.html";
            return;
        }

        if (userDocumento.length === 11) {
            alert("Usuários com CPF não podem alterar uma excursão.");
            return;
        }

        const updatedExcursion = {
            id: excursionId,
            nome: document.getElementById("title").value,
            descricao: document.getElementById("description").value,
            dataInicio: document.getElementById("startDate").value,
            dataFim: document.getElementById("endDate").value,
            local: document.getElementById("location").value,
            valor: document.getElementById("price").value,
            servicosAdicionais: document.getElementById("additionalServices").value
        };

        fetch(`http://localhost:8081/api/excursoes/${excursionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExcursion)
        })
            .then(response => {
                if (response.ok) {
                    alert("Excursão alterada com sucesso.");
                    window.location.href = "pesquisa.html";
                } else if (response.status === 403) {
                    alert("Você não tem permissão para alterar esta excursão.");
                } else {
                    alert("Erro ao alterar excursão.");
                }
            })
            .catch(error => console.error("Erro ao alterar excursão:", error));
    }

    // Função para excluir a excursão
    function deleteExcursao(excursionId) {
        const userDocumento = sessionStorage.getItem("documento");

        if (!userDocumento) {
            alert("Usuário não está logado.");
            window.location.href = "login.html";
            return;
        }
        
        if (userDocumento.length === 11) {
            alert("Usuários com CPF não podem deletar uma excursão.");
            return;
        }

        fetch(`http://localhost:8081/api/excursoes/${excursionId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert("Excursão deletada com sucesso.");
                    window.location.href = "pesquisa.html";
                } else if (response.status === 403) {
                    alert("Você não tem permissão para deletar esta excursão.");
                } else {
                    alert("Erro ao deletar excursão.");
                }
            })
            .catch(error => console.error("Erro ao deletar excursão:", error));
    }
});
