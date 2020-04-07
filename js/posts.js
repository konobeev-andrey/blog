$('#inputSearch').onkeydown = function (e) {
    if (e.key === 'Enter') {
        searchPosts();
    }
};
$('.search__btn').addEventListener("click", searchPosts);

$('.label-dagger-search').addEventListener("click", deleteValueSearch);
$('#inputSearch').addEventListener("input", daggerSearch);

view.preloader(constant.main);

api.getData(constant.url + 'posts', display.posts);

function highlightElement (elem, val){
    if(val == ''){
        elem.innerHTML = elem.innerText;
    }
    else{
        let text = elem.innerText;
        let arrayIndex = [];
        do{
            if(arrayIndex.length === 0) arrayIndex.push(text.toUpperCase().indexOf(val.toUpperCase()));
            else arrayIndex.push(text.toUpperCase().indexOf(val.toUpperCase(), arrayIndex[arrayIndex.length-1] + 1));
        }
        while( arrayIndex[arrayIndex.length-1] !== -1)

        arrayIndex.pop();

        if(arrayIndex[0] !== -1){
            let str = text.slice(0 , arrayIndex[0])
            for(let i = 0; i<=arrayIndex.length-1; i++){
              str +=  '<span class="foundspan">' + text.slice(arrayIndex[i], arrayIndex[i] + val.length) + '</span>' + text.slice(arrayIndex[i] + val.length, arrayIndex[i+1]);
            }
            elem.innerHTML =  str;
        }
    }
}

function highlightFound (elemId, val){
    highlightElement ($('#idPost' + elemId + ' > .post__title'), val);
    highlightElement ($('#idPost' + elemId + ' > .post__subtitle'), val);
}


function searchPosts() {
    let postsFound = 0;
    let val = $('#inputSearch').value.trim();
    let regVal = new RegExp('...' + val + '...','gi');
    if (val !== '') {
        constant.respArreyPosts.forEach(function (elem) {
            if (elem.title.search(regVal) === -1 && elem.body.search(regVal) === -1) {
                $('#idPost' + elem.id).classList.add('hide');
            } else {
                $('#idPost' + elem.id).classList.remove('hide');
                postsFound++
                highlightFound(elem.id, val);
            }
        });
    } else {
        constant.respArreyPosts.forEach(function (elem) {
            $('#idPost' + elem.id).classList.remove('hide');
            highlightFound(elem.id, val);
        });
    }
    if (!postsFound && val !== '') {
        if(!$('#postNotFound')) view.postNotFound(constant.main);
    } else {
        if($('#postNotFound')) $('#postNotFound').remove();
    }
}
