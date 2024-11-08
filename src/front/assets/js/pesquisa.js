// Função faz aparecer as excursoes do local storage
const loadExcursionsFromStorage = () => {
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    displayExcursions(storedExcursions);
};

// Função para exibir excursões
const displayExcursions = (filteredExcursions) => {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = ''; 

    if (filteredExcursions.length === 0) {
        listContainer.innerHTML = "<p class='text-center'>Nenhuma excursão encontrada.</p>";
        return;
    }

    // Cria um container row para os cartões
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'justify-content-center');

    // Coloca os cartões que puxam as informações do cad_excursao
    filteredExcursions.forEach(({ title, description, price, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-12', 'col-lg-12', 'mb-1'); 

        excursionCard.innerHTML = `
            <div class="card shadow-sm">
                <img src="./assets/img/excursion-placeholder.jpg" class="card-img-top" alt="Imagem da excursão">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text text-truncate">${description}</p>
                    <p class="card-text"><strong>Preço:</strong> R$ ${isNaN(parseFloat(price)) ? 'N/A' : parseFloat(price).toFixed(2).replace('.', ',')}</p> 
                    <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                </div>
            </div>
        `;

        // Adiciona o cartão no card
        rowContainer.appendChild(excursionCard);
    });

    listContainer.appendChild(rowContainer);
};

// Carregar excursões ao abrir a página
loadExcursionsFromStorage();

// Filtro de pesquisa
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];

    const filteredExcursions = storedExcursions.filter(({ title, description }) => 
        title.toLowerCase().includes(searchTerm) || 
        description.toLowerCase().includes(searchTerm)
    );

    const limitedExcursions = filteredExcursions.slice(0, 10);
    displayExcursions(limitedExcursions);

});
