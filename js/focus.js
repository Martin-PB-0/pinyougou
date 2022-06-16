window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var focusImg = focus.querySelector('#focusImg');
    var arrow = focus.querySelectorAll('.arrow');
    var arrowL = focus.querySelector('.arrow-l');
    var arrowR = focus.querySelector('.arrow-r');
    var focusImgNum = focusImg.children.length;
    // ul宽度
    focusImg.style.width = focus.offsetWidth * (focusImgNum + 1) + 'px';
    // 1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
    focus.addEventListener('mouseenter', function() {
        // querySelectorAll获取的是对象集合，以伪数组形式储存，不能直接使用arrow.display
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].style.display = 'block';
        }
        clearInterval(focus.player);
        focus.player = null; //清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].style.display = 'none';
        };
        // 8.鼠标离开，自动播放
        focus.player = setInterval(function() {
            arrowR.click();
        }, 3000);
    });


    // 2.自动生成小圆圈
    var circle = focus.querySelector('ol');
    for (var i = 0; i < focusImg.children.length; i++) {
        var li = this.document.createElement('li');
        circle.appendChild(li);
        // 自定义属性
        circle.children[i].setAttribute('index', i);
        circle.children[0].className = 'current';
        // 在循环事件里面添加点击事件，每个li都添加了点击事件；每个li都是单独生成的对象
        // 3.点击小圆圈变色
        li.addEventListener('click', function() {
            if (value) {
                value = false;
                for (var j = 0; j < circle.children.length; j++) {
                    circle.children[j].className = '';
                }
                // 只能用this指向事件调用者
                this.className = 'current';
                // 4.点击小圆圈滑动图片
                // focusImg.style.left = -focus.offsetWidth * this.getAttribute('index') + 'px';
                animateLine(focusImg, -focus.offsetWidth * this.getAttribute('index'), function() {
                    value = true;
                });
                focusNum = this.getAttribute('index');
            }
        })
    }
    // 复制第一个li放到最后
    var firstLi = focusImg.children[0].cloneNode(true);
    focusImg.appendChild(firstLi);


    // 5.点击右侧按钮一次，图片往左播放一张。
    var focusNum = 0;
    var value = true; //节流阀
    arrowR.addEventListener('click', function() {
        if (value) {
            value = false;
            // 无缝滚动
            // focusNum = focusNum % focusImgNum;
            focusNum = focusNum >= focusImgNum ? 0 : focusNum;
            if (focusNum == 0) {
                focusImg.style.left = 0;
            }
            focusNum++;
            animateLine(focusImg, -focusNum * focus.offsetWidth, function() {
                value = true;
            });
            circleChange();
        }
    });
    // 6. 点击左侧按钮一次， 图片往右播放一张。
    arrowL.addEventListener('click', function() {
        if (value) {
            value = false;
            if (focusNum == 0) {
                focusNum = focusImgNum;
                focusImg.style.left = -focusImgNum * focus.offsetWidth + 'px';
            }
            focusNum--;
            animateLine(focusImg, -focus.offsetWidth * focusNum, function() {
                value = true;
            });
            circleChange();
        }
    });
    // 7.小圆圈跟随图片滚动相应变动,封装函数

    function circleChange() {
        // 可以用三元表达式或者取余法
        // focusNum = focusNum >= focusImgNum ? 0 : focusNum;
        focusNum = focusNum % focusImgNum;

        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[focusNum].className = 'current';
    }
    // 8.自动播放轮播图
    focus.player = setInterval(function() {
        arrowR.click();
    }, 3000);
    // 9.点击节流阀
})