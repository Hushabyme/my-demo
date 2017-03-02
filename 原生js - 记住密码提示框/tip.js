window.onload = function () {

    var tip = document.getElementById('tip'),
        label = document.getElementsByTagName('label')[0]; // 获取页面第一个label标签

    function tips() {  //构建tips方法
        label.onmouseover = function () {
            tip.style.display = "block"
        };
        label.onmouseout = function () {
            tip.style.display = "none"
        };
    }

    tips();  // 执行方法

};

