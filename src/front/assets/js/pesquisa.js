// Função para carregar as excursões da API
const loadExcursionsFromAPI = () => {
    fetch('http://localhost:8081/api/excursoes/listExcursoes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Falha ao carregar excursões da API');
            }
        })
        .then(data => {
            console.log("Dados recebidos da API:", data); 
            displayExcursions(data);
            localStorage.setItem("excursions", JSON.stringify(data));
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar excursões da API. Usando dados do LocalStorage.');
            const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
            displayExcursions(storedExcursions);
        });
};

// Função para exibir as excursões
const displayExcursions = (filteredExcursions) => {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = '';

    if (filteredExcursions.length === 0) {
        listContainer.innerHTML = "<p class='text-center'>Nenhuma excursão encontrada.</p>";
        return;
    }

    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'justify-content-center');

    // Cria os cartões de excursão
    filteredExcursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
        const validTitle = nome && nome.trim() !== '' ? nome : 'Sem título';
        const validDescription = descricao && descricao.trim() !== '' ? descricao : 'Sem descrição';

        const validPrice = valor && !isNaN(parseFloat(valor)) && parseFloat(valor) > 0
            ? parseFloat(valor).toFixed(2).replace('.', ',') 
            : 'Preço não disponível';

        // Formatar as datas para exibição
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const formattedDataInicio = formatDate(dataInicio);
        const formattedDataFim = formatDate(dataFim);
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-12', 'col-lg-12', 'mb-1');

        excursionCard.innerHTML = `
            <div class="card shadow-sm">
            
                <div class="card-body">
                    <h5 class="card-title">${validTitle}</h5>
                    <p class="card-text text-truncate">${validDescription}</p>
                    <p class="card-text"><strong>Preço:</strong> R$ ${validPrice}</p>
                    <p class="card-text"><strong>Local:</strong> ${local || 'Local não informado'}</p>
                    <p class="card-text"><strong>Período:</strong> ${formattedDataInicio} a ${formattedDataFim}</p>
                    <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                </div>
            </div>
        `;

        rowContainer.appendChild(excursionCard);
    });

    listContainer.appendChild(rowContainer);
};

loadExcursionsFromAPI();

// Buscando excursões da API com base no filtro
document.getElementById('searchInput').addEventListener('input', function () {

    const searchTerm = this.value.toLowerCase();

    fetch('http://localhost:8081/api/excursoes/listExcursoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar excursões da API');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos da API:', data);
            const filteredExcursions = data.filter(({ nome, descricao }) => {
                const titleValid = nome && nome.toLowerCase().includes(searchTerm);
                const descriptionValid = descricao && descricao.toLowerCase().includes(searchTerm);
                return titleValid || descriptionValid;
            });

            const limitedExcursions = filteredExcursions.slice(0, 10);
            displayExcursions(limitedExcursions);
        })
        .catch(error => {
            console.error('Erro ao buscar excursões:', error);
            alert('Erro ao buscar excursões da API. Usando dados do LocalStorage.');
            const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
            displayExcursions(storedExcursions);
        });
});
