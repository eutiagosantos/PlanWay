document.addEventListener("DOMContentLoaded", () => {
    let excursionId;

    // Função para carregar os detalhes da excursão
    function loadExcursionDetails() {
        const excursions = JSON.parse(localStorage.getItem("excursions"));

        if (!excursions || excursions.length === 0) {
            alert("Nenhuma excursão encontrada no localStorage.");
            window.location.href = "pesquisa.html";
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        excursionId = urlParams.get("id");

        excursionId = parseInt(excursionId, 10);

        if (!excursionId) {
            alert("ID da excursão não fornecido ou inválido.");
            window.location.href = "pesquisa.html";
            return;
        }

        const excursion = excursions.find(e => e.id === parseInt(excursionId, 10));

        if (excursion) {
            document.getElementById("title").textContent = excursion.nome || "Nome não disponível";
            document.getElementById("description").textContent = excursion.descricao || "Descrição não disponível";
            document.getElementById("startDate").textContent = formatDate(excursion.dataInicio) || "Data de início não disponível";
            document.getElementById("endDate").textContent = formatDate(excursion.dataFim) || "Data de fim não disponível";
            document.getElementById("location").textContent = excursion.local || "Local não disponível";
            document.getElementById("price").textContent = excursion.valor ? `R$ ${excursion.valor.toFixed(2).replace('.', ',')}` : "Preço não disponível";

            //const imageSrc = excursion.imagem || 'https://via.placeholder.com/800x300?text=Sem+Imagem';
            //const imgElement = document.getElementById("excursionImage");
            //imgElement.src = imageSrc;
        } else {
            alert("Excursão não encontrada.");
            window.location.href = "pesquisa.html";
        }
    }

    loadExcursionDetails();

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
