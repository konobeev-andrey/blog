const constant = {
    url: "https://jsonplaceholder.typicode.com/",
    xhr: new XMLHttpRequest(),
    respArreyPosts: [],
    respArreyComment: [],
    main: $('main'),
    regexpEmail: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i,

}
const regexpCheck = [
    {
        name: "еmail",
        regexpValue: /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i
    },
    {
        name: "phone",
        regexpValue: /^[0-9]/i
    }
];
function noCorrent (arr){
    let error = [];
    for(let i = 0; i < arr.length; i++){
        if(!arr[i].value){
            error.push(arr[i].name);
        }
        else{
            for(let j = 0; j < regexpCheck.length - 1; j++){
                if(arr[i].name == regexpCheck[j].name){
                    compareFromRegexp(error, arr[i], regexpCheck[j].regexpValue);
                    break
                }
            }
            
        }
    }
    if(error.length > 0 ) {
        return 'Введите ' + error.join(', ');
    }
    return false
}
function compareFromRegexp(error, opjInput, regexpValue){
    let result = opjInput.value.match(regexpValue);
    if(!result) error.push(`корректный ${opjInput.name}`);
    return
}

function $(selector) {
    return document.querySelector(selector)
}

function returnLastIndex(arr) {
    if(arr.length !=  0){
        return arr[arr.length - 1].id;
    }
    else{
        return 0;
    }
}

function deleteValueComment() {
    $('#nameInComment').value = '';
    $('#emailInComment').value = '';
    $('#bodyInComment').value = '';
}


const popup = {
    open: function() {
        $('.popup.layout').style.display = 'grid';
        $('.title.input').focus();
        popup.lockScroll(true);
    },
    close: function() {
        $('.popup.layout').style.display = 'none';
        popup.lockScroll(false);
    },
    closeClickOut: function (e) {
        if (e.target === $('.popup')) {
            $('.popup').style.display = 'none';
            popup.lockScroll(false)
        }
    },
    lockScroll:function (value) {
        if(value) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    },
    deleteValuePopup:function () {
        $('.title').value = '';
        $('.textarea').value = '';
    }
};

const isOpen = {
    open: function(el, display) {
        $(el).style.display = display || 'block'
    },
    close: function(el) {
        $(el).style.display = 'none'
    },
    closeMessage:function (e) {
        if (e.target === $('.message')) {
            isOpen.close('.message');
        }
    }
}

const view = {
    preloader: function(location) {
        location.insertAdjacentHTML('afterbegin', ` <div class="preloader__contener">
            <p><img src="5.svg" alt=""></p>
            </div>`);
    },
    postNotFound: function(location) {
        location.insertAdjacentHTML('afterbegin', `  <div class="postNotFound" id="postNotFound">
            <p class="post__subtitle">
                Статей не найдено!
            </p>
        </div>`);
    },
    post: function(id, title, body, stack) {
        $('.posts').insertAdjacentHTML(stack, `<a href="post.html?post=${id}&title=${title}&body=${body}" class="post" id="idPost${id}">
                <h2 class="post__title">${title}</h2>
                <p class="post__subtitle">${body}</p>
            </a>`);
    },
    comment: function(email, name, body, stack) {
        $('.comments').insertAdjacentHTML(stack, `<div class="comment">
            <p class="name">${name}  <span>${email}</span></p>
            <p class="bodyComment">${body}</p>
        </div>`);
    },
}


const display = {
    posts: function(resp) {
        
        constant.respArreyPosts = resp;
        local.addRespPosts();

        resp.forEach((element) => {
            view.post(element.id, element.title, element.body, 'afterbegin');
        });
        $('.preloader__contener').remove();
    },
    post: function(id, title, body) {
        view.post(id, title, body, 'afterbegin');
    },
    comments: function(resp) {
        constant.respArreyComment = resp;
        local.addRespComments()

        resp.forEach((element) => {
            view.comment(element.email, element.name, element.body, 'beforeend');
        });

        $('.preloader__contener').remove();
    },
    comment: function(email, name, body) {
        view.comment(email, name, body, 'beforeend');
    },
    message: function(mess, corrent) {
        if(corrent) {
            if($('.message').classList.contains('no-corrent')) $('.message').classList.remove('no-corrent');
            $('.message').classList.add('corrent');
        }
        else{
            if($('.message').classList.contains('corrent')) $('.message').classList.remove('corrent');
            $('.message').classList.add('no-corrent');
        }
        if (mess) {
         isOpen
        .open('.message');
            $('.message').innerHTML = mess;
            setTimeout(function() {
             isOpen
            .close('.message');
            }, 2300);
        } else return false
    }

};


const api = {
    getData: function(url, func) {
        constant.xhr.open("GET", url, true);
        constant.xhr.responseType = 'json';
        constant.xhr.send();
        constant.xhr.onload = function() {
            func(constant.xhr.response);
        };
    },
    sendData: function(url, userId, id, title, body) {
        constant.xhr.open("POST", url, true);
        constant.xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            id: id,
            userId: userId,
            title: title,
            body: body,
        }

        constant.xhr.onload = function() {
            popup.deleteValuePopup();
            display.post(id, title, body);
        };
        constant.xhr.send(JSON.stringify(obj));
    },
    sendComment: function(url, idPost, valueId, valueName, valueEmail, valueBody) {
        constant.xhr.open("POST", url, true);
        constant.xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            postId: idPost,
            id: valueId,
            name: valueName,
            email: valueEmail,
            body: valueBody
        }

        constant.xhr.onload = function() {
            deleteValueComment();
            display.comment(valueEmail, valueName, valueBody);
        };
        constant.xhr.send(JSON.stringify(obj));
    }
}

const local = {
    add: function (postAdd, location){
        if (localStorage.getItem(location) === null) {
            localStorage.setItem(location ,JSON.stringify([postAdd]));
        }
        else{
            let localPosts = JSON.parse(localStorage.getItem(location));
            localPosts.push(postAdd);
            localStorage.setItem(location,JSON.stringify(localPosts));
        }
    },
    addRespPosts: function (){
        if (localStorage.getItem('posts') !== null) {
            let localPosts = JSON.parse(localStorage.getItem('posts'));
            for(post of localPosts){
                constant.respArreyPosts.push(post);
            }
        }
    },
    addRespComments: function (){
        if (localStorage.getItem('comments') !== null) {
            let localComments = JSON.parse(localStorage.getItem('comments'));
            for(comment of localComments){
                if(comment.postId == idPost){
                    constant.respArreyComment.push(comment);
                }
            }
        }
    }

}

function deleteValueSearch (){
    let idInput = this.getAttribute('for');
    let input = $('#' + idInput);
    input.value = "";
    this.classList.add('hide');

}

function daggerSearch(){
    if($('#inputSearch').value == "") $('.label-dagger-search').classList.add('hide');
    else $('.label-dagger-search').classList.remove('hide');
}