// Simulação de dados de excursões cadastradas
const excursions = [
    { title: "Excursão para as Montanhas", description: "Uma viagem incrível para as montanhas com guias experientes.", id: 1 },
    { title: "Tour pela Cidade Histórica", description: "Visite os pontos mais famosos da cidade e conheça sua história.", id: 2 },
    { title: "Passeio na Praia Paradisíaca", description: "Desfrute de um dia de sol e mar na praia mais bonita da região.", id: 3 },
    { title: "Aventura na Floresta", description: "Explore trilhas e tenha uma experiência de aventura em meio à natureza.", id: 4 },
];

// Função para exibir as excursões
const displayExcursions = (filteredExcursions = excursions) => {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = ''; // Limpa a lista antes de exibir

    if (filteredExcursions.length === 0) {
        listContainer.innerHTML = "<p class='text-center'>Nenhuma excursão encontrada.</p>";
        return;
    }

    filteredExcursions.forEach(({ title, description, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-12', 'excursion-card');  // Cada excursão ocupa uma linha
        excursionCard.innerHTML = `
            <div class="card shadow-sm">
                <img src="./assets/img/excursion-placeholder.jpg" class="card-img-top" alt="Imagem da excursão">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text text-truncate">${description}</p>
                    <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                </div>
            </div>
        `;
        listContainer.appendChild(excursionCard);
    });
};

// Filtrando as excursões com base no campo de pesquisa
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredExcursions = excursions.filter(({ title, description }) => 
        title.toLowerCase().includes(searchTerm) || 
        description.toLowerCase().includes(searchTerm)
    );
    displayExcursions(filteredExcursions);
});

// Carrega as excursões na página inicialmente
displayExcursions();