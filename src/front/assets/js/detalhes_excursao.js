document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = JSON.parse(localStorage.getItem("excursions"));
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html";
            return;
        }

        if (!excursions || excursions.length === 0) {
            alert("Nenhuma excursão encontrada no localStorage.");
            window.location.href = "pesquisa.html";
            return;
        }

        const excursion = excursions.find(e => e.id === parseInt(excursionId, 10));

        if (excursion) {
            document.getElementById("title").value = excursion.nome;
            document.getElementById("description").value = excursion.descricao;
            document.getElementById("startDate").value = excursion.dataInicio;
            document.getElementById("endDate").value = excursion.dataFim;
            document.getElementById("location").value = excursion.local;
            document.getElementById("price").value = excursion.valor;

            // Exibe os participantes
            displayParticipants(excursion.participantes || []);
        } else {
            alert("Excursão não encontrada.");
            window.location.href = "pesquisa.html";
        }
    }

    loadExcursionDetails();

    // Função para exibir os participantes e quantos vão participar
    function displayParticipants(participants) {
        const participantsList = document.getElementById("participants");
        participantsList.innerHTML = ''; 
    
        const participantsCount = participants.length;
        const participantsCountDisplay = document.getElementById("participantsCount");
        participantsCountDisplay.textContent = `Total de participantes: ${participantsCount}`;

        if (participantsCount > 0) {
            participants.forEach(participant => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.textContent = participant.email;
                participantsList.appendChild(listItem);
            });
        } else {
            const noParticipantsMessage = document.createElement("li");
            noParticipantsMessage.className = "list-group-item";
            noParticipantsMessage.textContent = "Nenhum participante registrado ainda.";
            participantsList.appendChild(noParticipantsMessage);
        }
    }

    // Função para permitir a edição
    function enableEditing() {
        document.getElementById("title").readOnly = false;
        document.getElementById("description").readOnly = false;
        document.getElementById("startDate").disabled = false;
        document.getElementById("endDate").disabled = false;
        document.getElementById("location").readOnly = false;
        document.getElementById("price").readOnly = false;

        const updateBtn = document.getElementById("updateExcursionBtn");
        updateBtn.textContent = "Salvar Alterações";

        updateBtn.removeEventListener("click", enableEditing);
        updateBtn.addEventListener("click", saveChanges);
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
