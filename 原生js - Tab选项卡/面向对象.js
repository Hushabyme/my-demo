window.onload = function () {

    var News = function () {
        this.children = [];
        this.element = null;
    };

    News.prototype = {
        init : function () {
            throw new Error ('请重写你的方法');
        },
        add : function () {
            throw new Error ('请重写你的方法');
        },
        getElement : function () {
            throw new Error ('请重写你的方法');
        }
    }

    // 容器类构造函数
    var Container = function ( id , parent ) {
        News.call(this);
        this.id = id ;

    }

};