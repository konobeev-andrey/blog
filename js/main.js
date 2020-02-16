const xhr = new XMLHttpRequest();
const message = $('.message');
let respArreyPosts;

function $(selector) {
    return document.querySelector(selector)
}

function returnLastItem(arr) {
    return arr[arr.length - 1];
  }

function deleteValueInputs() {
     $('.title').value = '';
     $('.textarea').value = '';
}


const popup = {
    open: function () {
        $('.popup.layout').style.display = 'grid';
        $('.title.input').focus();
    },
    close: function () {
        $('.popup.layout').style.display = 'none';
        display.message('');
    }
}
const display = {
    posts: function (resp) {
        resp.forEach((element) => {
            main.insertAdjacentHTML('beforeend', `<div class="post" id="idPost${element.id}"> 
            <h2 class="post__title">
                ${element.title}
            </h2>
            <p class="post__subtitle">
                ${element.body}
            </p>
        </div>`);
        });
        $('.preloader__contener').classList.add('hide');
    },
    post: function (id, title, body){
        main.insertAdjacentHTML('afterbegin', `<div class="post" id="idPost${id}">
            <h2 class="post__title">
                ${title}
            </h2>
            <p class="post__subtitle">
                ${body}
            </p>
        </div>`);
    },
    message: function (mes){
        message.innerHTML = mes;
    }
    
}


const api = {
    getData: function (url, func) {
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function () {
            respArreyPosts = xhr.response;
            func(xhr.response);
        };
    },
    sendData: function(url, userId, id, title, body){
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            id: id,
            userId: userId,
            title: title,
            body:body,
        }

        xhr.onload = function () {
            deleteValueInputs();
            display.post( id, title, body);
    };
        xhr.send(JSON.stringify(obj));
    }
}

 $('.send-post').onclick = function(title, bode) {
    let valueTitle = $('.title').value;
    let valueBody = $('.textarea').value;
    let valueId = returnLastItem(respArreyPosts).id + 1;
    if(!valueTitle && !valueBody){
        display.message('Введите название и статью!');
    }
    else if(!valueTitle){
        display.message('Введите название!');
    }
    else if(!valueBody){
        display.message('Введите статью!');
    }
    else{
        api.sendData('https://jsonplaceholder.typicode.com/posts', 123, valueId, valueTitle, valueBody);
        respArreyPosts.push({
            userId: 123,
            id: valueId,
            title: valueTitle,
            body: valueBody
        });
        console.log(respArreyPosts);
        display.message('');
        popup.close();
    }
 } 

