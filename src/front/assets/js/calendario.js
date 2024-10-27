//Funcionalidade do calendario
document.addEventListener('DOMContentLoaded', function() {

    const monthBR = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const tableDays = document.getElementById('dias');
    const eventList = document.getElementById('event-items');
    let events = JSON.parse(localStorage.getItem('events')) || [];

    function GetDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthBR[mes];
        document.getElementById('ano').innerHTML = ano;
    
        let firstDayOfWeek = new Date(ano, mes, 1).getDay(); // Correção: Começar a partir do dia 1 do mês
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
    
            dayTable.onclick = function() {
                openModal(dt);
            };
    
            events.forEach(event => {
                if (new Date(event.date).toDateString() === dt.toDateString()) {
                    dayTable.classList.add('event');
                    dayTable.setAttribute('title', event.title);
                }
            });
        }
    }    

// Funcionalidade de abrir um span na tela para cadastrar o sintoma
    function openModal(date) {
        const modal = document.getElementById('modal');
        const span = document.getElementsByClassName('close')[0];
        const eventDateInput = document.getElementById('eventDate');
        const eventForm = document.getElementById('eventForm');
        const eventTitleInput = document.getElementById('eventTitle');

        eventDateInput.value = date.toDateString();

        modal.style.display = 'block';

        span.onclick = function() {
            modal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        eventForm.onsubmit = function(e) {
            e.preventDefault();
            const eventTitle = eventTitleInput.value;
            saveEvent(date, eventTitle);
            modal.style.display = 'none';
        };
    }

// Funcionalidade de salvar o evento no local storage
    function saveEvent(date, title) {
        events.push({ date: date.toISOString().split('T')[0], title: title });
        localStorage.setItem('events', JSON.stringify(events));
        GetDaysCalendar(date.getMonth(), date.getFullYear());
        displayEvents();
    }

// Funcionalidade de editar o evento no local storage
    window.editEvent = function(index) {
        const event = events[index];
        const modal = document.getElementById('modal');
        const eventDateInput = document.getElementById('eventDate');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventForm = document.getElementById('eventForm');

        eventDateInput.value = new Date(event.date).toDateString();
        eventTitleInput.value = event.title;

        modal.style.display = 'block';

        eventForm.onsubmit = function(e) {
            e.preventDefault();
            events[index].title = eventTitleInput.value;
            localStorage.setItem('events', JSON.stringify(events));
            modal.style.display = 'none';
            displayEvents();
            GetDaysCalendar(new Date(event.date).getMonth(), new Date(event.date).getFullYear());
        };
    }

// Funcionalidade de deletar o evento do local storage
    window.deleteEvent = function(index) {
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
        const now = new Date();
        GetDaysCalendar(now.getMonth(), now.getFullYear());
    }

// Funcionalidade de colocar uma lista com os eventos salvos na tela com HTML
    function displayEvents() {
        eventList.innerHTML = '';
        events.forEach((event, index) => {
            let li = document.createElement('li');
            li.innerHTML = `Data: ${event.date}, Título: ${event.title} 
                            <button onclick="editEvent(${index})" class="btn btn-outline-primary">Editar</button>
                            <button onclick="deleteEvent(${index})" class="btn btn-outline-danger">Excluir</button>`;
            eventList.appendChild(li);
        });
    }


    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes, ano);
    displayEvents();

    const botao_proximo = document.getElementById('btn-prev');
    const botao_anterior = document.getElementById('btn-ant');

    botao_proximo.onclick = function() {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        GetDaysCalendar(mes, ano);
    };

    botao_anterior.onclick = function() {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        GetDaysCalendar(mes, ano);
    };
});