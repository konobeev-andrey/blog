const xhr = new XMLHttpRequest();
const message = $('.message');

function $(selector) {
    return document.querySelector(selector)
}


function deleteValueInputs() {
     $('.title').value = '';
     $('.textarea').value = '';
}
function sendMessage (mes){
    message.innerHTML = mes;
}

const popup = {
    open: function () {
        $('.popup.layout').style.display = 'grid';
    },
    close: function () {
        $('.popup.layout').style.display = 'none';
    }
}

function displayPosts(resp) {
    resp.forEach((element) => {
        main.insertAdjacentHTML('beforeend', `<div class="post">
        <h2 class="post__title">
            ${element.title}
        </h2>
        <p class="post__subtitle">
            ${element.body}
        </p>
    </div>`);
    });
}

const api = {
    getData: function (url, func) {
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function () {
            func(xhr.response);
        };
    },
    sendData: function(url, user, title, body){
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            userId: user,
            title: title,
            body:body,
        }

        xhr.onload = function () {
            console.log('пост добавлен'); 
            deleteValueInputs();  
    };
    xhr.send(JSON.stringify(obj));
    }
}
 $('.send-post').onclick = function(title, bode) {
    let valueTitle = $('.title').value;
    let valueBody = $('.textarea').value;
    if(!valueTitle && !valueBody){
        sendMessage('Введите название и статью!');
    }
    else if(!valueTitle){
        sendMessage('Введите название!');
    }
    else if(!valueBody){
        sendMessage('Введите статью!');
    }
    else{
        api.sendData('https://jsonplaceholder.typicode.com/posts', 101, valueTitle, valueBody);
    }
 } 

