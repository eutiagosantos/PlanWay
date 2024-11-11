document.addEventListener('DOMContentLoaded', function () {
    const monthBR = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const tableDays = document.getElementById('dias');
    const eventList = document.getElementById('event-items');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let startDate = new Date();
    let endDate = new Date(startDate);

    // Função para fechar o modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Função para preencher o calendário
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

    // Função que abre o modal de criação de evento
    function openModal(date) {
        const modal = document.getElementById('modal');
        const span = document.getElementsByClassName('close')[0];
        const eventForm = document.getElementById('eventForm');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventStartDateInput = document.getElementById('eventStartDate');
        const eventEndDateInput = document.getElementById('eventEndDate');
        const eventLocationInput = document.getElementById('eventLocation');

        eventStartDateInput.value = date.toISOString().split('T')[0];
        eventEndDateInput.value = date.toISOString().split('T')[0];

        modal.style.display = 'block';

        span.onclick = function () {
            closeModal(modal);
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal(modal);
            }
        };

        eventForm.onsubmit = function (e) {
            e.preventDefault();

            const eventTitle = eventTitleInput.value.trim();
            const eventStartDate = new Date(eventStartDateInput.value + 'T00:00:00');
            const eventEndDate = new Date(eventEndDateInput.value + 'T00:00:00');
            const eventLocation = eventLocationInput.value.trim();

            // Validação
            if (!eventTitle) {
                alert("Por favor, insira um título para o evento.");
                return;
            }
            if (isNaN(eventStartDate.getTime()) || isNaN(eventEndDate.getTime())) {
                alert("Por favor, insira datas válidas.");
                return;
            }
            if (eventStartDate >= eventEndDate) {
                alert("A data de início deve ser anterior à data de término.");
                return;
            }

            saveEvent(eventStartDate, eventEndDate, eventLocation, eventTitle);
            closeModal(modal);
        };
    }

    // Função de salvar os eventos
    function saveEvent(startDate, endDate, location, title) {
        const newEvent = {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            location: location,
            title: title,
            activities: [],
            id: Date.now() // Adiciona um id único
        };

        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        GetDaysCalendar(startDate.getMonth(), startDate.getFullYear());
        displayEvents();
        sendNotification(newEvent);
        cadastrarRoteiro(newEvent);  // Função de backend para criar o roteiro
    }

    function sendNotification(event) {
        alert(`Notificação: Evento criado de ${event.startDate} a ${event.endDate} no local ${event.location}.`);
    }

    // Função que cria a lista de eventos ao lado do calendário
    function displayEvents() {
        eventList.innerHTML = '';
        events.forEach((event, index) => {
            let li = document.createElement('li');
            li.innerHTML = `Data: ${event.startDate} a ${event.endDate}, Título: ${event.title}, Local: ${event.location}
                            <button onclick="editEvent(${index})" class="btn btn-outline-primary">Editar</button>
                            <button onclick="deleteEvent(${index})" class="btn btn-outline-danger">Excluir</button>
                            <button onclick="openActivityModal(${index})" class="btn btn-outline-secondary">Adicionar Atividade</button>`;

            // Adicionar lista de atividades
            if (event.activities.length > 0) {
                const activityList = document.createElement('ul');
                event.activities.forEach((activity, activityIndex) => {
                    let activityItem = document.createElement('li');
                    activityItem.innerHTML = `Atividade: ${activity.description}, Início: ${activity.start}, Fim: ${activity.end}, Endereço: ${activity.address}
                        <button onclick="editActivity(${index}, ${activityIndex})" class="btn btn-outline-primary">Editar Atividade</button>
                        <button onclick="deleteActivity(${index}, ${activityIndex})" class="btn btn-outline-danger">Excluir Atividade</button>`;

                    activityList.appendChild(activityItem);
                });
                li.appendChild(activityList);
            }

            eventList.appendChild(li);
        });
    }

    // Função de editar evento
    window.editEvent = function (index) {
        const event = events[index];
        const modal = document.getElementById('modal');
        const eventForm = document.getElementById('eventForm');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventStartDateInput = document.getElementById('eventStartDate');
        const eventEndDateInput = document.getElementById('eventEndDate');
        const eventLocationInput = document.getElementById('eventLocation');

        eventTitleInput.value = event.title;
        eventStartDateInput.value = event.startDate;
        eventEndDateInput.value = event.endDate;
        eventLocationInput.value = event.location;

        modal.style.display = 'block';

        eventForm.onsubmit = function (e) {
            e.preventDefault();
            events[index].title = eventTitleInput.value;
            events[index].startDate = eventStartDateInput.value;
            events[index].endDate = eventEndDateInput.value;
            events[index].location = eventLocationInput.value;

            localStorage.setItem('events', JSON.stringify(events));
            closeModal(modal);
            displayEvents();
            GetDaysCalendar(new Date(event.startDate).getMonth(), new Date(event.startDate).getFullYear());
        };
    }

    // Função de exclusão de evento
    window.deleteEvent = function (index) {
        const eventId = events[index].id; // Obtém o id do evento
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
        const now = new Date();
        GetDaysCalendar(now.getMonth(), now.getFullYear());
        deleteRoteiro(eventId);
    }

    // Funções de navegação entre meses
    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes, ano);
    displayEvents();

    const botao_proximo = document.getElementById('btn-next');
    const botao_anterior = document.getElementById('btn-prev');
    

    botao_proximo.onclick = function () {
        if (mes === 11) {
            mes = 0;
            ano++;
        } else {
            mes++;
        }
        GetDaysCalendar(mes, ano);
    };

    botao_anterior.onclick = function () {
        if (mes === 0) {
            mes = 11;
            ano--;
        } else {
            mes--;
        }
        GetDaysCalendar(mes, ano);
    };

    // Funções de adicionar atividades
    function openActivityModal(eventIndex) {
        const modal = document.getElementById('activityModal');
        const span = document.getElementsByClassName('close')[1];
        const activityForm = document.getElementById('activityForm');
        const activityDescriptionInput = document.getElementById('activityDescription');
        const activityStartInput = document.getElementById('activityStart');
        const activityEndInput = document.getElementById('activityEnd');
        const activityAddressInput = document.getElementById('activityAddress');

        modal.style.display = 'block';

        span.onclick = function () {
            closeModal(modal);
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal(modal);
            }
        };

        activityForm.onsubmit = function (e) {
            e.preventDefault();

            const activityDescription = activityDescriptionInput.value.trim();
            const activityStart = activityStartInput.value.trim();
            const activityEnd = activityEndInput.value.trim();
            const activityAddress = activityAddressInput.value.trim();

            // Validação
            if (!activityDescription || !activityStart || !activityEnd || !activityAddress) {
                alert("Todos os campos da atividade são obrigatórios.");
                return;
            }

            events[eventIndex].activities.push({
                description: activityDescription,
                start: activityStart,
                end: activityEnd,
                address: activityAddress
            });

            localStorage.setItem('events', JSON.stringify(events));
            displayEvents();
            closeModal(modal);
        };
    }
    
})

// Função para cadastrar roteiro no backend
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

// Função para deletar roteiro no backend
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
