document.getElementById("excursionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const location = document.getElementById("location").value.trim();
    const price = document.getElementById("price").value.trim();

    console.log({ title, description, startDate, endDate, location, price });

    if (!title || !description || !location || !price) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Cria um novo objeto de excursão
    const newExcursion = {
        nome: title,
        descricao: description,
        dataInicio: startDate,
        dataFim: endDate,
        local: location,
        valor: parseFloat(price)
    };

    // Salva a excursão
    const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
    storedExcursions.push(newExcursion);
    localStorage.setItem("excursions", JSON.stringify(storedExcursions));

    cadastrarExcursao(newExcursion);
});

function cadastrarExcursao(newExcursion) {
    fetch('http://localhost:8081/api/excursoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExcursion)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Falha ao cadastrar a excursão!');
            }
        })
        .then(newExcursion => {
            alert("Excursão cadastrada com sucesso!");
            document.getElementById("excursionForm").reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message);
        });
}
