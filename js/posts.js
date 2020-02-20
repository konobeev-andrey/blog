const main = $('main');
viewPreloader(main);

api.getData('https://jsonplaceholder.typicode.com/posts', display.posts);


$('#inputSearch').onkeydown = function (e) {
    if (e.key === 'Enter') {
        popup.open();
    }
};
$('#inputSearch').oninput = searchPosts;

function searchPosts() {
    let postsFound = 0;
    let val = this.value.trim();
    if (val !== '') {
        respArreyPosts.forEach(function (elem) {
            if (elem.title.search(val) === -1 && elem.body.search(val) === -1) {
                $('#idPost' + elem.id).classList.add('hide');
            } else {
                $('#idPost' + elem.id).classList.remove('hide');
                postsFound++
            }
        });
    } else {
        respArreyPosts.forEach(function (elem) {
            $('#idPost' + elem.id).classList.remove('hide');
        });
    }
    if (!postsFound && val !== '') {
        $('.postsFound').classList.remove('hide');
    } else {
        $('.postsFound').classList.add('hide');
    }
}




	