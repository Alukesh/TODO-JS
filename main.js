let todoList = [];


let form = document.querySelector('form');
let list = document.querySelector('.todo__list');
let empty = document.querySelector('.todo__empty');
let todoStatus = document.querySelector('.todo__status');

let todoDeleteBtn;
let importantBtn = document.querySelector('.status__important');
let doneBtn = document.querySelector('.status__done');
let allBtn = document.querySelector('.status__all');
let deleteAll = document.querySelector('.delete-all');










const getAll = () => {
    fetch('  http://localhost:8080/tasks')
        .then(res => res.json())
        .then(data => {
            todoList = [...todoList, ...data];




            const showList = (status = 'all') => {
                todoList.filter(item => {
                    if (status === 'important') {
                        return item.isImportant
                    } else if (status === 'done') {
                        return item.isDone
                    } else return item
                }).forEach((item, idx) => {
                        list.innerHTML += `
            <li class="todo__item">
            <div>
                <span class="todo__item-time">${item.time}</span>
                <span style="color: ${item.isImportant ? 'red' : ''}; text-decoration: ${item.isDone ? 'line-through' : ''}" class="todo__item-title">${item.title}</span>
            </div>
                <div class="todo__item-btns">
                    <button class="todo__item-btn done" style="background-color:${item.isDone ? 'yellow' : ''};" data-id="${item.id}" >Done</button>
                    <button class="todo__item-btn important" style="background-color:${item.isImportant ? 'gold' : ''};" data-id="${item.id}" >Important</button>
                    <button class="todo__item-btn delete removeBtn" data-id="${item.id}">  delete</button>
                </div>
            </li>
            `;
                    todoDeleteBtn = document.querySelectorAll('.removeBtn');
                    todoDeleteBtn.forEach((delBtn) => {
                        delBtn.addEventListener('click', () => {
                            list.innerHTML = '';

                            fetch(`http://localhost:8080/tasks/${delBtn.dataset.id}`, {
                                method: 'DELETE'
                            }).then(res =>{
                                list.innerHTML = '';
                                showList()});

                        })
                    })

                });

                todoDeleteBtn = document.querySelectorAll('.delete');
                let todoImportantBtn = document.querySelectorAll('.important');
                let todoDoneBtn = document.querySelectorAll('.done');

                todoDeleteBtn.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        todoList = todoList.filter((el, idx) => {
                            return index !== idx
                        });
                        list.innerHTML = '';
                        showList()
                    })
                });
                todoImportantBtn.forEach((item, index) => {
                    item.addEventListener('click', (e) => {
                        todoList = todoList.map((el, idx) => {
                            if (idx === index) {
                                return {...el, isImportant: !el.isImportant}
                            }
                            return el
                        });
                        list.innerHTML = '';
                        // console.log(todoList.map(item => item.isImportant))
                        showList()
                    })
                });
                todoDoneBtn.forEach((item) => {
                    item.addEventListener('click', (e) => {

                        console.log(item.dataset.id);
                        todoList = todoList.map((el) => {
                            if (+item.dataset.id === el.id) {
                                return {...el, isDone: !el.isDone}
                            }
                            return el
                        });
                        list.innerHTML = "";
                        showList();
                    })
                });

                let todoCount = document.querySelector('.todo__count-num');
                todoCount.textContent = `${todoList.length}`;

                empty.style.display = !todoList.length ? 'block' : 'none'

            };
            showList();
            doneBtn.addEventListener('click', (e) =>{
                list.innerHTML = '';
                showList('done');
                todoStatus.textContent = 'Done'
            });
            importantBtn.addEventListener('click', (e) =>{
                list.innerHTML = '';
                // list.innerHTML = 'status <h2 style="">Important</h2>';
                showList('important');
                todoStatus.textContent = 'Important'
            });
            allBtn.addEventListener('click', (e) =>{
                list.innerHTML = '';
                showList();
                todoStatus.textContent = 'All'
            });



            form.addEventListener('submit', (e) =>{
                e.preventDefault();
                if (e.target[0].value){
                    fetch('http://localhost:8080/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            "title": e.target[0].value,
                            "isDone": false,
                            "isImportant": false,
                            "time": new Date().toString().substr(16,5)
                        })
                    }).then(res =>{
                        e.target[0].value = '';
                        list.innerHTML = '';
                        showList()});
                }     else alert('empty task')


            });

        }
)



};
getAll();



















deleteAll.addEventListener('click', () =>{
    todoList = [];
    list.innerHTML = "";
    showList();
});



let time = document.querySelector('.todo__time');
setInterval(() =>{
    let date = new Date();
    time.textContent = `${date.toString().substr(16, 5)}`;
}, 1000 );


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if (e.target[0].value.length > 0){
        todoList.push({
            id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
            title: e.target[0].value,
            isDone: false,
            isImportent: false,
            time: new Date().toString().substr(16,5)
        });
        list.innerHTML = '';
        showList();
        e.target[0].value = ''


    }

});





