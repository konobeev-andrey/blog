view.preloader(constant.main);

api.getData(constant.url + 'posts', display.posts);


$('#inputSearch').onkeydown = function (e) {
    if (e.key === 'Enter') {
        searchPosts();
    }
};
$('.search__btn').onclick = searchPosts;

function searchPosts() {
    let postsFound = 0;
    let val = $('#inputSearch').value.trim();
    if (val !== '') {
        constant.respArreyPosts.forEach(function (elem) {
            if (elem.title.search(val) === -1 && elem.body.search(val) === -1) {
                $('#idPost' + elem.id).classList.add('hide');
            } else {
                $('#idPost' + elem.id).classList.remove('hide');
                postsFound++
            }
        });
    } else {
        constant.respArreyPosts.forEach(function (elem) {
            $('#idPost' + elem.id).classList.remove('hide');
        });
    }
    if (!postsFound && val !== '') {
        if(!$('#postsFound')) view.postsFound(constant.main);
    } else {
        if($('#postsFound')) $('#postsFound').remove();
    }
}


	