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

const xhr = new XMLHttpRequest();
