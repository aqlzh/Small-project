window, addEventListener('load', function() {
    var min = document.querySelector('.min');
    var max = document.querySelector('.max');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过focus 就显示、隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        min.style.visibility = 'visible';
        max.style.visibility = 'visible';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
            min.style.visibility = 'hidden';
            max.style.visibility = 'hidden';
            timer = setInterval(function() {
                max.click();
            }, 1000);
        })
        //动态生成小圆圈  有几张图片 就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        //创建并插入li
        var li = document.createElement('li');
        li.setAttribute('index', i)
        ol.appendChild(li);
        //小圆圈 排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    var num = 0;
    var circle = 0;
    //flag 节流阀
    var flag = true;
    ol.children[0].className = 'current';
    //深复制 ture
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    max.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 3) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == 3) {
                circle = 0;
            }
            //调用函数
            change();

        }
    })
    min.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = (ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //调用函数
            change();

        }
    })

    function change() {
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    }
    //定时器 2s一次
    var timer = setInterval(function() {
        max.click();
    }, 2000);
})