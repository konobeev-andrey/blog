function $(selector) {
    return document.querySelector(selector)
}

const popup = {
    open: function () {
        $('.popup.layout').style.display = 'grid';
    },
    close: function () {
        $('.popup.layout').style.display = 'none';
    }
}

function displayPosts (response){
    response.forEach(element => {
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

const xhr = new XMLHttpRequest();
