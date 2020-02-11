const main = $('main');

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.responseType = 'json';

xhr.send();
xhr.onload = function(){
    displayPosts(xhr.response);
};






	