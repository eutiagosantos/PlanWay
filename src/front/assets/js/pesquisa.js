// Função para carregar excursões do Local Storage e exibi-las
const loadExcursionsFromStorage = () => {
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    displayExcursions(storedExcursions); // Exibe todas as excursões inicialmente
};

// Função para exibir excursões
const displayExcursions = (filteredExcursions) => {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = ''; // Limpa a lista antes de exibir

    if (filteredExcursions.length === 0) {
        listContainer.innerHTML = "<p class='text-center'>Nenhuma excursão encontrada.</p>";
        return;
    }

    // Cria um container row para os cartões
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'justify-content-center'); // Classe 'row' para layout em linha

    filteredExcursions.forEach(({ title, description, price, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-4', 'col-lg-3', 'mb-4'); // Cada cartão ocupa 4 colunas em telas médias e 3 colunas em telas grandes

        excursionCard.innerHTML = `
            <div class="card shadow-sm">
                <!--<img src="./assets/img/excursion-placeholder.jpg" class="card-img-top" alt="Imagem da excursão" onerror="this.src='./assets/img/excursion-placeholder.jpg';">-->
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text text-truncate">${description}</p>
                    <p class="card-text"><strong>Preço:</strong> R$ ${isNaN(parseFloat(price)) ? 'N/A' : parseFloat(price).toFixed(2).replace('.', ',')}</p> <!-- Exibição do preço com formatação -->
                    <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                </div>
            </div>
        `;

        // Adiciona o cartão ao rowContainer
        rowContainer.appendChild(excursionCard);
    });

    // Adiciona o rowContainer à lista de excursões
    listContainer.appendChild(rowContainer);
};

// Carregar excursões ao abrir a página
loadExcursionsFromStorage();

// Filtro de pesquisa
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];

    // Filtra as excursões com base no título ou descrição
    const filteredExcursions = storedExcursions.filter(({ title, description }) => 
        title.toLowerCase().includes(searchTerm) || 
        description.toLowerCase().includes(searchTerm)
    );

    // Limita a quantidade de excursões exibidas para 10 (pode ajustar conforme necessário)
    const limitedExcursions = filteredExcursions.slice(0, 10);

    displayExcursions(limitedExcursions); // Exibe as excursões filtradas
});
