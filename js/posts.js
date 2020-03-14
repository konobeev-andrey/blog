view.preloader(main);

api.getData('https://jsonplaceholder.typicode.com/posts', display.posts);


$('#inputSearch').onkeydown = function (e) {
    if (e.key === 'Enter') {
        searchPosts();
    }
};
// $('#inputSearch').oninput = searchPosts;

function searchPosts() {
    let postsFound = 0;
    let val = $('#inputSearch').value.trim();
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
        if(!$('#postsFound')) view.postsFound(main);
    } else {
        if($('#postsFound')) $('#postsFound').remove();
    }
}

// function f (element,val){
//     if(val){
//     let elementTitle = element.childNodes[1].innerText;
//     let elementBody = element.childNodes[3].innerText;
//     let indexTitle = elementTitle.search(val);
//     let indexBody = elementBody.search(val);
//     $('.post__title').innerHTML = elementTitle.slice(0, indexTitle)+'<mark>'+ elementTitle.slice(indexTitle, indexTitle + val.length)+'</mark>'+elementTitle.slice(indexTitle + val.length); 
//     $('.post__subtitle').innerHTML = elementBody.slice(0, indexBody)+'<mark>'+ elementBody.slice(indexBody, indexBody + val.length)+'</mark>'+elementBody.slice(indexBody + val.length); 
//     }   
// }

	