//基于jquery封装的函数

//父元素  点点父元素 左右按钮父元素 当前点点颜色 去除所有点点颜色  时间:2000
function $bannerOpacity(obj,btn,next,color,hidecolor,date){
    var objs=$(obj).children(),
        btns=$(btn).children(),
        next=$(next).children(),
        // color=$(color),
        // hidecolor=$(hidecolor),
        num= 0,
        flag=true,
        date=date||2000,
        t=setInterval(move,date);
    $(objs[0]).css({opacity: 1,zIndex: 5});
    $(btns[0]).addClass(color);
    function move(){
        if(!flag){
            return;
        }
        flag=false;
        num++;
        if(num>=objs.length){
            num=0;
        }
        btns.eq(num).addClass(color).siblings().removeClass(hidecolor);
        objs.eq(num).animate({opacity:1,zIndex:5},"slow").siblings().animate({opacity:0,zIndex:0},"slow",function(){
            flag=true;
        });
    }
    $(btns).click(function(){
        if(!flag){
            return;
        }
        flag=false;
        num=$(this).index();
        btns.eq(num).addClass(color).siblings().removeClass(hidecolor);
        objs.eq(num).animate({opacity:1,zIndex:5},"slow").siblings().animate({opacity:0,zIndex:0},"slow",function(){
            flag=true;
        });
    });
    $(obj).parent().hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,date);
    });
    $($(next[0])).click(function(){
        if(!flag){
            return;
        }
        flag=false;
        num--;
        if(num<0){
            num=objs.length-1;
        }
        btns.eq(num).addClass(color).siblings().removeClass(hidecolor);
        objs.eq(num).animate({opacity:1,zIndex:10},"slow").siblings().animate({opacity:0,zIndex:0},"slow",function(){
            flag=true;
        });
    });
    $($(next[1])).click(function(){
        move();
    });
}

//父元素  点点父元素 左右按钮父元素 当前点点颜色 去除所有点点颜色  时间:2000  W:offsetWidth宽度
function $bannerNext(obj,btn,next,color,hidecolor,date,W){
    var objs=$(obj).children(),
        btns=$(btn).children(),
        next=$(next).children(),
        widths=W || objs[0].offsetWidth,
        // color=$(color),
        // hidecolor=$(hidecolor),
        num= 0,
        nexts= 0,
        date=date||2000,
        flag=true,
        t=setInterval(move,date);
    objs.css({left:widths}).eq(0).css({left:0});
    btns.eq(0).addClass('activeshow');
    function move(){
        if(!flag){
            return;
        }
        flag=false;
        nexts++;
        if(nexts>=objs.length){
            nexts=0;
        }
        btns.eq(nexts).addClass(color);
        btns.eq(num).removeClass(hidecolor);
        objs.eq(num).animate({left:-widths},"slow");
        objs.eq(nexts).css({left:widths});
        objs.eq(nexts).animate({left:0},"slow",function(){
            flag=true;
        });
        num=nexts;
    }
    $(btns).click(function(){
        var index=$(this).index();
        nexts=index;
        if(!flag){
            return;
        }
        flag=false;
        btns.eq(nexts).addClass(color).siblings().removeClass(hidecolor);
        // btns.eq(num).removeClass(hidecolor);
        // btns.eq(nexts).addClass(color).siblings().css({background:hidecolor});
        objs.eq(num).animate({left:-widths},"slow");
        objs.eq(nexts).css({left:widths});
        objs.eq(nexts).animate({left:0},"slow",function(){
            flag=true;
        });
        num=nexts;
    });
    $(obj).parent().hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,date);
    });
    $($(next[0])).click(function(){
        if(!flag){
            return;
        }
        flag=false;
        nexts--;
        if(nexts<0){
            nexts=objs.length-1;
        }
        btns.eq(nexts).addClass(color);
        btns.eq(num).removeClass(hidecolor);
        // btns.eq(num).css({background:hidecolor});
        // btns.eq(nexts).css({background:color});
        objs.eq(num).animate({left:widths},"slow");
        objs.eq(nexts).css({left:-widths});
        objs.eq(nexts).animate({left:0},"slow",function(){
            flag=true;
        });
        num=nexts;
    });
    $($(next[1])).click(function(){
        move();
    });
}

//父元素 左右按钮父元素 子元素的间距 时间  W:offsetWidth
function $bannerChild(obj,next,num,date,W){
    var obj=$(obj),
        next=$(next),
        child=obj.children(),
        widths=W || child[0].offsetWidth,
        num=num||20,
        date=date||2000,
        flag=true,
        t=setInterval(move,date);
    obj.css({width:(widths+num)*child.length});

    function move(){
        if(!flag){
            return;
        }
        flag=false;
        obj.animate({left:-(widths+num)},"slow",function(){
            var first=obj.children().first();
            obj.append(first);
            obj.css({left:0});
            flag=true;
        });
    }
    $(obj).parent().hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,date);
    });
    next.children().eq(0).click(function(){
        //alert(1);
        move();
    });
    next.children().eq(1).click(function(){
        if(!flag){
            return;
        }
        flag=false;
        var first=obj.children().first();
        var last=obj.children().last();
        last.insertBefore(first);
        obj.css({left:-(widths+num)});
        obj.animate({left:0},"slow",function(){
            flag=true;
        });
    });
}
// 要点击的元素 变换的内容元素 点击的元素添加的类名  内容元素添加的类名
function clickList(clickitem,clickname,itemage,nameage,type) {
    clickitem.on(type,function(){
        let index = $(this).index();
        $(this).addClass(itemage).siblings().removeClass(itemage);
        clickname.eq(index).addClass(nameage).siblings().removeClass(nameage);
    })
}
// 到达高度的元素、fixed定位的元素、fixed添加的类名、页面内容的父元素、fixed定位的子元素、要添加的类名
function windowScroll(offs,connum,active,item,connums,active){
    $(window).scroll(function(){
        if($(window).scrollTop() >= offs.offset().top){
            connum.addClass(active);
        }else{
            connum.removeClass(active);
        }
        item.each(function(index,item){
            if($(window).scrollTop() >= $(item).offset().top -100){
                connums.eq(index).addClass(active).siblings().removeClass(active);
            }
        });
    });
}



