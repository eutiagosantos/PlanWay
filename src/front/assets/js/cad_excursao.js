document.getElementById("excursionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura os dados do formulário
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const location = document.getElementById("location").value.trim();
    const price = document.getElementById("price").value.trim();
    const additionalServices = document.getElementById("additionalServices").value.trim();

    // Validação dos campos obrigatórios
    if (!title || !description || !location || !price) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Cria um novo objeto de excursão
    const newExcursion = {
        id: Date.now(), // ID único baseado no timestamp
        title,
        description,
        startDate,
        endDate,
        location,
        price,
        additionalServices
    };

    // Obtém as excursões do Local Storage, ou um array vazio se não houver nenhuma
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    
    // Adiciona a nova excursão ao array
    storedExcursions.push(newExcursion);
    
    // Salva o array atualizado no Local Storage
    localStorage.setItem("excursions", JSON.stringify(storedExcursions));

    // Confirma o cadastro e limpa o formulário
    alert("Excursão cadastrada com sucesso!");
    event.target.reset();
});
