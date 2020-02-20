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
};
function viewPreloader(location) {
    location.insertAdjacentHTML('afterbegin', ` <div class="preloader__contener">
        <p><img src="5.svg" alt=""></p>
        </div>`);
}

function viewPost(id, title, body, stack) {
    main.insertAdjacentHTML(stack, `<a href="post.html?post=${id}&title=${title}&body=${body}" class="post" id="idPost${id}">
            <h2 class="post__title">${title}</h2>
            <p class="post__subtitle">${body}</p>
        </a>`);
}
function viewComment(email, name, body, stack) {
    $('.comment').insertAdjacentHTML(stack, `<div class="com">
        <p class="name">${name}  <span>${email}</span></p>
        <p class="bodyComment">${body}</p>
    </div>`);
}


const display = {
    posts: function (resp) {
        resp.forEach((element) => {
            viewPost(element.id, element.title, element.body, 'beforeend');
        });
        $('.preloader__contener').remove();
    },
    post: function (id, title, body) {
        viewPost(id, title, body, 'afterbegin');
    },
    comments: function(resp) {
        resp.forEach((element) => {
            viewComment(element.email, element.name, element.body, 'beforeend');
        });
        $('.preloader__contener').remove();
    },
    message: function (mes) {
        message.innerHTML = mes;
    }

};


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
    sendData: function (url, userId, id, title, body) {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            id: id,
            userId: userId,
            title: title,
            body: body,
        }

        xhr.onload = function () {
            deleteValueInputs();
            display.post(id, title, body);
        };
        xhr.send(JSON.stringify(obj));
    }
}

$('.send-post').onclick = function (title, bode) {
    let valueTitle = $('.title').value;
    let valueBody = $('.textarea').value;
    let valueId = returnLastItem(respArreyPosts).id + 1;
    if (!valueTitle && !valueBody) {
        display.message('Введите название и статью!');
    } else if (!valueTitle) {
        display.message('Введите название!');
    } else if (!valueBody) {
        display.message('Введите статью!');
    } else {
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

