document.addEventListener("DOMContentLoaded", function () {
    const excursionForm = document.getElementById('excursionForm');
    const excursaoKey = "excursoes"; 

    const userEmail = localStorage.getItem('userEmail');

    // Função para gerar um ID único para as excursões no localStorage


    // Função para recuperar os dados do formulário
    function getFormData() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        const additionalServices = document.getElementById('additionalServices').value;

        return {

            nome: title,
            descricao: description,
            dataInicio: startDate,
            dataFim: endDate,
            local: location,
            valor: parseFloat(price),
            servicosAdicionais: additionalServices || '',
            email: userEmail,
        };
    }

    // Função para salvar os dados no localStorage
    function saveToLocalStorage(excursionData) {
        const existingExcursoes = JSON.parse(localStorage.getItem(excursaoKey)) || [];
        existingExcursoes.push(excursionData);
        localStorage.setItem(excursaoKey, JSON.stringify(existingExcursoes));
        console.log("Excursão salva no localStorage:", excursionData);
    }

    // Função para enviar os dados para a API e salvar no localStorage
    function submitFormData(event) {
        event.preventDefault();

        const documento = localStorage.getItem('userDocumento');

        if (!documento || documento.length !== 14) {
            alert('Você deve ser uma agência (CNPJ) para criar excursões.');
            return; 
        }

        const formData = getFormData();
        saveToLocalStorage(formData);

        fetch('http://localhost:8081/api/excursoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao criar excursão');
                }
                return response.json();
            })
            .then((data) => {
                alert('Excursão criada com sucesso!');
                excursionForm.reset();
            })
            .catch((error) => {
                console.error('Erro ao enviar dados para a API:', error);
                alert('Erro ao cadastrar excursão. Tente novamente.');
            });
    }

    excursionForm.addEventListener('submit', submitFormData);
});
