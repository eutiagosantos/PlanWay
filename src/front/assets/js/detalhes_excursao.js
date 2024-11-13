document.addEventListener("DOMContentLoaded", function () {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = JSON.parse(localStorage.getItem("excursions"));
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        console.log("ID da excursão (da URL):", excursionId);

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html";
            return;
        }

        // Verifica se as excursões estão no localStorage
        if (!excursions || excursions.length === 0) {
            alert("Nenhuma excursão encontrada no localStorage.");
            window.location.href = "pesquisa.html";
            return;
        }

        const excursion = excursions.find(e => e.id === parseInt(excursionId, 10));

        // Se a excursão for encontrada
        if (excursion) {
            document.getElementById("title").value = excursion.nome;
            document.getElementById("description").value = excursion.descricao;
            document.getElementById("startDate").value = excursion.dataInicio;
            document.getElementById("endDate").value = excursion.dataFim;
            document.getElementById("location").value = excursion.local;
            document.getElementById("price").value = excursion.valor;
            document.getElementById("additionalServices").value = excursion.servicosAdicionais;

            document.getElementById("deleteExcursionBtn").addEventListener("click", () => deleteExcursao(excursion.id));

            const updateBtn = document.getElementById("updateExcursionBtn");
            if (updateBtn) {
                updateBtn.addEventListener("click", enableEditing);
            } else {
                console.error("Botão de alteração não encontrado.");
            }
        } else {
            alert("Excursão não encontrada.");
            window.location.href = "pesquisa.html";
        }
    }

    loadExcursionDetails();

    function enableEditing() {
        // Liberar os campos para edição
        document.getElementById("title").readOnly = false;
        document.getElementById("description").readOnly = false;
        document.getElementById("startDate").disabled = false;
        document.getElementById("endDate").disabled = false;
        document.getElementById("location").readOnly = false;
        document.getElementById("price").readOnly = false;
        document.getElementById("additionalServices").readOnly = false;

        const updateBtn = document.getElementById("updateExcursionBtn");
        updateBtn.textContent = "Salvar Alterações";

        updateBtn.removeEventListener("click", enableEditing);
        updateBtn.addEventListener("click", saveChanges);
    }

    function saveChanges() {
        const userDocumento = sessionStorage.getItem("documento");

        if (!userDocumento) {
            alert("Usuário não está logado.");
            window.location.href = "login.html";
            return;
        }

        // Verificar se o documento é um CPF
        if (userDocumento.length === 11) {
            alert("Usuários com CPF não podem alterar uma excursão.");
            return;
        }

        // Obter os novos valores dos campos de entrada
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

    function deleteExcursao(excursionId) {
        const userDocumento = sessionStorage.getItem("documento");

        if (!userDocumento) {
            alert("Usuário não está logado.");
            window.location.href = "login.html";
            return;
        }

        // Verificar se o documento é um CPF
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
