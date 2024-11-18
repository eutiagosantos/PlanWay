document.addEventListener("DOMContentLoaded", function () {
    // Recuperando informações do usuário e as excursões
    const userType = sessionStorage.getItem('userType');
    const userEmail = localStorage.getItem("userEmail");
    const excursions = JSON.parse(localStorage.getItem("excursions")) || [];

    // Função para mostrar ou esconder seções conforme o tipo de usuário
    if (userType === 'cliente') {
        document.getElementById('cadastrarSection').style.display = 'none';
        document.getElementById('verExcursaoSection').style.display = 'none';
    } else if (userType === 'agencia') {
        document.getElementById('cadastrarSection').style.display = 'block';
        document.getElementById('verExcursaoSection').style.display = 'block';
    } else {
        window.location.href = 'index.html';
    }

    // Função para mostrar se o usuário está participando de alguma excursão
    function checkParticipation() {
        const participationSection = document.getElementById("participationSection");
        const userParticipatingExcursion = excursions.find(excursion =>
            excursion.participantes && excursion.participantes.some(participant => participant.email === userEmail)
        );

        if (userParticipatingExcursion) {
            const participationMessage = ` 
                <div class="alert alert-info" role="alert">
                    <h4 class="alert-heading">Você está participando da excursão!</h4>
                    <p><strong>Excursão:</strong> ${userParticipatingExcursion.nome}</p>
                    <p><strong>Data de início:</strong> ${formatDate(userParticipatingExcursion.dataInicio)}</p>
                    <p><strong>Data de término:</strong> ${formatDate(userParticipatingExcursion.dataFim)}</p>
                    <hr>
                    <p class="mb-0">Não se esqueça de acompanhar as informações e deixar sua avaliação no final da viagem!</p>
                    <a href="descricao.html?id=${userParticipatingExcursion.id}" class="btn btn-primary mt-3">Ver Detalhes</a>
                </div>
            `;
            participationSection.innerHTML = participationMessage;
        } else {
            const noParticipationMessage = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Você ainda não está participando de nenhuma excursão.</h4>
                    <p>Pesquise por excursões e participe de uma para começar sua jornada!</p>
                </div>
            `;
            participationSection.innerHTML = noParticipationMessage;
        }
    }

    // Função para formatar as datas 
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    checkParticipation();
});

window.onload = function () {
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    const carouselItemsContainer = document.getElementById('carouselItems');

    if (storedExcursions.length === 0) {
        carouselItemsContainer.innerHTML = '<p>Nenhuma excursão cadastrada.</p>';
        return;
    }

    // Gerar itens do carrossel a partir das excursões armazenadas
    storedExcursions.forEach((excursion, index, id) => {
        const imageUrl = excursion.imagem || 'https://via.placeholder.com/800x300?text=Sem+Imagem';
        const isActiveClass = index === 0 ? 'active' : '';

        const carouselItem = `
        <div class="carousel-item ${isActiveClass}">
            <img src="${imageUrl}" class="d-block" style="width: 50%; margin: 0 auto;" alt="Excursão ${index + 1}">

            <div class="excursion-info-box w-50" >
                <h5>${excursion.nome}</h5>
                <p><strong>Local:</strong> ${excursion.local}</p>
                <p><strong>Preço:</strong> R$ ${excursion.valor.toFixed(2)}</p>
                <a href="ver_excursao.html?id=${id}" class="btn btn-primary">Saiba Mais</a>
            </div>
        </div>
        `;

        carouselItemsContainer.innerHTML += carouselItem;
    });
};