$('.write-post').onclick = popup.open;
$('.close-popup').onclick = popup.close;

window.onclick = function (e) {
    if (e.target === $('.popup')) {
        $('.popup').style.display = 'none';
        display.message('');
    }
};