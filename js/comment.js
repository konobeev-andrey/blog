view.preloader($('.comment'));
let idPost = +get('post');
function get(variable) {
    return (new URL(document.location.href)).searchParams.get(variable);
}

$('.post__title').innerText = get('title');
$('.post__body').innerText = get('body');


api.getData(constant.url + `comments?postId=${idPost}`, display.comments);

$('#addComment').onclick = function () {
    let valueName = $('#nameInComment');
    let valueEmail = $('#emailInComment');
    let valueBody = $('#bodyInComment');
    let valueId = +returnLastIndex(constant.respArreyComment) + 1;
    let strMessage = noCorrentComment([valueName,valueEmail, valueBody]);
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


function noCorrentComment (arr){
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
        display.message('Введите ' + error.join(', '));
        return 'Введите ' + error.join(', ');
    }
    return false
}
function compareFromRegexp(error, opjInput, regexpValue){
    let result = opjInput.value.match(regexpValue);
    if(!result) error.push(`корректный ${opjInput.name}`);
    return
}