document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html"; // Redireciona para pesquisa se não encontrar o ID
            return;
        }

        // Converte o ID para número para garantir a consistência
        excursionId = parseInt(excursionId, 10);

        // Verifica se o ID é um número válido
        if (isNaN(excursionId)) {
            alert("ID da excursão inválido.");
            window.location.href = "pesquisa.html"; // Redireciona para pesquisa se o ID for inválido
            return;
        }

        // Faz a requisição para obter os detalhes da excursão pelo ID
        fetch(`http://localhost:8081/api/excursoes/listExcursao/${excursionId}`)
            .then(response => response.json())
            .then(excursion => {
                if (!excursion) {
                    alert("Excursão não encontrada.");
                    window.location.href = "pesquisa.html"; // Redireciona para pesquisa se não encontrar a excursão
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
            })
            .catch(error => {
                console.error("Erro ao carregar os detalhes da excursão:", error);
                alert("Erro ao carregar os dados da excursão.");
            });
    }

    // Função para exibir os participantes da excursão
    function displayParticipants(participants) {
        const participantsList = document.getElementById("participants");
        participantsList.innerHTML = ''; // Limpa a lista antes de adicionar novos participantes

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

    // Função para alterar os detalhes da excursão
    document.getElementById("updateExcursionBtn").addEventListener("click", function () {
        // Habilita os campos para alteração
        document.getElementById("title").readOnly = false;
        document.getElementById("description").readOnly = false;
        document.getElementById("startDate").readOnly = false;
        document.getElementById("endDate").readOnly = false;
        document.getElementById("location").readOnly = false;
        document.getElementById("price").readOnly = false;

        // Muda o texto do botão para "Salvar Alterações"
        this.textContent = "Salvar Alterações";

        // Quando o botão for clicado novamente, enviar as alterações para a API
        this.addEventListener("click", function () {
            const updatedExcursion = {
                nome: document.getElementById("title").value,
                descricao: document.getElementById("description").value,
                dataInicio: document.getElementById("startDate").value,
                dataFim: document.getElementById("endDate").value,
                local: document.getElementById("location").value,
                valor: parseFloat(document.getElementById("price").value)
            };

            // Enviar a requisição PUT para atualizar os detalhes da excursão
            fetch(`http://localhost:8081/api/excursoes/update/${excursionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExcursion)
            })
                .then(response => {
                    if (response.ok) {
                        alert("Excursão atualizada com sucesso!");
                        window.location.reload(); // Recarrega a página para exibir as alterações
                    } else {
                        alert("Erro ao atualizar a excursão.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao enviar a atualização:", error);
                    alert("Erro ao atualizar a excursão.");
                });
        });
    });

    // Função para deletar a excursão
    document.getElementById("deleteExcursaoBtn").addEventListener("click", function () {
        const confirmDelete = confirm("Tem certeza que deseja deletar esta excursão?");
        if (confirmDelete) {
            fetch(`http://localhost:8081/api/excursoes/delete/${excursionId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        alert("Excursão deletada com sucesso!");
                        window.location.href = "pesquisa.html"; // Redireciona para a página de pesquisa
                    } else {
                        alert("Erro ao deletar a excursão.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao deletar a excursão:", error);
                    alert("Erro ao deletar a excursão.");
                });
        }
    });

    loadExcursionDetails();
});
