// Função para carregar as excursões da API
const loadExcursionsFromAPI = () => {
    fetch('http://localhost:8081/api/excursoes/listExcursoes', { // URL da sua API
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Converte a resposta para JSON
            } else {
                throw new Error('Falha ao carregar excursões da API');
            }
        })
        .then(data => {
            console.log("Dados recebidos da API:", data);  // Verifique os dados retornados
            displayExcursions(data); // Exibe as excursões
            // Armazenar as excursões no localStorage, caso necessário
            localStorage.setItem("excursions", JSON.stringify(data));
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar excursões da API. Usando dados do LocalStorage.');
            const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
            displayExcursions(storedExcursions); // Fallback para localStorage
        });
};

// Função para exibir as excursões
const displayExcursions = (filteredExcursions) => {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

    if (filteredExcursions.length === 0) {
        listContainer.innerHTML = "<p class='text-center'>Nenhuma excursão encontrada.</p>";
        return;
    }

    // Cria um container row para os cartões
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'justify-content-center');

    // Cria os cartões de excursão
    filteredExcursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
        // Verifique se o nome e a descrição estão presentes e não vazios
        const validTitle = nome && nome.trim() !== '' ? nome : 'Sem título';
        const validDescription = descricao && descricao.trim() !== '' ? descricao : 'Sem descrição';

        // Formatar o valor (preço) para exibição
        const validPrice = valor && !isNaN(parseFloat(valor)) && parseFloat(valor) > 0
            ? parseFloat(valor).toFixed(2).replace('.', ',') // Formata o preço
            : 'Preço não disponível';

        // Formatar as datas (dataInicio e dataFim) para exibição
        const formatDate = (dateString) => {
            const date = new Date(dateString); // Convertendo para objeto Date
            const day = String(date.getDate()).padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa de 0, então somamos 1
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const formattedDataInicio = formatDate(dataInicio);
        const formattedDataFim = formatDate(dataFim);

        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-12', 'col-lg-12', 'mb-1'); // Adiciona as classes para o layout

        excursionCard.innerHTML = `
            <div class="card shadow-sm">
                <img src="./assets/img/excursion-placeholder.jpg" class="card-img-top" alt="Imagem da excursão">
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

        // Adiciona o cartão no container
        rowContainer.appendChild(excursionCard);
    });

    listContainer.appendChild(rowContainer); // Adiciona o container de cartões na lista
};

// Carregar excursões ao abrir a página
loadExcursionsFromAPI();

// Filtro de pesquisa
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    // Buscando excursões da API com base no filtro
    fetch('http://localhost:8081/api/excursoes/listExcursoes') // URL da sua API
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar excursões da API');
            }
            return response.json();
        })
        .then(data => {
            // Adicionando log para inspecionar os dados
            console.log('Dados recebidos da API:', data);

            // Filtra as excursões de acordo com o título ou descrição
            const filteredExcursions = data.filter(({ nome, descricao }) => {
                // Verifica se os campos estão presentes e não vazios antes de realizar a pesquisa
                const titleValid = nome && nome.toLowerCase().includes(searchTerm);
                const descriptionValid = descricao && descricao.toLowerCase().includes(searchTerm);
                return titleValid || descriptionValid;
            });

            // Limita a 10 resultados e exibe
            const limitedExcursions = filteredExcursions.slice(0, 10);
            displayExcursions(limitedExcursions);
        })
        .catch(error => {
            console.error('Erro ao buscar excursões:', error);
            alert('Erro ao buscar excursões da API. Usando dados do LocalStorage.');
            const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
            displayExcursions(storedExcursions); // Fallback para localStorage
        });
});
