view.preloader($('.comment'));
let idPost = +get('post');
function get(variable) {
    return (new URL(document.location.href)).searchParams.get(variable);
}

$('.post__title').innerText = get('title');
$('.post__body').innerText = get('body');


api.getData(`https://jsonplaceholder.typicode.com/comments?postId=${idPost}`, display.comments);

$('#addComment').onclick = function () {
    let valueName = $('#nameInComment').value;
    let valueEmail = $('#emailInComment').value;
    let valueBody = $('#bodyInComment').value;
    let valueId = +returnLastIndex(respArreyComment) + 1;
    if(!valueName || !valueBody || !valueEmail){
        addMessageComment(valueName, valueBody, valueEmail);
    }
    else {
        api.sendComment('https://jsonplaceholder.typicode.com/comments?postId=${idPost}', idPost, valueId, valueName, valueEmail, valueBody);
        respArreyComment.push({
            postId: idPost,
            id: valueId,
            name: valueName,
            email: valueEmail,
            body: valueBody
        });
        local.add({
            postId: idPost,
            id: valueId,
            name: valueName,
            email: valueEmail,
            body: valueBody
        },'comments');
        display.message('');
    }
}
function addMessageComment (valueName, valueBody, valueEmail){
    let strMessage = 'Введите ';
    let arreyMessage = [];
    if(!valueName) arreyMessage.push('имя');
    if(!valueEmail) arreyMessage.push('email');
    if(!valueBody) arreyMessage.push('комментарий');
    strMessage += arreyMessage.join(', ');

    let lastIndex = strMessage.lastIndexOf(',');
    if(arreyMessage.length > 1){
        strMessage = strMessage.slice(0,lastIndex) + ' и' + strMessage.slice(lastIndex + 1);
     }
    display.message(strMessage);

}