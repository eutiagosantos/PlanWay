document.addEventListener('DOMContentLoaded', function () {
    const monthBR = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const tableDays = document.getElementById('dias');
    const eventList = document.getElementById('event-items');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let startDate = new Date();
    let mes = startDate.getMonth(); // Mês atual
    let ano = startDate.getFullYear(); // Ano atual

    // Função para renderizar os dias no calendário
    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthBR[mes];
        document.getElementById('ano').innerHTML = ano;

        let firstDayOfWeek = new Date(ano, mes, 1).getDay(); // Dia da semana do 1º dia do mês
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate(); // Último dia do mês

        // Limpar a tabela de dias
        tableDays.innerHTML = '';

        let row = document.createElement('tr');
        for (let i = 1 - firstDayOfWeek, index = 0; i <= getLastDayThisMonth; i++, index++) {
            let dt = new Date(ano, mes, i);
            let dayTable = document.createElement('td');
            dayTable.classList.remove('mes-anterior', 'proximo-mes', 'dia-atual', 'event');
            dayTable.innerHTML = dt.getDate();

            // Verifica se o dia é o atual
            if (dt.getFullYear() === startDate.getFullYear() &&
                dt.getMonth() === startDate.getMonth() &&
                dt.getDate() === startDate.getDate()) {
                dayTable.classList.add('dia-atual');
            }

            // Marcar os dias do mês anterior e próximo
            if (dt.getMonth() < mes) {
                dayTable.classList.add('mes-anterior');
            }
            if (dt.getMonth() > mes) {
                dayTable.classList.add('proximo-mes');
            }

            // Adicionar evento ao clicar no dia
            dayTable.onclick = function () {
                openModal(dt);
            };

            // Adicionar eventos do localStorage ao dia
            events.forEach(event => {
                if (new Date(event.startDate).toDateString() === dt.toDateString()) {
                    dayTable.classList.add('event');
                    dayTable.setAttribute('title', event.title);
                }
            });

            row.appendChild(dayTable);

            // Quando completar uma semana (7 dias), criar uma nova linha
            if ((index + 1) % 7 === 0) {
                tableDays.appendChild(row);
                row = document.createElement('tr');
            }
        }
    }

    // Função para abrir o modal de cadastro de evento
    function openModal(date, eventToEdit = null) {
        const modal = document.getElementById('modal');
        const span = document.getElementsByClassName('close')[0];
        const eventForm = document.getElementById('eventForm');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventStartDateInput = document.getElementById('eventStartDate');
        const eventEndDateInput = document.getElementById('eventEndDate');

        // Preencher com a data do dia selecionado
        eventStartDateInput.value = date.toISOString().split('T')[0];
        eventEndDateInput.value = date.toISOString().split('T')[0];

        if (eventToEdit) {
            eventTitleInput.value = eventToEdit.title;
            eventStartDateInput.value = eventToEdit.startDate;
            eventEndDateInput.value = eventToEdit.endDate;
        }

        modal.style.display = 'block';

        span.onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        // Submissão do formulário
        eventForm.onsubmit = function (e) {
            e.preventDefault();
            const eventTitle = eventTitleInput.value;
            const startDateValue = eventStartDateInput.value;
            const endDateValue = eventEndDateInput.value;

            if (eventToEdit) {
                // Atualizar o evento
                updateEvent(eventToEdit, eventTitle, startDateValue, endDateValue);
            } else {
                // Criar novo evento
                createEvent(date, eventTitle, startDateValue, endDateValue);
            }

            modal.style.display = 'none';
        };
    }

    // Função para criar um novo evento
    function createEvent(title, endDateValue) {
        const newEvent = {
            title: title,
            endDate: endDateValue
        };

        // Criar evento na API
        cadastrarRoteiro(newEvent);

        // Adicionar o evento ao localStorage
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        GetDaysCalendar(mes, ano); // Atualiza o calendário
        displayEvents();
    }

    // Função para atualizar um evento
    function updateEvent(eventToEdit, title, endDateValue) {
        const index = events.indexOf(eventToEdit);
        if (index !== -1) {
            events[index].title = title;
            events[index].endDate = endDateValue;

            // Atualizar evento na API
            atualizarRoteiro(events[index]);

            localStorage.setItem('events', JSON.stringify(events));
            GetDaysCalendar(mes, ano); // Atualiza o calendário
            displayEvents();
        }
    }

    // Função para deletar um evento (agora com integração à API)
    window.deleteEvent = function (index) {
        const eventToDelete = events[index];

        // Deletar evento no servidor via API
        fetch(`http://localhost:8081/api/roteiro/deleteRoteiro/${eventToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Evento deletado com sucesso no servidor
                    alert('Evento deletado com sucesso!');
                    // Remover do localStorage e atualizar a UI
                    events.splice(index, 1);
                    localStorage.setItem('events', JSON.stringify(events));
                    displayEvents();
                    GetDaysCalendar(mes, ano); // Atualiza o calendário
                } else {
                    throw new Error('Falha ao excluir o evento!');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert(error.message);
            });
    }

    // Exibir eventos no localStorage na lista
    function displayEvents() {
        eventList.innerHTML = '';
        events.forEach((event, index) => {
            let li = document.createElement('li');
            li.innerHTML = `Data: ${event.startDate}, Título: ${event.title} 
                            <button onclick="editEvent(${index})" class="btn btn-outline-primary">Editar</button>
                            <button onclick="deleteEvent(${index})" class="btn btn-outline-danger">Excluir</button>`;
            eventList.appendChild(li);
        });
    }

    // Função para editar evento
    window.editEvent = function (index) {
        const event = events[index];
        openModal(new Date(event.startDate), event);
    }

    // Inicializar o calendário e eventos
    GetDaysCalendar(mes, ano);
    displayEvents();

    // Botões para navegação entre meses
    const botao_proximo = document.getElementById('btn-pro');
    const botao_anterior = document.getElementById('btn-ant');

    // Navegar para o próximo mês
    botao_proximo.onclick = function () {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes, ano); // Atualiza o calendário para o próximo mês
    };

    // Navegar para o mês anterior
    botao_anterior.onclick = function () {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes, ano); // Atualiza o calendário para o mês anterior
    };
});

// Função para cadastrar o roteiro via API
function cadastrarRoteiro(newRoteiro) {
    fetch('http://localhost:8081/api/roteiro/criarRoteiro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoteiro)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Evento cadastrado:', data);
        })
        .catch(error => {
            console.error('Erro ao cadastrar o evento:', error);
        });
}

// Função para atualizar o roteiro via API
function atualizarRoteiro(updatedRoteiro) {
    fetch(`http://localhost:8081/api/roteiro/atualizarRoteiro/${updatedRoteiro.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRoteiro)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Evento atualizado:', data);
        })
        .catch(error => {
            console.error('Erro ao atualizar o evento:', error);
        });
}
