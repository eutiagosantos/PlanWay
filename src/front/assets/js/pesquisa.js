// Espera o carregamento completo do DOM antes de executar
document.addEventListener("DOMContentLoaded", function () {
    const loadExcursionsFromAPI = () => {
        const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
        const listContainer = document.getElementById('excursionsList');

        if (!listContainer) {
            console.error("Elemento 'excursionsList' não encontrado.");
            return;
        }

        if (storedExcursions.length === 0) {
            listContainer.innerHTML = '<p>Nenhuma excursão cadastrada.</p>';
            return;
        }

        listContainer.innerHTML = '';

        storedExcursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id, imagem }) => {
            const validTitle = nome && nome.trim() !== '' ? nome : 'Sem título';
            const validDescription = descricao && descricao.trim() !== '' ? descricao : 'Sem descrição';
            const validPrice = valor && !isNaN(parseFloat(valor)) && parseFloat(valor) > 0
                ? parseFloat(valor).toFixed(2).replace('.', ',')
                : 'Preço não disponível';

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };

            const formattedDataInicio = formatDate(dataInicio);
            const formattedDataFim = formatDate(dataFim);

            // Criação do cartão de excursão com imagem à esquerda
            const excursionCard = document.createElement('div');
            excursionCard.classList.add('col-md-12', 'col-lg-12', 'mb-1');

            excursionCard.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body d-flex">
                        <div class="me-3" style="flex-shrink: 0;">
                            <!--<img src="${imagem || 'default-image.jpg'}" alt="Imagem da excursão" class="img-fluid rounded" style="width: 250px; height: 250px; object-fit: cover;">-->
                        </div>
                        <!-- Texto da excursão -->
                        <div>
                            <h5 class="card-title">${validTitle}</h5>
                            <p class="card-text text-truncate">${validDescription}</p>
                            <p class="card-text"><strong>Preço:</strong> R$ ${validPrice}</p>
                            <p class="card-text"><strong>Local:</strong> ${local || 'Local não informado'}</p>
                            <p class="card-text"><strong>Período:</strong> ${formattedDataInicio} a ${formattedDataFim}</p>
                            <a href="ver_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                        </div>
                    </div>
                </div>
            `;

            listContainer.appendChild(excursionCard);
        });
    };

    // Carregar as excursões ao carregar a página
    loadExcursionsFromAPI();

// Filtro de pesquisa
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
});