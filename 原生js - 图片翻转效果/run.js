/*===================================================================
* 运动的步骤
* 1. 闪的效果：瞬间宽高变为0，利用css3 —— scale ,随机
* 2. 图片由小变大，同时透明度从1变成0（必须是上一步完成了以后才进行）
* 3. 旋转 随机 透明度变化0到1 层次感（translate）（当所有图片透明度都变成0，才进行这一步）
 ===================================================================*/

window.onload = function () {

    var btn = document.getElementById('btn');
    var imgs = document.querySelectorAll('img');

    // 给按钮添加点击事件
    btn.onclick = function () {

        var endNum = 0;  // 运动完成的图片数
        var allEnd = 0;  // 判断是否所有的图片运动完了

        for ( var i = 0; i < imgs.length; i++ ) {

            ( function ( i ) {
                setTimeout( function () {  // 第一个运动
                            motion( imgs[i] , '10ms', function () {
                                this.style.transform = 'scale(0)';
                            },
                            function () { // 第二个运动
                            motion( this , '1s' , function () {
                                this.style.transform = 'scale(1)';
                                this.style.opacity = 0;
                            },
                            function () {
                                endNum++;

                                if( endNum == imgs.length ){
                                    toBig();
                                }
                        });
                    });
                }, Math.random() * 1000 )
            } )( i );

        }
        // 变大效果
        function toBig() {

            for ( var i = 0; i < imgs.length; i++ ) {
                imgs[i].style.transition = '';
                // 想要css3当中的变化，那就需要一个初始值

                imgs[i].style.transform = ' roTateY( 0deg ) translateZ( - '+Math.random() * 500 +' px )';

                ( function ( i ) {
                    setTimeout( function () {
                        motion( imgs[i] , '2s' , function () {
                            this.style.opacity = 1;
                            this.style.transform = ' roTateY( -360deg ) translateZ( 0 )';
                        });
                    } , Math.random() * 1000 )
                })( i )
            }

        }


        // 运动函数（运动对象，运动时间，运动属性函数，运动完成后做的事(callback)）
        function motion( obj , time , run , callback ) {

            obj.style.transition = time;

            run.call(obj);  // 调用函数，this指向obj

            obj.addEventListener('transitionend', function () {

                var called = false;
                if ( !called ) {
                    callback && callback.call(obj);
                    called = true;
                }


            }, false )

        }

    }
};