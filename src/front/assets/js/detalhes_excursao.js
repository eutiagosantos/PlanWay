document.addEventListener("DOMContentLoaded", () => {
    let excursionId; // Variável global para manter o ID da excursão

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = JSON.parse(localStorage.getItem("excursions"));

        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id"); // Definindo o excursionId aqui

        if (!excursionId) {
            alert("ID da excursão não fornecido.");
            window.location.href = "pesquisa.html";
            return;
        }

        // Verificar se as excursões estão no localStorage
        if (!excursions || excursions.length === 0) {
            alert("Nenhuma excursão encontrada no localStorage.");
            window.location.href = "pesquisa.html";
            return;
        }

        // Procurar a excursão pelo ID
        const excursion = excursions.find(e => e.id === parseInt(excursionId, 10));

        if (excursion) {
            // Exibir os dados da excursão
            document.getElementById("title").value = excursion.nome;
            document.getElementById("description").value = excursion.descricao;
            document.getElementById("startDate").value = excursion.dataInicio;
            document.getElementById("endDate").value = excursion.dataFim;
            document.getElementById("location").value = excursion.local;
            document.getElementById("price").value = excursion.valor;
            document.getElementById("additionalServices").value = excursion.servicosAdicionais;

            // Adicionar evento ao botão de deletar excursão
            document.getElementById("deleteExcursionBtn").addEventListener("click", () => deleteExcursao(excursion.id));

            // Verificar se o botão de alteração existe no DOM antes de adicionar o evento
            const updateBtn = document.getElementById("updateExcursionBtn");
            if (updateBtn) {
                updateBtn.addEventListener("click", enableEditing);
            } else {
                console.error("Botão de alteração não encontrado.");
            }
        } else {
            // Caso a excursão não seja encontrada
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

        // Mudar o texto do botão para "Salvar Alterações"
        const updateBtn = document.getElementById("updateExcursionBtn");
        updateBtn.textContent = "Salvar Alterações";

        // Alterar o evento de "Alterar Excursão" para "Salvar"
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

        // Verificar se o documento é um CPF (11 dígitos)
        if (userDocumento.length === 11) {
            alert("Usuários com CPF não podem alterar uma excursão.");
            return;
        }

        // Obter os novos valores dos campos de entrada
        const updatedExcursion = {
            id: excursionId, // Usando a variável excursionId global
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

        // Verificar se o documento é um CPF (11 dígitos)
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
