/*封装获取函数*/
    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }

    /*获取结束*/
    /*运动函数*/
    function domove(obj, json, endfn) {
        /*因为是公用的所以必须需要开启定时器*/
        obj.timer = setInterval(function () {
            /*第二部开始判断速度*/
            /*第三部加入开关*/
            var flag = true;
            for (var attr in json) {
                var Target = json[attr];  //获取到目标
                var first = " ";  //获取到初始值
                //初始值赋值
                if (attr == "opacity") {
                    first = Math.round(getStyle(obj, attr) * 100);
                } else {
                    first = parseInt(getStyle(obj,attr));
                }
                var speed_1 = (Target-first)/8; //缓慢减速
                var speed = speed_1>0?Math.ceil(speed_1):Math.floor(speed_1);
                var dis = first+speed; //每次走的距离
                if(dis>=Target&&speed>0||dis<=Target&&speed<0)
                {
                    dis = Target;  //超出后就拉回来
                }
                if(attr=="opacity")
                {
                    obj.style["opacity"] = dis/100;  //赋值
                    obj.style["filter"] = "opacity(opacity="+dis+")";
                }else
                {
                    obj.style[attr] = dis +"px";
                }
                /*总闸关闭*/
                if(dis!=Target)
                {
                    flag = false;
                }
            }
            /*For循环结束了。总闸不起作用了*/
                if(flag)
                {
                    clearInterval(obj.timer);
                    endfn&&endfn();  //执行回掉函数
                }
        }, 30)
    }
    /*运动函数结束*/
