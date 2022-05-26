// UI 
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// call start function
eventListeners();
loadItems();


//get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

// set items to local storage 
function setItemToLS(text) {
    items = getItemsFromLS('items');
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

//delete item local storage
function deleteItemLS(text) {
    items = getItemsFromLS();
    items.forEach( (item, index) => {
        if (item === text) {
            items.splice(index, 1)
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

// all delete items from local storage 
function deleteItemsFromLS(text) {
    localStorage.removeItem(text);
}


function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    //delete item
    taskList.addEventListener('click', deleteItem);

    //delete all 
    btnDeleteAll.addEventListener('click', deleteAll);
}

//create items 
function createItem(text) {
     // create li
     const li = document.createElement('li');
     li.className = 'list-group-item list-group-item-secondary';
     li.appendChild(document.createTextNode(text));
 
     // create a
     const a = document.createElement('a');
     a.classList = 'delete-item float-right';
     a.setAttribute('href', '#');
     a.innerHTML = '<i class="fas fa-times"></i>';
 
     // add a to li
     li.appendChild(a);
 
     // add li to ul
     taskList.appendChild(li);
}

// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }

    //create item    
   createItem(input.value);

   // save to local storage
   setItemToLS(input.value)

    // clear input
    input.value = '';

    e.preventDefault();
}

// load items 
function loadItems() {
    items = getItemsFromLS('items');
    items.forEach(function (item) {
        createItem(item)
    })
}

//delete item
function deleteItem(event) {    
    if (event.target.tagName == "I") {
        if (confirm("are you sure??")) {
        event.target.parentElement.parentElement.remove();
        //delete item local storage
        deleteItemLS(event.target.parentElement.parentElement.textContent)
    }
}
    event.preventDefault();
}

// delete  all
function deleteAll(event) {
    if (confirm("are you sure??")) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        deleteItemsFromLS('items')
    }
    event.preventDefault();
}