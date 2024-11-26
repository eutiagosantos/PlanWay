document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html";
            return;
        }

        excursionId = parseInt(excursionId, 10);

        if (isNaN(excursionId)) {
            alert("ID da excursão inválido.");
            window.location.href = "pesquisa.html";
            return;
        }

        const storedExcursions = JSON.parse(localStorage.getItem("excursoes")) || [];
        const excursion = storedExcursions.find(e => e.id === excursionId);

        if (excursion) {
            // Exibe os detalhes da excursão
            document.getElementById("title").value = excursion.nome || "Sem título";
            document.getElementById("description").value = excursion.descricao || "Sem descrição";
            document.getElementById("startDate").value = excursion.dataInicio || "";
            document.getElementById("endDate").value = excursion.dataFim || "";
            document.getElementById("location").value = excursion.local || "Local não informado";
            document.getElementById("price").value = excursion.valor || 0;

            // Exibe os participantes
            displayParticipants(excursion.participantes || []);
        } else {
            alert("Excursão não encontrada no localStorage.");
            window.location.href = "pesquisa.html";
        }
    }

    // Função para exibir os participantes da excursão
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
                listItem.textContent = participant;
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
    document.getElementById("finishExcursionBtn").addEventListener("click", function () {
        const storedExcursions = JSON.parse(localStorage.getItem("excursoes")) || [];
        const pastExcursions = JSON.parse(localStorage.getItem("excursoesPast")) || [];

        const excursionIndex = storedExcursions.findIndex(e => e.id === excursionId);

        if (excursionIndex !== -1) {
            const [finishedExcursion] = storedExcursions.splice(excursionIndex, 1);
            pastExcursions.push(finishedExcursion);

            localStorage.setItem("excursoes", JSON.stringify(storedExcursions));
            localStorage.setItem("excursoesPast", JSON.stringify(pastExcursions));

            fetch(`http://localhost:8081/api/excursoes/finalizar/${excursionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        alert("Excursão finalizada com sucesso!");
                        window.location.href = "pesquisa.html";
                    } else {
                        throw new Error("Erro ao finalizar a excursão na API.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao finalizar excursão na API:", error);
                    alert("A excursão foi movida localmente, mas houve um erro ao finalizar na API.");
                });
        } else {
            alert("Excursão não encontrada na lista atual.");
        }
    });

    loadExcursionDetails();
});
