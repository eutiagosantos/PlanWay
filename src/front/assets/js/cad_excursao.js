document.addEventListener("DOMContentLoaded", function () {
    const excursionForm = document.getElementById('excursionForm');

    // Suponhamos que o email do usuário esteja armazenado em uma variável global
    const userEmail = localStorage.getItem('userEmail');  // O email do usuário logado deve ser recuperado de algum lugar (como um token ou session)

    function getFormData() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        const additionalServices = document.getElementById('additionalServices').value;

        // Log para depuração
        console.log({
            nome: title,
            descricao: description,
            dataInicio: startDate,
            dataFim: endDate,
            local: location,
            valor: parseFloat(price),
            servicosAdicionais: additionalServices || '',
            email: userEmail // Garantir que o email está sendo enviado
        });

        return {
            nome: title,
            descricao: description,
            dataInicio: startDate,
            dataFim: endDate,
            local: location,
            valor: parseFloat(price),
            servicosAdicionais: additionalServices || '',
            email: userEmail // Enviando o email do usuário
        };
    }

    // Função para enviar os dados para a API
    function submitFormData(event) {
        event.preventDefault();

        // Recuperando o documento do usuário
        const documento = localStorage.getItem('userDocumento');

        // Verificando se o documento tem 14 caracteres (CNPJ) ou 11 caracteres (CPF)
        if (documento.length < 14 || documento.length > 14) {
            alert('Você deve ser uma agência (CNPJ) para criar excursões.');
            return; // Impede o envio do formulário
        }

        // Caso o documento seja válido (CNPJ)
        if (documento.length === 14) {
            // Recuperando os dados do formulário
            const formData = getFormData();

            // Enviando os dados da excursão para a API
            fetch('http://localhost:8081/api/excursoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Enviando os dados do formulário
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
    }

    // Adicionando o evento de submissão do formulário
    excursionForm.addEventListener('submit', submitFormData);
});
