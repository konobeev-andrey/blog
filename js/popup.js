$('.write-post').onclick = popup.open;
$('.close-popup').onclick = popup.close;

window.onclick = function (e) {
    if (e.target === $('.popup')) {
        $('.popup').style.display = 'none';
    }
};


$('#addPost').onclick = function (title, bode) {
    let valueTitle = $('.title').value.trim();
    let valueBody = $('.textarea').value.trim();
    let valueId = returnLastIndex(constant.respArreyPosts) + 1;

    let strMessage = noCorrentComment([$('.title'),$('.textarea')]);
    if(strMessage){
        display.message(strMessage);
        return
    }

        api.sendData(constant.url + 'posts', 123, valueId, valueTitle, valueBody);
        constant.respArreyPosts.push({
            userId: 123,
            id: valueId,
            title: valueTitle,
            body: valueBody
        });
        local.add({
            userId: 123,
            id: valueId,
            title: valueTitle,
            body: valueBody
        }, 'posts');
        popup.close();
    }