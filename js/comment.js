viewPreloader($('.comment'));

function get(variable) {
    return (new URL(document.location.href)).searchParams.get(variable);
}

$('.post__title').innerText = get('title');
$('.post__body').innerText = get('body');


api.getData(`https://jsonplaceholder.typicode.com/comments?postId=${get('post')}`, display.comments);

