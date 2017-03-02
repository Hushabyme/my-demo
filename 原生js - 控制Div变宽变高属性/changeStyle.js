// 构建changeStyle方法
var changeStyle = function (element, attribute, value) {
    element.style[attribute] = value  // input[0].style["width"] = 300px;
};

window.onload = function () {
// 获取元素
    var oBtn = document.getElementsByTagName("input"),
        oDiv = document.getElementById("div1"),
        oAtt = ["width","height","background","display","display"],
        oVal = ["300px","300px","red","none","block"];

    for (var i = 0; i < oBtn.length; i++){

        oBtn[i].index = i;  // oBtn[1].index(索引) = 1;

        oBtn[i].onclick = function () {  // 添加点击事件
            this.index == oBtn.length - 1 && (oDiv.style.cssText = "");  // 设置重置按钮为清空样式
            changeStyle(oDiv, oAtt[this.index], oVal[this.index])  // 调用changeStyle方法
        }
    }

};
