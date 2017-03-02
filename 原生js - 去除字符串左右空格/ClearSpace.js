window.onload = function () {
    var input = document.getElementById('input');
    var clearSpace = document.getElementById('clear');

    clearSpace.onclick = function(){
        input.value = input.value.replace(/(^\s*)|(\s*$)/g,'');
    }
};


