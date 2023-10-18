document.addEventListener("DOMContentLoaded", function () {
    // URL API
    const api_url = "https://conf.ontico.ru/api/conferences/forCalendar.json";

    // Элемент <ul>, в который будут вставляться данные
    const conferenceList = document.getElementById("conference-list");

    // Выполняю запрос к API
    fetch(api_url)
        .then(response => response.json())
        .then(result => {
            const conferences = result.result;

            // Создаю элементы списка и вставляю данные
            conferences.forEach(conference => {
                const listItem = document.createElement("li");
                listItem.className = "conference__item";
                const domain = new URL(conference.uri || '').hostname || 'Нет данных';
                listItem.innerHTML = `
                <div class="conference__block">
                <div>
                <p class="conference__date">${conference.date_range || '#'}</p>
                <div class="conference__img_aline"><a class="conference__img_hover" href="${conference.uri || '#'}" target="_blank"><img class="conference__img" src='${conference.logo || 'Нет данных'}'></a></div>
                    <p class="conference__name">${conference.name || 'Нет данных'}</p>
                    <p class="conference__brief">${conference.brief || 'Нет данных'}</p>
                    <div>
                    <p class="conference__location">${conference.location || 'Нет данных'}</p>
                    <a class="conference__link" href="${conference.uri || '#'}" target="_blank">${domain}</a></p>
                    </div>
                    </div>
                    <div class="conference__btns"> 
                    <a class="conference__btn-one" href="#">Купить билет</a>
                    <a class="conference__btn-two" href="#">Подробнее</a>
                    </div>
                    </div>
                `;
                conferenceList.appendChild(listItem);

            });
        })
        .catch(error => {
            console.error("Ошибка при получении данных из API: ", error);
        });



    // Получаювсе элементы списка
    const dateItems = document.querySelectorAll('.date__item');

    // Создаю span элемент для подсветки
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'highlight';
    dateItems[0].appendChild(highlightSpan);

    // Добавляю обработчик события для каждого элемента
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            // Удаляею span из других элементов, если он есть
            item.appendChild(highlightSpan);
            dateItems.forEach(otherItem => {
                if (otherItem.contains(highlightSpan)) {
                    otherItem.removeChild(highlightSpan);
                }
            });
            // Добавляю span к выбранному элементу
            item.appendChild(highlightSpan);
        });

    });

});