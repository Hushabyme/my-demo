window.onload = function () {

    var btn = document.getElementById( 'gameBtn' );  // 获取gameBtn按钮

    btn.onclick = function () {  // 添加点击事件
        this.style.display = 'none';  // 点击后按钮消失

        Game.init( 'div1' );  // 游戏开始
    }
};

var Game = {
    // 游戏初始化
    init : function ( id ) {
        this.oParent = document.getElementById( id );  // 获取div1

        this.createScore();  // 游戏初始化时创建积分栏

        this.createEnemy( 0 );  // 从第一关开始

        this.createAircraft();  // 创建飞机
    },
    // 创建积分
    createScore : function () {
        var Score = document.createElement( 'div' );  // 创建一个div
        Score.id = 'score';  // div的id="score"
        Score.innerHTML = '积分：<span> 0 </span>';  // div中的内容
        this.oParent.appendChild( Score );  // 将div添加到div1中

        this.changeScore = Score.getElementsByTagName( 'span' )[0];  // 获取积分元素，使其数值可改变
    },
    // 创建小蜜蜂
    createEnemy : function ( now ) {

        if ( this.oUl) {
            clearInterval( this.oUl.timer );
            this.oParent.removeChild( this.oUl );
        }

        var currentLevel = this.Level[ now ];  // 获取当前关卡数据

        var arr = [];

        var oUl = document.createElement('ul');  // 创建一个ul列表
        oUl.id = 'bee';  // ul的id="bee"
        oUl.style.width = currentLevel.colNum * 40 + 'px';  // ul的宽度当前关卡的列数*单个敌人的宽度 = 400px
        this.oParent.appendChild( oUl );  // 将ul添加至div1中
        oUl.style.left = ( this.oParent.offsetWidth - oUl.offsetWidth ) / 2 + 'px';  // 让ul居中显示

        this.oUl = oUl;

        // 小蜜蜂排布
        for ( var i = 0; i < currentLevel.eMap.length; i++ ) {

            var oLi = document.createElement( 'li' );  // 创建li

            oLi.className = this.Enemy[ currentLevel.eMap[i] ].style;  // 创建li的class属性为当前敌人的属性
            oLi.blood = this.Enemy[ currentLevel.eMap[i] ].blood;
            oLi.speed = this.Enemy[ currentLevel.eMap[i] ].speed;
            oLi.score = this.Enemy[ currentLevel.eMap[i] ].score;

            oUl.appendChild( oLi );  // 将li添加至ul中
        }

        this.aLi = oUl.getElementsByTagName('li');  // 绑定全局的aLi以供后续使用

        for ( let i = 0; i < this.aLi.length; i++ ) {
            arr.push( [ this.aLi[i].offsetLeft , this.aLi[i].offsetTop ] );
        }

        for ( let i = 0; i < this.aLi.length; i++ ) {
            this.aLi[i].style.position = 'absolute';
            this.aLi[i].style.left = arr[i][0] + 'px';
            this.aLi[i].style.top = arr[i][1] + 'px';
        }

        this.runEnemy( currentLevel );  // 获取完关卡数据后小蜜蜂群开始运动
    },
    // 小蜜蜂群运动轨迹
    runEnemy : function ( currentLevel ) {

        var self = this;  // 防止this绑定到全局(window)上

        var L = 0,  // 小蜜蜂群距离左侧宽度
            R = this.oParent.offsetWidth - this.oUl.offsetWidth;  // 小蜜蜂群距离右侧宽度=div1的宽度-ul的宽度
        // 设置定时器
        this.oUl.timer = setInterval ( function () {
            // 小蜜蜂群的运动轨迹
            if ( self.oUl.offsetLeft >= R ) {
                currentLevel.isSpeedX *= -1;  // 当小蜜蜂群到达最右侧时，则向左方向移动
                self.oUl.style.top = self.oUl.offsetTop + currentLevel.isSpeedY + 'px';  // 当小蜜蜂群到达最右侧时，则向下移动
            }else if ( self.oUl.offsetLeft <= L ) {
                currentLevel.isSpeedX *= -1;  // 当小蜜蜂群到达最左侧时，则向右方向移动
                self.oUl.style.top = self.oUl.offsetTop + currentLevel.isSpeedY + 'px';  // 当小蜜蜂群到达最左侧时，则也向下移动
            }

            self.oUl.style.left = self.oUl.offsetLeft + currentLevel.isSpeedX + 'px';  // 初始化完成后小蜜蜂群则开始向右侧移动
        }, 200 );

        setInterval( function () {

            self.onemove();

        } , currentLevel.times )
    },
    // 单兵作战
    onemove : function () {

        var nowMove = this.aLi [ Math.floor( Math.random() * this.aLi.length ) ];

        var self = this;

        nowMove.timer = setInterval( function () {
            //  运用勾股定理求小风沿斜线飞向飞机
            var a = ( self.oAir.offsetLeft + self.oAir.offsetWidth/2 ) - ( nowMove.offsetLeft + nowMove.parentNode.offsetLeft + nowMove.offsetWidth /2 ),
                b = ( self.oAir.offsetTop + self.oAir.offsetHeight/2 ) - ( nowMove.offsetTop + nowMove.parentNode.offsetTop + nowMove.offsetHeight / 2 ),
                c = Math.sqrt ( a*a + b*b );

            var isX = nowMove.speed * a / c;
            var isY = nowMove.speed * b / c;

            nowMove.style.left = nowMove.offsetLeft + isX + 'px';
            nowMove.style.top = nowMove.offsetTop + isY + 'px';

            if ( self.crash ( self.oAir , nowMove ) ) {
                alert('Game Over');
                window.location.reload();
            }
        } , 30 )
    },
    // 创建飞机
    createAircraft : function () {

        var aircraft = document.createElement( 'div' );  // 创建div

        aircraft.className = this.aircraft.style;  // 将div的class="aircraft"

        this.oAir = aircraft;  // 将此变成全局属性

        this.oParent.appendChild( aircraft );  // 将div添加到div1中
        // 定位飞机的初始位置
        aircraft.style.left = ( this.oParent.offsetWidth - aircraft.offsetWidth ) / 2 + 'px';
        aircraft.style.top = this.oParent.offsetHeight - aircraft.offsetHeight + 'px';

        this.operateAircraft();  // 创建飞机后则可以开始操作
    },
    // 操作飞机
    operateAircraft : function () {

        var self = this;
        var iNum = 0;  // 初始化值
        var timer = null;  // 初始化定时器
        // 添加键盘按下事件
        document.onkeydown = function ( ev ) {

            var ev = ev || window.event;
            // 如果定时器不为空，则每隔30毫秒运动一次
            if ( !timer ) {
                timer = setInterval( keyEvent , 30 );
            }
            // 定义键盘左右键事件
            if ( ev.keyCode == 37 ) {
                iNum = 1;
            }else if ( ev.keyCode == 39 ) {
                iNum = 2;
            }
        };
        // 松开键盘事件
        document.onkeyup = function ( ev ) {

            var ev = ev || window.event;
            // 松开键盘后飞机停止运动
            clearInterval( timer );
            timer = null;
            iNum = 0;
            // 松开空格发射子弹
            if ( ev.keyCode == 32 ) {
                self.createBullet();
            }
        };
            // keyEvent方法
            function keyEvent() {
                if( iNum == 1 ) {
                    self.oAir.style.left = self.oAir.offsetLeft - 10 + 'px';
                }else if ( iNum == 2 ) {
                    self.oAir.style.left = self.oAir.offsetLeft + 10 + 'px';
                }
            }

    },
    // 创建子弹
    createBullet : function () {

        var bullet = document.createElement('div');  // 创建div
        bullet.className = this.aircraft.bullet;  // div的class="bullet"
        this.oParent.appendChild( bullet );  // 将div添加至div1中
        // 定义子弹的发射位置
        bullet.style.left = this.oAir.offsetLeft + this.oAir.offsetWidth / 2 + 'px';
        bullet.style.top = this.oAir.offsetTop - 6 + 'px';
        // 创建完子弹后可以发射
        this.runBullet( bullet );
    },
    // 子弹运动
    runBullet : function ( bullet ) {

        var self = this;
        // 定义子弹的飞行
        bullet.timer = setInterval( function () {
            // 当子弹飞行到div1的上边界后删除该子弹，防止侵占内存
            if ( bullet.offsetTop < -6 ) {
                clearInterval ( bullet.timer );
                self.oParent.removeChild( bullet );
            } else {
                // 每30毫秒，子弹则向上运动10px
                bullet.style.top = bullet.offsetTop - 10 + 'px';
            }

            for ( var i = 0; i < self.aLi.length; i++ ) {
                if ( self.crash ( bullet , self.aLi[i] ) ) {

                    if ( self.aLi[i].blood === 1 ) {

                        clearInterval( self.aLi[i].timer );

                        self.changeScore.innerHTML = parseInt( self.changeScore.innerHTML ) + self.aLi[i].score;
                        self.oUl.removeChild( self.aLi[i] );
                    } else {
                        self.aLi[i].blood--;
                    }

                    clearInterval( bullet.timer );
                    self.oParent.removeChild( bullet );
                }
            }

            if ( !self.aLi.length ) {
                self.createEnemy( 1 );
            }

        } , 30 )
    },
    // 碰撞检测
    crash : function ( obj1 , obj2 ) {
        // 子弹
        var L1 = obj1.offsetLeft,
            R1 = obj1.offsetLeft + obj1.offsetWidth,
            T1 = obj1.offsetTop,
            B1 = obj1.offsetTop + obj1.offsetHeight;
        // 小蜜蜂
        var L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft,
            R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft,
            T2 = obj2.offsetTop + obj2.parentNode.offsetTop,
            B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;

        if ( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2 ) {
            return false;
        } else {
            return true;
        }
    },
    // 小蜜蜂的数据
    Enemy : {
        e1 : {
            style : 'enemy1' ,  // 敌人的css样式
            blood : 1 ,  // 敌人的血量
            speed : 5 ,  // 敌人的飞行速度
            score : 100  // 杀死敌人可获得的分数
        },
        e2 : {
            style : 'enemy2' ,
            blood : 2 ,
            speed : 7 ,
            score : 200
        },
        e3 : {
            style : 'enemy3' ,
            blood : 3 ,
            speed : 10 ,
            score : 400
        }
    },
    // 关卡的数据
    Level : [
        // Level 1
        {
            eMap : [  // 敌人的排布
                'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
                'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
                'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
            ],
            colNum : 10,  // 10列
            isSpeedX : 10, // X轴运动速度
            isSpeedY : 10,  // Y轴运动速度
            times : 2000  // 每隔多久运动一次
        },
        // Level 2
        {
            eMap : [
                'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
                'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
                'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
                'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1'
            ],
            colNum : 10,
            isSpeedX : 15,
            isSpeedY : 15,
            times : 1500
        }
    ],
    // 飞机的数据
    aircraft : {
        style : 'aircraft',
        bullet : 'bullet'
    }


};
