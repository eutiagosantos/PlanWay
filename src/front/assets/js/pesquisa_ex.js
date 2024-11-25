// Função para obter o email do usuário logado
function getUserEmail() {
    // Aqui você pode adaptar para pegar o email do usuário logado de uma maneira mais segura, por exemplo,
    // a partir de um token JWT ou de uma variável global que armazena as informações do usuário.
    // Para este exemplo, vamos pegar o email a partir do armazenamento local.
    return localStorage.getItem('userEmail');
}

// Função para carregar as excursões do usuário logado
function loadUserExcursions() {
    const userEmail = getUserEmail();  // Pega o email do usuário logado

    // Verifica se o email foi encontrado
    if (!userEmail) {
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
            // Se não houver excursões, informa ao usuário
            if (data.length === 0) {
                document.getElementById('excursionsList').innerHTML = '<p>Você ainda não criou nenhuma excursão.</p>';
                return;
            }
            // Exibe as excursões encontradas
            displayExcursions(data);
        })
        .catch(error => {
            console.error('Erro ao carregar as excursões do usuário:', error);
            alert('Erro ao carregar suas excursões.');
        });
}

// Função para exibir as excursões na página
function displayExcursions(excursions) {
    const listContainer = document.getElementById('excursionsList');
    listContainer.innerHTML = '';  // Limpa a lista antes de renderizar as novas excursões

    // Para cada excursão, cria um cartão de excursão na página
    excursions.forEach(({ nome, descricao, valor, local, dataInicio, dataFim, id }) => {
        const excursionCard = document.createElement('div');
        excursionCard.classList.add('col-md-4', 'col-lg-3', 'col-sm-6', 'mb-4');

        excursionCard.innerHTML = `
            <div class="card" style="width: 350px;">
                <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">${descricao}</p>
                    <p class="card-text">R$ ${valor}</p>
                    <p class="card-text">${local}</p>
                    <p class="card-text">${dataInicio} - ${dataFim}</p>
                    <a href="detalhes_excursao.html?id=${id}" class="btn btn-warning">Alterar</a>
                    <button class="btn btn-danger" onclick="deleteExcursion(${id})">Deletar</button>
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
