window.onload = function() {
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    const carouselItemsContainer = document.getElementById('carouselItems');

    if (storedExcursions.length === 0) {
        carouselItemsContainer.innerHTML = '<p>Nenhuma excursão cadastrada.</p>';
        return;
    }

    // Gerar itens do carrossel a partir das excursões armazenadas
    storedExcursions.forEach((excursion, index) => {
        const imageUrl = excursion.imagem || 'https://via.placeholder.com/800x300?text=Sem+Imagem';
        const isActiveClass = index === 0 ? 'active' : '';

        const carouselItem = `
    <div class="carousel-item ${isActiveClass}">
        <img src="${imageUrl}" class="d-block" style="width: 50%; margin: 0 auto;" alt="Excursão ${index + 1}">

        <div class="excursion-info-box w-50" >
            <h5>${excursion.nome}</h5>
            <p><strong>Local:</strong> ${excursion.local}</p>
            <p><strong>Preço:</strong> R$ ${excursion.valor.toFixed(2)}</p>
            <a href="#" class="btn btn-dark">Saiba Mais</a>
        </div>
    </div>
`;


        carouselItemsContainer.innerHTML += carouselItem;
    });
};
