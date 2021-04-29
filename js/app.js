$(document).ready(function() {

    let btn = $('.btn');
    let inp = $('.task-input');
    let list = $('.task-list');
    
    btn.on('click', function() { // события клик на кнопку добавить
        if(!inp.val()) { // проверка на заполненность инпута
            alert('Заполните поле!')
            return
        }
        let obj = {
            task: inp.val() // помещаем значение инпута в свойства  task нового объекта
        }
        setItemToStorage(obj) // вызов функции добавления в localStorage
        render() // вызов функции отображения данных
        inp.val('') // очищаем инпут
    })

    function setItemToStorage(task) { // добавление новых тасков в localStorage
        if(!localStorage.getItem("tasks-data")) { // проверка есть ли что-нибудь в localStorage
            localStorage.setItem("tasks-data", "[]") // если нет, то добавляем туда пустой массив
        }
        let data = JSON.parse(localStorage.getItem('tasks-data')); // стягиваем массив из localStorage и переобразовываем в обычный формат JS
        data.push(task) // в массив добавляем новый объект
        localStorage.setItem('tasks-data', JSON.stringify(data)) // обновленный массив преобразовываем в формат json и отправляем обратно в localStorage
    }

    function render() { // отоброжение данных
        if(!localStorage.getItem("tasks-data")) {// проверка есть ли что-нибудь в localStorage
            localStorage.setItem("tasks-data", "[]") // если нет, то добавляем туда пустой массив
        }
        let newDAta = JSON.parse(localStorage.getItem('tasks-data'));// стягиваем массив из localStorage и переобразовываем в обычный формат JS
        list.html('') // очищаем страницу 
        newDAta.forEach(element => { // перебираем массив для каждого элемента и создаем новый li тег с кнопкой
            list.append(`<li>${element.task}<button class='btn-delete'>Delete</button></li>`)
        });
    }

    $('body').on('click', '.btn-delete', function() { // события на кнопку удаления
        let data = JSON.parse(localStorage.getItem('tasks-data'));// стягиваем массив из localStorage и переобразовываем в обычный формат JS
        let index = $(this).parent().index(); // находим индекс у родителя кнопки, по которому нажал пользователь

        data.splice(index, 1);// удаляем не нужный элемент из массива 
        localStorage.setItem('tasks-data', JSON.stringify(data)); // отправляем и заменяем старый массив на новый
        render()// вызов функции отображения данных
    })

    render()// вызов функции отображения данных
})
