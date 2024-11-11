// Função para pré-visualizar e converter a imagem para Base64
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = reader.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Função para cadastrar excursão
document.addEventListener("DOMContentLoaded", function() {
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
            const image = document.getElementById("image").files[0];

            if (!title || !description || !location || !price) {
                alert("Por favor, preencha todos os campos obrigatórios!");
                return;
            }

            const excursions = JSON.parse(localStorage.getItem("excursions")) || [];
            const newId = excursions.length > 0 ? excursions[excursions.length - 1].id + 1 : 1;

            const newExcursion = {
                id: newId,
                nome: title,
                descricao: description,
                dataInicio: startDate,
                dataFim: endDate,
                local: location,
                valor: parseFloat(price),
                imagem: image ? URL.createObjectURL(image) : null
            };


            excursions.push(newExcursion);
            localStorage.setItem("excursions", JSON.stringify(excursions));

            cadastrarExcursao(newExcursion);

            excursionForm.reset();
            document.getElementById('imagePreviewContainer').style.display = 'none';
            alert("Excursão cadastrada com sucesso!");
        });
    } else {
        console.error("Formulário não encontrado!");
    }
});


// Função para cadastrar excursão e enviar imagem para o servidor
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
// Função para ler a imagem e converter para Base64
function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const base64Image = reader.result;

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const location = document.getElementById("location").value.trim();
        const price = document.getElementById("price").value.trim();

        if (!title || !description || !location || !price) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        // Cria o objeto de excursão
        const newExcursion = {
            nome: title,
            descricao: description,
            dataInicio: startDate,
            dataFim: endDate,
            local: location,
            valor: parseFloat(price),
            imagem: base64Image
        };

        const storedExcursions = JSON.parse(localStorage.getItem("excursions")) || [];
        storedExcursions.push(newExcursion);
        localStorage.setItem("excursions", JSON.stringify(storedExcursions));
        
        cadastrarExcursao(newExcursion);

        document.getElementById("excursionForm").reset();
        document.getElementById('imagePreviewContainer').style.display = 'none';
        alert("Excursão cadastrada com sucesso!");
    };

    reader.readAsDataURL(file);
}

