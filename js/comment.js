view.preloader($('.comments'));
let idPost = +get('post');
function get(variable) {
    return (new URL(document.location.href)).searchParams.get(variable);
}

$('.post__title').innerText = get('title');
$('.post__body').innerText = get('body');


api.getData(constant.url + `comments?postId=${idPost}`, display.comments);

$('#addComment').onclick = function () {
    let valueName = $('#nameInComment').value.trim();
    let valueEmail = $('#emailInComment').value.trim();
    let valueBody = $('#bodyInComment').value.trim();
    let valueId = +returnLastIndex(constant.respArreyComment) + 1;

    let strMessage = noCorrentComment([$('#nameInComment'),$('#emailInComment'), $('#bodyInComment')]);
    if(strMessage){
        display.message(strMessage);
        return
    }

        api.sendComment(constant.url + 'comments?postId=${idPost}', idPost, valueId, valueName, valueEmail, valueBody);
        constant.respArreyComment.push({
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
    
}
