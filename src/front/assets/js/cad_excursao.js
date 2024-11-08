document.getElementById("excursionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const location = document.getElementById("location").value.trim();
    const price = document.getElementById("price").value.trim();
    const additionalServices = document.getElementById("additionalServices").value.trim();

    if (!title || !description || !location || !price) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Cria um novo objeto de excursão
    const newExcursion = {
        id: Date.now(),
        title,
        description,
        startDate,
        endDate,
        location,
        price,
        additionalServices
    };

    // Obtém as excursões do Local Storage, ou um array vazio se estiver vazio
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    storedExcursions.push(newExcursion);
    localStorage.setItem("excursions", JSON.stringify(storedExcursions));

    alert("Excursão cadastrada com sucesso!");
    event.target.reset();
});
