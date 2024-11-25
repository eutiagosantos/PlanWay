// Variáveis globais para controlar o mês e o ano
let mesAtual = new Date().getMonth(); // Mês atual (0-11)
let anoAtual = new Date().getFullYear(); // Ano atual
let diaSelecionado = null; // Variável para armazenar o dia selecionado
const email = localStorage.getItem('userEmail'); // Recupera o e-mail do usuário do localStorage

// Função para gerar o calendário
function gerarCalendario() {
    const diasContainer = document.getElementById("dias");
    const mes = document.getElementById("mes");

    // Atualiza o título do mês
    mes.textContent = new Date(anoAtual, mesAtual).toLocaleString('pt-BR', { month: 'long' });

    // Primeiro dia do mês
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay(); // 0 = Domingo, 1 = Segunda, ...
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate(); // Total de dias no mês

    // Cria a estrutura de dias no calendário
    let diasHtml = '';
    let dia = 1;

    for (let i = 0; i < 6; i++) { // 6 linhas (uma para cada semana)
        diasHtml += '<tr>';
        for (let j = 0; j < 7; j++) { // 7 dias da semana
            if (i === 0 && j < primeiroDia) {
                diasHtml += '<td></td>'; // Células vazias antes do primeiro dia
            } else if (dia > diasNoMes) {
                break; // Sai do loop quando não houver mais dias
            } else {
                // Adiciona o evento de clique em cada dia
                diasHtml += `<td class="dia" data-dia="${dia}" onclick="selecionarDia(${dia})">${dia}</td>`;
                dia++;
            }
        }
        diasHtml += '</tr>';
        if (dia > diasNoMes) break;
    }

    diasContainer.innerHTML = diasHtml;
}

// Função para ir para o próximo mês
function proximoMes() {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    gerarCalendario();
}

// Função para ir para o mês anterior
function mesAnterior() {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    gerarCalendario();
}

// Função para selecionar um dia e abrir o modal
function selecionarDia(dia) {
    diaSelecionado = dia; // Armazena o dia selecionado
    const modal = document.getElementById("modal");
    const tituloModal = document.getElementById("modal-titulo");
    const inputDataInicio = document.getElementById("eventStartDate");
    const inputDataFim = document.getElementById("eventEndDate");
    const inputTitulo = document.getElementById("eventTitle");
    const inputLocal = document.getElementById("eventLocation");

    // Atualiza o título do modal para mostrar o dia selecionado
    tituloModal.textContent = `Cadastrar Evento para o dia ${dia} de ${new Date(anoAtual, mesAtual).toLocaleString('pt-BR', { month: 'long' })}`;

    // Preenche a "Data de Início" com o dia selecionado
    const dataInicio = new Date(anoAtual, mesAtual, dia);
    const dataInicioFormatada = dataInicio.toISOString().split('T')[0]; // Formato "yyyy-mm-dd"
    inputDataInicio.value = dataInicioFormatada;

    // Preenche "Data de Fim" com um dia após a "Data de Início" (opcional)
    const dataFim = new Date(dataInicio);
    dataFim.setDate(dataFim.getDate() + 1); // Adiciona 1 dia à data de início
    const dataFimFormatada = dataFim.toISOString().split('T')[0]; // Formato "yyyy-mm-dd"
    inputDataFim.value = dataFimFormatada;

    // Limpa os outros campos
    inputTitulo.value = '';
    inputLocal.value = '';

    // Exibe o modal
    modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function fecharModalUpdate() {
    const modalUpdate = document.getElementById("modal-update");
    modalUpdate.style.display = "none";
}

// Função para salvar um evento
async function salvarEvento() {
    const inputTitulo = document.getElementById("eventTitle").value;
    const inputDataInicio = document.getElementById("eventStartDate").value;
    const inputDataFim = document.getElementById("eventEndDate").value;
    const inputLocal = document.getElementById("eventLocation").value;

    if (!inputTitulo || !inputDataInicio || !inputDataFim || !inputLocal) {
        exibirMensagem("Erro", "Por favor, preencha todos os campos.", "error");
        return;
    }

    const evento = {
        titulo: inputTitulo,
        local: inputLocal,
        dataInicio: inputDataInicio,
        dataFim: inputDataFim,
        agenciaEmail: email, // Exemplo de e-mail da agência
    };

    try {
        const response = await fetch('http://localhost:8081/api/roteiro/criarRoteiro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(evento)
        });

        if (response.ok) {
            exibirMensagem("Sucesso", "Evento criado com sucesso!", "success");
            fecharModal(); // Fecha o modal
            listarRoteiros(); // Atualiza a lista de roteiros
        } else {
            exibirMensagem("Erro", "Erro ao criar evento.", "error");
        }
    } catch (error) {
        console.error("Erro:", error);
        exibirMensagem("Erro", "Erro inesperado ao tentar criar o evento.", "error");
    }
}

