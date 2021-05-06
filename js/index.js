window.addEventListener('load',function () {
    // 阻止按键滚动
    document.onkeydown =(function (event) {
        event.preventDefault();
    });
    var programs;
    var oli = document.querySelectorAll('li');
    var thisPage = 1;
    var countPage = 0;
    var allMovie = 0;
    var allPage =0;
    var startImg = 0;
    var leaveImg = 0;
    var lastPageLength;
    var endImg;
    var search = document.querySelector('.search').querySelector('a')
    var load = document.querySelector('.loading');
    var loadp = load.querySelector('p');
    var degg = 360;
    var scrollLine = document.querySelector('.scrollline');
    var sline = document.querySelector('.line');
    var needDisplay = 0;
    var programAll = 67;
    // 跳转与传递cookie
    document.addEventListener('keyup',function (e) {
        if (e.keyCode == 13) {
            if (flag>=0 && flag<10) {
                var parm = oli[flag].children[0].index;
                var parm2 = oli[flag].children[0].page;
                window.location.assign('video.html?' + 'mainpic=' + parm + "&parm2="+parm2 + "&programAll="+ programAll)
            } else if (flag == 10) {
                window.location.assign('search.html')
            }
        }
    })
    // loading部分
    function lock(infor) {
        load.style.display = infor;

    }
    function loadpic(start,end,type,callback){
        lock('block')
        var ajaxResult = new  XMLHttpRequest();
        ajaxResult.open('get','http://39.105.38.10:8081/book/top250?page='+countPage);
        ajaxResult.send();
        ajaxResult.onreadystatechange = function (){
            if (ajaxResult.readyState == 4 && ajaxResult.status == 200) {
                programs = JSON.parse(ajaxResult.responseText).data;
                callback ? callback():console.log('无回调函数');
                if (type == 1) {
                    if (needDisplay != 0) {
                        for (var i = oli.length-needDisplay;i<oli.length;i++) {
                            oli[i].style.display = 'block'
                            needDisplay--
                        }
                    }
                    if (countPage == 10) {
                        // countPage = 9;
                        for (var i = endImg;i<oli.length;i++) {
                            oli[i].style.display = 'none'
                            needDisplay++
                        }
                        console.log(oli[9].children[0].page)
                        startImg +=1;
                        console.log(startImg + '    pagespecial' + countPage)
                        return
                    }
                    // 当要加载的图片数量已经不够时
                    if (startImg+9 >= programs.subject.length){
                        lastPageLength = programs.subject.length;
                        if (startImg >= programs.subject.length) {
                            countPage++;
                            loadpic(0,9,1)
                        } else {
                            // 把剩下的不到10个先加载
                            endImg = programs.subject.length - startImg;
                            for (var i = 0;i<endImg;i++) {

                                oli[i].children[0].src = programs.subject[startImg].img;
                                oli[i].children[0].index = programs.subject[startImg].id;
                                oli[i].children[0].page = countPage;

                                startImg++;

                                console.log(startImg + '    page' + countPage)
                            }
                            countPage++;
                            loadpic(endImg,9,1)
                        }
                        startImg = 0;
                    } else {
                        // 加载图片

                        for (var i = start;i<=end;i++) {
                            oli[i].children[0].src = programs.subject[startImg].img;
                            oli[i].children[0].index = programs.subject[startImg].id;
                            oli[i].children[0].page = countPage;

                            startImg++;
                            console.log(startImg + '    page' + countPage)
                        }
                    }
                } else if (type == 0) {
                    if (startImg - 20 < 0) {
                        countPage-=1
                        if (10-startImg>=0) {
                            startImg = lastPageLength - (10-startImg) - 10
                            loadpic(0,9,1)
                        } else {
                            startImg =  startImg - 20 +lastPageLength;
                            loadpic(0,9,1)
                        }
                    } else {
                        startImg-=20;
                        loadpic(0,9,1)
                    }
                }

                lock('none')
            }

        }

    }
    loadpic(0,9,1,function(){
        allMovie = programs.total;
        allPage = Math.ceil(allMovie/10)
        ospan[1].innerHTML = allPage;
        scrollLine.style.height = scrollLine.offsetHeight - (scrollLine.offsetHeight % allPage) + allPage + 'px'
        sline.style.height = scrollLine.offsetHeight / allPage +'px';
    })
    var oa = document.querySelector('.left').querySelectorAll('a');
    var oaflag = 0;
    var flag = -2;
    var oimg = document.querySelectorAll("img");

    var ospan = document.querySelector('#page').querySelectorAll('span');
    // 求总页数

    var a = 0;


    // 豆瓣电影上下跳转
    function updown(e) {
        if (e.keyCode == 40) {
            oa[0].className = '';
            oa[1].className = 'focus_movie';
            flag = -1;
            oaflag = 1;
            // 更新豆瓣电影Top500


        } else if (e.keyCode == 38) {
            oa[1].className = '';
            oa[0].className = 'focus_movie';
            flag = -2;
            oaflag = 0;
            // 更新豆瓣电影Top250

        } else if (e.keyCode == 39) {
            // 进入图片取消上下
            flag = 0;
            console.log(flag)
            oli[flag].className = 'focux_shadow';
            oa[0].className = '';
            oa[1].className = '';
            document.removeEventListener('keyup',updown);
            document.addEventListener('keyup',goright);
            document.addEventListener('keyup',goleft);
            document.addEventListener('keyup',godown);
            document.addEventListener('keyup',goup)
        }
    }
    document.addEventListener('keyup',updown);
    // // 实现了➡往右
    function goright(e) {
        if (e.keyCode == 39) {
                if (flag <oli.length-1) {
                    flag++;
                    console.log(flag)
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                }
        }
    }
    // // 实现往左
    function goleft(e) {
        if (e.keyCode == 37) {
                if (flag >= 0) {
                    if (flag == 0 || flag == 5) {
                        flag = oaflag - 2;
                        for (var i = 0; i < oli.length; i++) {
                            oli[i].className = '';
                        }
                        oa[oaflag].className = 'focus_movie';
                        document.addEventListener('keyup',updown);
                        document.removeEventListener('keyup',goright);
                        document.removeEventListener('keyup',goleft);
                        document.removeEventListener('keyup',godown);
                        document.removeEventListener('keyup',goup)

                    } else {
                        flag--;
                        for (var i = 0; i < oli.length; i++) {
                            oli[i].className = '';
                        }
                        oli[flag].className = 'focux_shadow';
                    }

                }

        }
    }
    // //实现往下
    function godown(e) {
        if (e.keyCode == 40) {
                if (flag <= oli.length-6) {
                    flag+=5;
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                } else  if (flag == 10) {
                    flag = 4;
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                    search.className ='';
                    document.addEventListener('keyup',goright);
                    document.addEventListener('keyup',goleft);
                    document.addEventListener('keyup',goup)
                }else  if (flag > oli.length-6 && thisPage != allPage) {
                    thisPage+=1;
                    flag-=5;
                    loadpic(0,9,1)
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                    // 加载完毕显示当前页
                    ospan[0].innerHTML = thisPage;
                    sline.style.top = sline.offsetTop + sline.offsetHeight + 'px'

                }
        }
    }
    // // 实现向上
    function goup(e) {
        if (e.keyCode == 38) {
                if (flag >= 5) {
                    flag-=5;
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                } else  if (flag < 5  && thisPage != 1) {
                    thisPage-=1;
                    flag+=5;
                    loadpic(0,9,0)
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    oli[flag].className = 'focux_shadow';
                    ospan[0].innerHTML = thisPage;
                    sline.style.top = sline.offsetTop - sline.offsetHeight + 'px'
                } else if (flag == 4 && thisPage == 1) {
                    flag = 10;
                    for (var i = 0;i<oli.length;i++) {
                        oli[i].className ='';
                    }
                    search.className ='searchfocus';
                    document.removeEventListener('keyup',goright);
                    document.removeEventListener('keyup',goleft);
                    document.removeEventListener('keyup',goup)
                }

        }
    }


})