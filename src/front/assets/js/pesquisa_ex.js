document.addEventListener("DOMContentLoaded", function () {
    function getUserEmail() {
        return localStorage.getItem('userEmail');
    }

    function loadUserExcursions() {
        fetch('http://localhost:8081/api/excursoes/listExcursoes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar excursões da API');
                }
                return response.json();
            })
            .then(data => {
                displayExcursions(data);
            })
            .catch(error => {
                console.error('Erro ao buscar excursões:', error);
                alert('Erro ao buscar excursões da API.');
            });
    }

    // Função para exibir as excursões do usuário na página
    function displayExcursions(excursions) {
        const listContainer = document.getElementById('excursionsList');
        listContainer.innerHTML = ''; 

        if (excursions.length === 0) {
            listContainer.innerHTML = '<p>Você ainda não criou nenhuma excursão.</p>';
            return;
        }

        excursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
            const excursionCard = document.createElement('div');
            excursionCard.classList.add('col-md-4', 'col-lg-12');

            excursionCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${nome}</h5>
                        <p class="card-text">${descricao}</p>
                        <p class="card-text"><strong>Preço:</strong> R$ ${valor.toFixed(2).replace('.', ',')}</p>
                        <p class="card-text"><strong>Local:</strong> ${local}</p>
                        <p class="card-text"><strong>Período:</strong> ${formatDate(dataInicio)} - ${formatDate(dataFim)}</p>
                        <p class="card-text"><strong>Status:</strong> Ativa</p>
                        <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary">Ver Detalhes</a>
                    </div>
                </div>
            `;
            listContainer.appendChild(excursionCard);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    loadUserExcursions();
});
