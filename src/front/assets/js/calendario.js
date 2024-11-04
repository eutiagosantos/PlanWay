import { getUsuarioDocumento } from './script.js';

// Array de meses em português
const monthBR = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

document.addEventListener('DOMContentLoaded', function () {
    const tableDays = document.getElementById('dias');
    const eventList = document.getElementById('event-items');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();

    GetDaysCalendar(mes, ano);
    displayEvents();

    // Função para carregar os dias do calendário
    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthBR[mes];
        document.getElementById('ano').innerHTML = ano;

        let firstDayOfWeek = new Date(ano, mes, 1).getDay();
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        for (let i = 1 - firstDayOfWeek, index = 0; i <= (42 - firstDayOfWeek); i++, index++) {
            let dt = new Date(ano, mes, i);
            let dtNow = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index];
            dayTable.classList.remove('mes-anterior', 'proximo-mes', 'dia-atual', 'event');
            dayTable.innerHTML = dt.getDate();

            if (dt.getFullYear() === dtNow.getFullYear() &&
                dt.getMonth() === dtNow.getMonth() &&
                dt.getDate() === dtNow.getDate()) {
                dayTable.classList.add('dia-atual');
            }

            if (dt.getMonth() < mes) {
                dayTable.classList.add('mes-anterior');
            }
            if (dt.getMonth() > mes) {
                dayTable.classList.add('proximo-mes');
            }

            dayTable.onclick = function () {
                openModal(dt);
            };

            events.forEach(event => {
                if (new Date(event.startDate).toDateString() === dt.toDateString()) {
                    dayTable.classList.add('event');
                    dayTable.setAttribute('title', event.title);
                }
            });
        }
    }

    // Função para abrir o modal e cadastrar o evento
    function openModal(date, index = null) {
        const modal = document.getElementById('modal');
        const span = document.getElementsByClassName('close')[0];
        const eventForm = document.getElementById('eventForm');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventStartDateInput = document.getElementById('eventStartDate');
        const eventEndDateInput = document.getElementById('eventEndDate');
        const eventLocationInput = document.getElementById('eventLocation');

        if (index !== null) { // Edição
            const event = events[index];
            eventTitleInput.value = event.title;
            eventStartDateInput.value = event.startDate;
            eventEndDateInput.value = event.endDate;
            eventLocationInput.value = event.location;
        } else { // Criação
            eventStartDateInput.value = date.toISOString().split('T')[0];
            eventEndDateInput.value = date.toISOString().split('T')[0];
        }

        modal.style.display = 'block';

        span.onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        eventForm.onsubmit = function (e) {
            e.preventDefault();
            const eventTitle = eventTitleInput.value;
            const eventStartDate = new Date(eventStartDateInput.value);
            const eventEndDate = new Date(eventEndDateInput.value);
            const eventLocation = eventLocationInput.value;

            if (index !== null) {
                atualizarRoteiro(events[index].id, { titulo: eventTitle, dataFim: eventEndDate.toISOString().split('T')[0] });
                events[index] = { ...events[index], title: eventTitle, startDate: eventStartDate.toISOString().split('T')[0], endDate: eventEndDate.toISOString().split('T')[0], location: eventLocation };
            } else {
                saveEvent(eventStartDate, eventEndDate, eventLocation, eventTitle);
            }

            modal.style.display = 'none';
        };
    }

    // Função para salvar o evento
    function saveEvent(startDate, endDate, location, title) {
        const newEvent = {
            id: events.length + 1, // Simulando um ID, você pode ajustar isso conforme necessário
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            location: location,
            title: title,
            activities: []
        };

        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        GetDaysCalendar(startDate.getMonth(), startDate.getFullYear());
        displayEvents();
        cadastrarRoteiro(newEvent); // Passa o novo evento
    }

    // Função para editar o evento
    window.editEvent = function (index) {
        openModal(new Date(), index); // Passa a data atual apenas para abrir o modal
    };

    // Função para deletar o evento
    window.deleteEvent = function (index) {
        const roteiroId = events[index].id; // ID correto
        deleteRoteiro(roteiroId);
        events.splice(index, 1); // Remove do array local
        localStorage.setItem('events', JSON.stringify(events)); // Atualiza localStorage
        displayEvents();
        GetDaysCalendar(new Date().getMonth(), new Date().getFullYear());
    };

    // Função para exibir os eventos
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

    // Inicializa o calendário com o mês e ano atuais
    GetDaysCalendar(mes, ano);
    displayEvents();

    const botao_proximo = document.getElementById('btn-prev');
    const botao_anterior = document.getElementById('btn-ant');

    botao_proximo.onclick = function () {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes, ano);
    };

    botao_anterior.onclick = function () {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes, ano);
    };
});

// Função para cadastrar roteiro
function cadastrarRoteiro(event) {
    const email = localStorage.getItem('userEmail');
    const data = {
        titulo: event.title,
        dataFim: event.endDate,
        email: email
    };

    fetch('http://localhost:8081/api/roteiro/criarRoteiro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Roteiro criado com sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro ao criar roteiro:', error);
        });
}

// Função para deletar roteiro
function deleteRoteiro(roteiroId) {
    fetch(`http://localhost:8081/api/roteiro/deleteRoteiro/${roteiroId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Roteiro deletado com sucesso');
            } else {
                console.error('Erro ao deletar roteiro');
            }
        })
        .catch((error) => {
            console.error('Erro ao deletar roteiro:', error);
        });
}

// Função para atualizar roteiro
function atualizarRoteiro(roteiroId, updatedData) {
    fetch(`http://localhost:8081/api/roteiro/updateRoteiro/${roteiroId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Roteiro atualizado com sucesso');
            } else {
                console.error('Erro ao atualizar roteiro');
            }
        })
        .catch((error) => {
            console.error('Erro ao atualizar roteiro:', error);
        });
}
