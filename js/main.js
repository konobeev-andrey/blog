const xhr = new XMLHttpRequest();
let respArreyPosts;
let respArreyComment;
const main = $('main');

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

function deleteValuePopup() {
    $('.title').value = '';
    $('.textarea').value = '';
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
    },
    close: function() {
        $('.popup.layout').style.display = 'none';
        display.message('');
    }
};

const isOpen = {
    open: function(el, display) {
        $(el).style.display = display || 'block'
    },
    close: function(el) {
        $(el).style.display = 'none'
    }
}

const view = {
    preloader: function(location) {
        location.insertAdjacentHTML('afterbegin', ` <div class="preloader__contener">
            <p><img src="5.svg" alt=""></p>
            </div>`);
    },
    postsFound: function(location) {
        location.insertAdjacentHTML('afterbegin', `  <div class="postsFound" id="postsFound">
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
        $('.comment').insertAdjacentHTML(stack, `<div class="com">
            <p class="name">${name}  <span>${email}</span></p>
            <p class="bodyComment">${body}</p>
        </div>`);
    },
}


const display = {
    posts: function(resp) {
        respArreyPosts = resp;
        resp.forEach((element) => {
            view.post(element.id, element.title, element.body, 'beforeend');
        });
        $('.preloader__contener').remove();
        local.displayPosts();
    },
    post: function(id, title, body) {
        view.post(id, title, body, 'afterbegin');
    },
    comments: function(resp) {
        respArreyComment = resp;
        resp.forEach((element) => {
            view.comment(element.email, element.name, element.body, 'beforeend');
        });
        local.displayComments();
        $('.preloader__contener').remove();
    },
    comment: function(email, name, body) {
        view.comment(email, name, body, 'beforeend');
    },
    message: function(mess) {
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
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
            func(xhr.response);
        };
    },
    sendData: function(url, userId, id, title, body) {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            id: id,
            userId: userId,
            title: title,
            body: body,
        }

        xhr.onload = function() {
            deleteValuePopup();
            display.post(id, title, body);
        };
        xhr.send(JSON.stringify(obj));
    },
    sendComment: function(url, idPost, valueId, valueName, valueEmail, valueBody) {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        let obj = {
            postId: idPost,
            id: valueId,
            name: valueName,
            email: valueEmail,
            body: valueBody
        }

        xhr.onload = function() {
            deleteValueComment();
            display.comment(valueEmail, valueName, valueBody);
        };
        xhr.send(JSON.stringify(obj));
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
    displayPosts: function (){
        if (localStorage.getItem('posts') !== null) {
            let localPosts = JSON.parse(localStorage.getItem('posts'));
            for(post of localPosts){
                view.post(post.id, post.title, post.body, 'afterbegin');
                respArreyPosts.push(post);
            }
        }
    },
    displayComments: function (){
        if (localStorage.getItem('comments') !== null) {
            let localComments = JSON.parse(localStorage.getItem('comments'));
            for(comment of localComments){
                if(comment.postId == idPost){
                    view.comment(comment.email, comment.name, comment.body, 'beforeend');
                    respArreyComment.push(comment);
                }
            }
        }
    }

}

function addInlocalStorage (postAdd, location){
    if (localStorage.getItem(location) === null) {
        localStorage.setItem(location ,JSON.stringify([postAdd]));
    }
    else{
        let localPosts = JSON.parse(localStorage.getItem(location));
        localPosts.push(postAdd);
        localStorage.setItem(location,JSON.stringify(localPosts));
    }
}
function displayLocalPosts(){
    if (localStorage.getItem('posts') !== null) {
        let localPosts = JSON.parse(localStorage.getItem('posts'));
        for(post of localPosts){
            view.post(post.id, post.title, post.body, 'afterbegin');
            respArreyPosts.push(post);
        }
    }
}
function displayLocalComments(){
    if (localStorage.getItem('comments') !== null) {
        let localComments = JSON.parse(localStorage.getItem('comments'));
        for(comment of localComments){
            if(comment.postId == idPost){
                view.comment(comment.email, comment.name, comment.body, 'beforeend');
                respArreyComment.push(comment);
            }
        }
    }
}