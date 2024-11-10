document.addEventListener("DOMContentLoaded", () => {
    // Verifica se há dados da excursão no localStorage
    const excursions = JSON.parse(localStorage.getItem("excursions"));

    // Exibe os detalhes da excursão
    if (excursions && excursions.length > 0) {
        const excursion = excursions[0];
        document.getElementById("title").textContent = excursion.nome || "Nome não disponível";
        document.getElementById("description").textContent = excursion.descricao || "Descrição não disponível";
        document.getElementById("startDate").textContent = excursion.dataInicio || "Data de início não disponível";
        document.getElementById("endDate").textContent = excursion.dataFim || "Data de fim não disponível";
        document.getElementById("location").textContent = excursion.local || "Local não disponível";
        document.getElementById("price").textContent = excursion.valor ? excursion.valor.toFixed(2) : "Preço não disponível";
    } else {
        alert("Nenhuma excursão selecionada.");
        window.location.href = "home.html";
    }
});

function voltar() {
    window.location.href = "pesquisa.html";
}

// Função de logout
function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}
