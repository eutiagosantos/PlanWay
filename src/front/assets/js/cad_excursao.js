// Função para cadastrar excursão
document.addEventListener("DOMContentLoaded", function () {
    const excursionForm = document.getElementById("excursionForm");

    if (excursionForm) {
        excursionForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const title = document.getElementById("title").value.trim();
            const description = document.getElementById("description").value.trim();
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;
            const location = document.getElementById("location").value.trim();
            const price = document.getElementById("price").value.trim();
            //const image = document.getElementById("image").files[0];

            // Validação de campos obrigatórios
            if (!title || !description || !location || !price) {
                alert("Por favor, preencha todos os campos obrigatórios!");
                return;
            }

            // Verificação se o preço é um número válido
            if (isNaN(price) || parseFloat(price) <= 0) {
                alert("Por favor, insira um valor de preço válido!");
                return;
            }

            // Verificação de datas
            if (new Date(startDate) >= new Date(endDate)) {
                alert("A data de início não pode ser maior ou igual à data de término!");
                return;
            }

            // Verificação de usuário logado
            const documento = sessionStorage.getItem('documento');
            if (!documento) {
                alert("Usuário não está logado!");
                return;
            }

            // Obtendo as excursões do localStorage
            const excursions = JSON.parse(localStorage.getItem("excursions")) || [];
            const newId = Date.now();

            // Criando o objeto de nova excursão
            const newExcursion = {
                id: newId,
                nome: title,
                descricao: description,
                dataInicio: startDate,
                dataFim: endDate,
                local: location,
                valor: parseFloat(price),
                //imagem: image ? URL.createObjectURL(image) : null,
                usuarioId: documento
            };

            // Adicionando a nova excursão no localStorage
            excursions.push(newExcursion);
            localStorage.setItem("excursions", JSON.stringify(excursions));

            // Chamando a função para cadastrar a excursão na API
            cadastrarExcursao(newExcursion);

            // Resetando o formulário
            excursionForm.reset();
            //document.getElementById('imagePreviewContainer').style.display = 'none';
            alert("Excursão cadastrada com sucesso!");
        });
    } else {
        console.error("Formulário não encontrado!");
    }
});

// Função para cadastrar excursão via API
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
    .then(data => {
        alert("Excursão cadastrada com sucesso!");
        document.getElementById("excursionForm").reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}
