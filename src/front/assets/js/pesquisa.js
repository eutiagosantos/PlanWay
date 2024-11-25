// Função para carregar todas as excursões da API
function loadExcursionsFromAPI() {
    fetch('http://localhost:8081/api/excursoes/listExcursoes')  // URL para buscar todas as excursões
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar excursões da API');
            }
            return response.json();  // Converte a resposta em JSON
        })
        .then(data => {
            displayExcursions(data);  // Exibe as excursões retornadas pela API
        })
        .catch(error => {
            console.error('Erro ao buscar excursões:', error);
            alert('Erro ao buscar excursões da API.');
        });
}

// Função para exibir as excursões na página
function displayExcursions(excursions) {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = '';  // Limpa a lista antes de renderizar as novas excursões

    if (excursions.length === 0) {
        listContainer.innerHTML = '<p>Nenhuma excursão encontrada.</p>';
        return;
    }

    // Para cada excursão, cria um cartão de excursão na página
    excursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-4', 'col-lg-3', 'col-sm-6', 'mb-4');

        excursionCard.innerHTML = `
            <div class="card" style="width: 350px;">
                <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${descricao}</p>
                    <p class="card-text">R$ ${valor}</p>
                    <p class="card-text">${local}</p>
                    <p class="card-text">${dataInicio} - ${dataFim}</p>
                    <a href="ver_excursao.html?id=${id}" class="btn btn-primary">Ver mais</a>
                </div>
            </div>
        `;
        listContainer.appendChild(excursionCard);
    });
}

// Função para filtrar as excursões com base no campo de pesquisa
function filterExcursions() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const allExcursions = document.querySelectorAll('.card');  // Todos os cartões de excursões

    allExcursions.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();

        // Verifica se o nome ou a descrição da excursão contém o termo de pesquisa
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = '';  // Exibe o cartão
        } else {
            card.style.display = 'none';  // Oculta o cartão
        }
    });
}

// Espera o carregamento completo do DOM antes de executar
document.addEventListener('DOMContentLoaded', function () {
    // Carrega as excursões ao carregar a página
    loadExcursionsFromAPI();

    // Filtro de pesquisa
    document.getElementById('searchInput').addEventListener('input', filterExcursions);
});
