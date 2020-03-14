$('.write-post').onclick = popup.open;
$('.close-popup').onclick = popup.close;

window.onclick = function (e) {
    if (e.target === $('.popup')) {
        $('.popup').style.display = 'none';
        display.message('');
    }
};

$('#addPost').onclick = function (title, bode) {
    let valueTitle = $('.title').value;
    let valueBody = $('.textarea').value;
    let valueId = returnLastIndex(respArreyPosts) + 1;
    if(!valueTitle || !valueBody) {
        addMessagePopup( valueTitle, valueBody);
    }
    else {
        api.sendData('https://jsonplaceholder.typicode.com/posts', 123, valueId, valueTitle, valueBody);
        respArreyPosts.push({
            userId: 123,
            id: valueId,
            title: valueTitle,
            body: valueBody
        });
        display.message('');
        local.add({
            userId: 123,
            id: valueId,
            title: valueTitle,
            body: valueBody
        }, 'posts');
        popup.close();
    }
}

function addMessagePopup (valueTitle, valueBody){
    let strMessage = 'Введите ';
    let arreyMessage = [];
    if(!valueTitle) arreyMessage.push('название');
    if(!valueBody) arreyMessage.push('статью');

    if(arreyMessage.length > 1){
        strMessage += arreyMessage.join(' и ');
     }
     else{
         strMessage += arreyMessage[0];
     }
    display.message(strMessage);

}