// Função para listar todos os roteiros
async function listarRoteiros() {
    try {
        const response = await fetch('http://localhost:8081/api/roteiro/listRoteiros', {
            method: 'GET',
        });

        if (response.ok) {
            const roteiros = await response.json();
            const listaRoteiros = document.getElementById("event-items");
            listaRoteiros.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

            roteiros.forEach(roteiro => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <strong>${roteiro.titulo}</strong><br>
                    Local: ${roteiro.local} <br>
                    Início: ${roteiro.dataInicio} <br>
                    Fim: ${roteiro.dataFim} <br>
                    <button onclick="atualizarRoteiro(${roteiro.id})" class="btn btn-warning">Atualizar</button>
                    <button onclick="excluirRoteiro(${roteiro.id})" class="btn btn-danger">Excluir</button>
                `;
                listaRoteiros.appendChild(item);
            });
        } else {
            exibirMensagem("Erro", "Erro ao listar roteiros.", "error");
        }
    } catch (error) {
        console.error("Erro:", error);
        exibirMensagem("Erro", "Erro inesperado ao tentar listar os roteiros.", "error");
    }
}

// Função para abrir o modal de atualização com os dados do evento
// Função para salvar as alterações do roteiro
async function salvarRoteiroAtualizado() {
    const titulo = document.getElementById("eventTitle").value;
    const local = document.getElementById("eventLocation").value;
    const dataInicio = document.getElementById("eventStartDate").value;
    const dataFim = document.getElementById("eventEndDate").value;
    const id = document.getElementById("updateRoteiroId").value;

    if (!titulo || !local || !dataInicio || !dataFim) {
        exibirMensagem("Erro", "Por favor, preencha todos os campos.", "error");
        return;
    }

    const roteiroDto = {
        titulo: titulo,
        local: local,
        dataInicio: dataInicio,
        dataFim: dataFim,
    };

    try {
        const response = await fetch(`http://localhost:8081/api/roteiro/updateRoteiro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roteiroDto),
        });

        if (response.ok) {
            // Se a atualização foi bem-sucedida, atualiza a lista de roteiros
            exibirMensagem("Sucesso", "Roteiro atualizado com sucesso!", "success");
            fecharModalUpdate(); // Fecha o modal de atualização
            listarRoteiros(); // Atualiza a lista de roteiros na página
        } else {
            const errorData = await response.json();
            exibirMensagem("Erro", errorData.message || "Erro ao atualizar o roteiro.", "error");
        }
    } catch (error) {
        console.error("Erro ao atualizar roteiro:", error);
        exibirMensagem("Erro", "Erro inesperado ao tentar atualizar o roteiro.", "error");
    }
}




// Função para excluir um roteiro
async function excluirRoteiro(id) {
    try {
        const response = await fetch(`http://localhost:8081/api/roteiro/deleteRoteiro/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            exibirMensagem("Sucesso", "Roteiro excluído com sucesso!", "success");
            listarRoteiros(); // Atualiza a lista de roteiros
        } else {
            exibirMensagem("Erro", "Erro ao excluir roteiro.", "error");
        }
    } catch (error) {
        console.error("Erro:", error);
        exibirMensagem("Erro", "Erro inesperado ao tentar excluir o roteiro.", "error");
    }
}

// Função para exibir mensagens de sucesso ou erro
// Função para exibir mensagens de sucesso ou erro
function exibirMensagem(titulo, mensagem, tipo) {
    // Determina a classe do alerta (sucesso ou erro)
    const tipoClasse = tipo === "success" ? "alert-success" : "alert-danger";

    // Cria o alerta
    const div = document.createElement("div");
    div.classList.add("alert", tipoClasse);
    div.innerHTML = `<strong>${titulo}:</strong> ${mensagem}`;

    // Localiza a div de alertas
    const alertContainer = document.getElementById("alert-container");

    // Verifica se a área de alertas foi encontrada
    if (alertContainer) {
        alertContainer.appendChild(div);

        // Remove o alerta após 5 segundos
        setTimeout(() => {
            div.remove();
        }, 5000); // A mensagem desaparece após 5 segundos
    }
}


// Função para adicionar eventos aos botões
function configurarEventos() {
    // Adiciona eventos aos botões de navegação do calendário
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");

    btnNext.addEventListener("click", proximoMes);
    btnPrev.addEventListener("click", mesAnterior);

    // Listar roteiros ao carregar a página
    listarRoteiros();

    // Gerar o calendário
    gerarCalendario();
}

// Chama a configuração de eventos quando a página carregar
window.onload = configurarEventos;
