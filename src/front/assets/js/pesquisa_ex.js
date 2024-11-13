document.addEventListener("DOMContentLoaded", function () {
    const loadExcursionsFromAPI = () => {
        const documento = sessionStorage.getItem('documento');
        if (!documento) {
            console.error('Usuário não encontrado na sessão.');
            return;
        }

        const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
        const listContainer = document.getElementById('excursionsList');

        if (!listContainer) {
            console.error("Elemento 'excursionsList' não encontrado.");
            return;
        }

        // Filtra as excursões para exibir apenas as do usuário logado
        const userExcursions = storedExcursions.filter(excursion => excursion.usuarioId === documento);

        if (userExcursions.length === 0) {
            listContainer.innerHTML = '<p>Nenhuma excursão cadastrada por você.</p>';
            return;
        }

        listContainer.innerHTML = '';
        
        userExcursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id, imagem }) => {
            console.log("ID da excursão:", id);

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
            excursionCard.classList.add('col-md-12', 'col-lg-12', 'mb-1');

            excursionCard.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body d-flex">
                        <!--<div class="me-3" style="flex-shrink: 0;">
                            <img src="${imagem || 'default-image.jpg'}" alt="Imagem da excursão" class="img-fluid rounded" style="width: 250px; height: 250px; object-fit: cover;">
                        </div>-->

                        <div>
                            <h5 class="card-title">${validTitle}</h5>
                            <p class="card-text text-truncate">${validDescription}</p>
                            <p class="card-text"><strong>Preço:</strong> R$ ${validPrice}</p>
                            <p class="card-text"><strong>Local:</strong> ${local || 'Local não informado'}</p>
                            <p class="card-text"><strong>Período:</strong> ${formattedDataInicio} a ${formattedDataFim}</p>
                            <a href="detalhes_excursao.html?id=${id}" class="btn btn-outline-primary btn-block">Ver mais</a>
                        </div>
                    </div>
                </div>
            `;

            listContainer.appendChild(excursionCard);
        });
    };

    loadExcursionsFromAPI();
});
