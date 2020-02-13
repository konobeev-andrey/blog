const main = $('main');

api.getData('https://jsonplaceholder.typicode.com/posts', display.posts);

$('#a').onkeydown = function (e){
    if(e.key == 'Enter'){
        popup.open();
    }
};




	