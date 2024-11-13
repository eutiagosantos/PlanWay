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

            const excursionCard = document.createElement('div');
            excursionCard.classList.add('col-md-4', 'col-lg-3', 'col-sm-6', 'mb-4', 'justify-content-center'); 

            excursionCard.innerHTML = `
            <div class="card" style="width: 350px;">
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

    loadExcursionsFromAPI();

// Filtro de pesquisa
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();

    if (searchTerm === '') {
        loadExcursionsFromAPI();
        return;
    }

    fetch('http://localhost:8081/api/excursoes/listExcursoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar excursões da API');
            }
            return response.json();
        })
        .then(data => {
            const filteredExcursions = data.filter(({ nome, descricao }) => {
                return (nome && nome.toLowerCase().includes(searchTerm)) ||
                       (descricao && descricao.toLowerCase().includes(searchTerm));
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
    function displayExcursions(excursions) {
        const listContainer = document.getElementById('excursionsList');
        listContainer.innerHTML = '';
    
        if (excursions.length === 0) {
            listContainer.innerHTML = '<p>Nenhuma excursão encontrada.</p>';
            return;
        }
    
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

});