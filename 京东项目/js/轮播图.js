window.addEventListener('load' , function(){
    var  jsbox = document.querySelector('.js');
    var  jsbox2 = document.querySelector('.circle');
     var arrow_l = document.querySelector('.arrow-l');
     var arrow_r = document.querySelector('.arrow-r');          //不要少了.arrow-l 前面的  .
     var jsboxWidth = jsbox.offsetWidth;
     jsbox.addEventListener('mouseenter' , function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null ;
     })
     jsbox.addEventListener('mouseleave' , function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //  timer = this.setInterval( function(){
        //     //  手动调用点击事件
        //     arrow_r.click();
        // } , 3600)
     })
     //  动态生成 小圆圈
     var ul = jsbox.querySelector('ul');
     var ols = jsbox2.querySelector('ul');
   
     for( var i =0 ; i < ul.children.length ; i++) {
         var li = document.createElement('li');
         li.setAttribute('index',i); // 记录当前小圆圈的索引号
         ols.appendChild(li);     //  里面不是  'li'
         
         li.addEventListener('click' , function() {
             // 排他思想
             for(var i = 0 ; i <= ols.children.length ; i++ ) {
                //  ol.children[i].className = '' ;
                // ol.children[i].className = 'null' ;
                
                // ols.children[i].className = '';
    
                //   疑问  排他思想 那错了
             }
             this.className = 'current';

             //  克隆第一张图片
            //  var first = ul.children[0].cloneNode(ture);
            //  ul.appendChild(first);

             var index = this.getAttribute('index');
             num = index ;
             circle = index ;
            
             animate(ul , - index * jsboxWidth)
         })
     }
     ols.children[0].className = 'current' ;
      // 点击 下面按钮 图片自滚动
      var num = 0;
      var circle = 0 ;
      arrow_r.addEventListener('click' , function(){
          if( num == ul.children.length - 1){
              ul.style.left = 0;
              num = 0;
          }
          num++ ;
          circle ++ ;
          animate(ul , -num * jsboxWidth );
          //  排他思想
          if(circle == ols.children.length){
              circle = 0;
          }
          for(var i = 0 ; i < ols.children.length ; i++){
              ols.children[circle].className = '' ;
              ols.children[circle].className = 'current' ;
          }
        
      });
      arrow_l.addEventListener('click' , function(){
        if( num == 0){
            num = ul.children.length - 1;
            ul.style.left = -num * jsboxWidth + 'px' ;
            
        }
        num -- ;
        circle -- ;
        animate(ul , -num * jsboxWidth );
        //  排他思想
        if(circle < 0){
            circle = ols.children.length - 1;
        }
        for(var i = 0 ; i < ols.children.length ; i++){
            ols.children[circle].className = '' ;
            ols.children[circle].className = 'current' ;
        }
        // circleChange()
    });
    // function circleChange (){
    //     for(var i = 0 ; i <= ols.children.length ; i++ ) {
    //         //  ol.children[i].className = '' ;
    //         // ol.children[i].className = 'null' ;
            
    //         ols.children[i].className = '';
    
    //         //   疑问  排他思想 那错了
    //      }
    //      this.className = 'current';
    // }
   //  自动轮播图播放
   //    function dsq(){
    var timer = this.setInterval( function(){
        //  手动调用点击事件
        arrow_r.click()
    } , 3600)
//    }
//    dsq()
})