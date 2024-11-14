document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = localStorage.getItem("excursions") ? JSON.parse(localStorage.getItem("excursions")) : [];
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        if (isNaN(excursionId)) {
            alert("ID da excursão não fornecido ou inválido.");
            window.location.href = "pesquisa.html";
            return;
        }

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

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date)) return ''; 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    document.getElementById("participateButton").addEventListener("click", () => {
        $('#confirmModal').modal('show');
    });

    document.getElementById("confirmParticipateButton").addEventListener("click", () => {
        const excursionId = new URLSearchParams(window.location.search).get("id");

        if (!excursionId || isNaN(excursionId)) {
            alert("ID da excursão não fornecido ou inválido.");
            return;
        }
    
        const userEmail = localStorage.getItem("userEmail") || "Usuário não identificado";
        const user = { email: userEmail };
    
        participateInExcursion(parseInt(excursionId, 10), user);
        $('#confirmModal').modal('hide');
    });

    function participateInExcursion(excursionId, participant) {
        const excursions = JSON.parse(localStorage.getItem("excursions") || '[]');
        const excursion = excursions.find(e => parseInt(e.id, 10) === excursionId);

        if (excursion) {
            if (!excursion.participantes) {
                excursion.participantes = [];
            }

            const participantExists = excursion.participantes.some(p => p.email === participant.email);
            if (!participantExists) {
                excursion.participantes.push(participant);
            }

            localStorage.setItem("excursions", JSON.stringify(excursions));

            alert("Você entrou na excursão com sucesso!");
        } else {
            alert("Excursão não encontrada.");
        }
    }

    function voltar() {
        window.location.href = "pesquisa.html";
    }

    function logout() {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userType");
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    }
});
