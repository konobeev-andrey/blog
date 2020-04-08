$('.write-post').addEventListener("click", popup.open);
$('.close-popup').addEventListener("click", popup.close);


window.addEventListener("click", popup.closeClickOut);

$('.message').addEventListener("click", isOpen.closeMessage);

$('#addPost').addEventListener("click", addPost);

function  addPost () {
    let valueTitle = $('.title').value.trim();
    let valueBody = $('.textarea').value.trim();
    let valueId = returnLastIndex(constant.respArreyPosts) + 1;

    let strMessage = noCorrent([$('.title'),$('.textarea')]);
    if(strMessage){
        display.message(strMessage, false);
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
        display.message('Статья добавлена', true);
    }