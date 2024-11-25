// Função para obter o email do usuário logado
function getUserEmail() {
    return localStorage.getItem('userEmail');  // Pega o email do usuário logado
}

// Função para obter o documento do usuário logado
function getUserDocumento() {
    return localStorage.getItem('userDocumento');  // Pega o documento do usuário logado
}

// Função para carregar as excursões do usuário logado
function loadUserExcursions() {
    const userEmail = getUserEmail();  // Pega o email do usuário logado
    const userDocumento = getUserDocumento();  // Pega o documento do usuário logado

    if (!userEmail || !userDocumento) {
        alert("Usuário não encontrado. Faça login.");
        return;
    }

    // Faz a requisição para buscar as excursões do usuário baseado no email
    fetch(`http://localhost:8081/api/excursoes/listExcursoesByEmail/${userEmail}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar excursões');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                document.getElementById('excursionsList').innerHTML = '<p>Você ainda não criou nenhuma excursão.</p>';
                return;
            }
            // Exibe as excursões encontradas
            displayExcursions(data, userDocumento);
        })
        .catch(error => {
            console.error('Erro ao carregar as excursões do usuário:', error);
            alert('Erro ao carregar suas excursões.');
        });
}

// Função para exibir as excursões na página
function displayExcursions(excursions, userDocumento) {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = '';  // Limpa a lista antes de renderizar as novas excursões

    // Para cada excursão, cria um cartão de excursão na página
    excursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-4', 'col-lg-3', 'col-sm-6', 'mb-4');

        let editAndDeleteButtons = '';  // Variável que irá armazenar os botões de editar e deletar

        // Verifica se o documento do usuário tem 14 dígitos
        if (userDocumento && userDocumento.length === 14) {
            // Usuário com documento de 14 dígitos pode alterar ou excluir
            editAndDeleteButtons = `
                <a href="detalhes_excursao.html?id=${id}" class="btn btn-warning">Alterar</a>
                <button class="btn btn-danger" onclick="deleteExcursion(${id})">Deletar</button>
            `;
        } else {
            // Usuário sem documento de 14 dígitos não pode alterar ou excluir
            editAndDeleteButtons = `<p><strong>Apenas usuários com documento de 14 dígitos podem alterar ou deletar excursões.</strong></p>`;
        }

        excursionCard.innerHTML = `
            <div class="card" style="width: 350px;">
                <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${descricao}</p>
                    <p class="card-text">R$ ${valor}</p>
                    <p class="card-text">${local}</p>
                    <p class="card-text">${dataInicio} - ${dataFim}</p>
                    ${editAndDeleteButtons}  <!-- Adiciona os botões de edição e exclusão -->
                </div>
            </div>
        `;
        listContainer.appendChild(excursionCard);
    });
}

// Função para deletar uma excursão
function deleteExcursion(id) {
    if (confirm("Tem certeza que deseja deletar esta excursão?")) {
        fetch(`http://localhost:8081/api/excursoes/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir a excursão');
                }
                alert('Excursão deletada com sucesso!');
                loadUserExcursions(); // Recarrega a lista de excursões após a exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir a excursão:', error);
                alert('Erro ao deletar a excursão.');
            });
    }
}

// Espera o carregamento completo do DOM antes de executar
document.addEventListener('DOMContentLoaded', function () {
    loadUserExcursions();  // Carrega as excursões do usuário ao carregar a página
});
