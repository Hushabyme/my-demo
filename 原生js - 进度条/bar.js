timer = null;  // 清空定时器

window.onload = function () {

    var timer = setInterval(function () {  // 页面加载完毕后执行定时器
            progress();  // 执行定时器中的函数
        },30);  // 每隔30毫秒执行一次
    
    function progress() {
        var bar = document.getElementById("bar");  // 获取进度条的id

        bar.style.width = parseInt(bar.style.width) + 1 + "%";  // 将进度条的加载长度转换为整数
        bar.innerHTML = bar.style.width;  // 进度条里的内容等于加载的进度

        if(bar.style.width == "100%"){
            clearInterval(timer);  // 加载完成后清空定时器

        }
    }
    
};