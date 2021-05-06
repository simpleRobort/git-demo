var flag = 0;
var a = document.querySelector('.mainword').querySelectorAll('a');
var tite = document.querySelector('.mainword').querySelector('h3')
var time = document.querySelector('.mainword').querySelector('h5')
var randomImg = document.querySelector('nav').querySelectorAll('img');
var navSpan = document.querySelector('nav').querySelectorAll('span');
var url = location.search;
var bigImg = document.querySelector('.mainimg').querySelector('img');
var programPage = 0;
var programOpen = false;
var programs = 0;
var programPW = document.querySelector('.programPW');
var programPageUl = document.querySelector('.programPW_header').querySelector('ul');
var programsUl = document.querySelector('.programPW_bottom').querySelector('ul');
var programFocus = 0;
var programAll = 232;
var pageCount = 1;
var programPageCount = 1;
var startPage = 1;


//加载页数
programPageCount = Math.ceil(programAll / 30);
if (programPageCount <= 6) {
    programPage = programPageCount;
    programPageCount = 0;
} else {
    programPage = 6;
    programPageCount-=programPage;
}
console.log(programPage)
for (var i = 0; i < programPage; i++) {
    let li = document.createElement('li');
    if (i == programPage - 1) {
        if (programAll % 30 != 0) {
            li.innerHTML = pageCount + '-' + (programAll % 30 + pageCount - 1)
        } else {
            li.innerHTML = pageCount + '-' + (pageCount + 29)
        }

    } else {
        li.innerHTML = pageCount + '-' + (pageCount + 29)
    }
    console.log(programPage)
    programPageUl.appendChild(li)
    pageCount += 30
}
// 加载集数
if (programAll >= 30) {
    for (var i = 1; i <= 30; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        programsUl.appendChild(li)
    }
} else {
    for (var i = 1; i <= programAll; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        programsUl.appendChild(li)
    }
}
var programLi = programPW.querySelectorAll('li');
programPageUl.children[0].className = 'programCurrent';


// 按下回车事件
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        if (!programOpen){
            if (flag >= 3 && flag < 8) {
                var parm = randomImg[flag - 3].index;
                var parm2 = randomImg[flag - 3].page;
                window.location.replace('video.html?' + 'mainpic=' + parm + "&parm2=" + parm2)
            } else if (flag == 1) {
                programPW.style.display = 'block';
                programOpen = true
            }
        } else if (programOpen) {
            if (programFocus <programPageUl.children.length) {
                // 加载集数
                if (programAll >= (30*(programFocus+1))+startPage) {
                    programsUl.innerHTML = '';
                    for (var i = 1; i <= 30; i++) {
                        let li = document.createElement('li');
                        li.innerHTML = i + (30*(programFocus)+startPage)-1;
                        programsUl.appendChild(li)
                    }
                } else {
                    programsUl.innerHTML = '';
                    for (var i = 1; i <= programAll%30; i++) {
                        let li = document.createElement('li');
                        li.innerHTML = i + (30*programFocus) + startPage-1;
                        programsUl.appendChild(li)
                    }
                }
                programLi = programPW.querySelectorAll('li');
                console.log(programLi)
            }
        }
    }
})
// 空格退出选集
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 32) {
        programPW.style.display = 'none'
        programOpen = false
    }
})
// 获取图片
var tmp1 = url.split("?")[1];
console.log(tmp1)
var id = tmp1.split("&")[0];
console.log(id)
var imgid = id.split("=")[1];
console.log(imgid)
var page = tmp1.split("&")[1];
console.log(page)
var imgpage = page.split("=")[1];
console.log(imgpage)
var ajaxResult = new XMLHttpRequest();
// ajax
ajaxResult.open('get', 'http://39.105.38.10:8081/book/top250?page=' + imgpage);
ajaxResult.send();
ajaxResult.onreadystatechange = function () {
    if (ajaxResult.readyState == 4 && ajaxResult.status == 200) {
        programs = JSON.parse(ajaxResult.responseText).data;
        for (var i = 0; i < programs.subject.length; i++) {
            if (programs.subject[i].id == imgid) {
                console.log(programs.subject[i])
                bigImg.src = programs.subject[i].img
                tite.innerHTML = programs.subject[i].title;
                time.innerHTML = programs.subject[i].time;
            }
        }
    }
}
// $.ajax({
//     url: 'http://39.105.38.10:8081/book/top250?page=2',
//     type: "GET",
//     data:{
//         page:imgpage
//     },
//     dataType:"json",
//     success:function(result){
//         programs = result.data;
//     },
//     complete:function () {
//         for (var i = 0;i<programs.subject.length;i++) {
//             if (programs.subject[i].id == imgid) {
//                 console.log(programs.subject[i])
//                 bigImg.src = programs.subject[i].img
//                 tite.innerHTML = programs.subject[i].title;
//                 time.innerHTML = programs.subject[i].time;
//             }
//         }
//     }
// })
// 推荐随机
var randompage = parseInt(Math.random() * 10)
var ajaxResult2 = new XMLHttpRequest();
console.log(parseInt(Math.random() * 10))
ajaxResult2.open('get', 'http://39.105.38.10:8081/book/top250?page=' + randompage);
ajaxResult2.send();
ajaxResult2.onreadystatechange = function () {
    if (ajaxResult2.readyState == 4 && ajaxResult2.status == 200) {
        programs = JSON.parse(ajaxResult2.responseText).data;
        var number = parseInt(Math.random() * (programs.subject.length - 6))
        for (var i = 0; i < randomImg.length; i++) {
            randomImg[i].src = programs.subject[number].img
            randomImg[i].index = programs.subject[number].id;
            navSpan[i].innerHTML = programs.subject[number].title
            randomImg[i].page = randompage
            number++
        }

    }

}
// $.ajax({
//     url: 'http://39.105.38.10:8081/book/top250?page=2',
//     type: "GET",
//     data:{
//         page:randompage
//     },
//     dataType:"json",
//     success:function(result){
//         programs = result.data;
//     },
//     complete:function () {
//         var number = parseInt(Math.random() * (programs.subject.length-6))
//         for (var i = 0;i<randomImg.length;i++) {
//             randomImg[i].src = programs.subject[number].img
//             randomImg[i].index = programs.subject[number].id;
//             navSpan[i].innerHTML = programs.subject[number].title
//             randomImg[i].page = randompage
//             number++
//         }
//
//     }
// })
// 实现往右
function goright(e) {
    if (e.keyCode == 39) {
        if (!programOpen) {
            if (flag < a.length - 1) {
                flag++;
                for (var i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                a[flag].className = 'wordcurrent';
                console.log(flag)
            } else if (flag < randomImg.length + 2 && flag > 2) {
                flag++;
                for (var i = 0; i < randomImg.length; i++) {
                    randomImg[i].className = '';
                }
                randomImg[flag - 3].className = 'imgcurrent';
                console.log(flag)
            }
        } else if (programOpen) {
            if (programFocus < programLi.length - 1 && programFocus!= programPage-1) {
                programFocus++;
                for (var i = 0; i < programLi.length; i++) {
                    programLi[i].className = '';
                }
                programLi[programFocus].className = 'programCurrent';
                console.log(programFocus)
            } else if (programFocus == programPage-1) {
                console.log('programPageCount'+programPageCount)
                if (programPageCount != 0){
                    startPage = pageCount;
                    // 当到了显示的最后一页
                    if (programPageCount <= 6 && programPageCount > 0) {
                        //剩余不到6页
                        programPage = programPageCount;
                        programPageCount = 0;
                    } else  if (programPageCount > 6) {
                        //剩余大于6页
                        programPage = 6;
                        programPageCount-=6;
                    } else if (programPageCount == 0){
                        return
                    }
                    console.log('jiazai'+pageCount)
                    console.log(programPage)
                    programPageUl.innerHTML = '';
                    for (var i = 0; i < programPage; i++) {
                        let li = document.createElement('li');
                        if (i == programPage - 1) {
                            if (programAll % 30 != 0) {
                                li.innerHTML = pageCount + '-' + (programAll % 30 + pageCount - 1)
                            } else {
                                li.innerHTML = pageCount + '-' + (pageCount + 29)
                            }

                        } else {
                            li.innerHTML = pageCount + '-' + (pageCount + 29)
                        }
                        console.log(programPage)
                        programPageUl.appendChild(li)
                        pageCount += 30
                    }
                    // 加载集数
                    if (programAll >= startPage+29) {
                        programsUl.innerHTML = '';
                        for (var i = 1; i <= 30; i++) {
                            let li = document.createElement('li');
                            li.innerHTML = i + startPage-1;
                            programsUl.appendChild(li)
                        }
                    } else {
                        programsUl.innerHTML = '';
                        for (var i = 1; i <= programAll%30; i++) {
                            let li = document.createElement('li');
                            li.innerHTML = i + startPage-1;
                            programsUl.appendChild(li)
                        }
                    }
                    programLi = programPW.querySelectorAll('li');
                    programFocus = 0;
                    programPageUl.children[0].className = 'programCurrent';
                    console.log(programLi)
                }

            }
        }
    }
}

document.addEventListener('keyup', goright)

// // 实现往左
function goleft(e) {
    if (e.keyCode == 37) {
        if (!programOpen) {
            if (flag > 0 && flag < 3) {
                flag--;
                for (var i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                a[flag].className = 'wordcurrent';
                console.log(flag)
            } else if (flag > 3) {
                flag--;
                for (var i = 0; i < randomImg.length; i++) {
                    randomImg[i].className = '';
                }
                randomImg[flag - 3].className = 'imgcurrent';
            }
        } else if (programOpen) {
            if (programFocus > 0 && programFocus!= programPage) {
                programFocus--;
                for (var i = 0; i < programLi.length; i++) {
                    programLi[i].className = '';
                }
                programLi[programFocus].className = 'programCurrent';
                console.log(programFocus)
            } else if(programFocus == 0) {
                //当到了显示页数的第一页往左

                if (programPageCount >= Math.ceil(programAll / 30)-6){
                    return
                }
                console.log('do it')
                startPage -=180;
                pageCount = startPage;
                programPageCount +=programPage;
                programPage = 6;

                programPageUl.innerHTML = '';
                for (var i = 0; i < programPage; i++) {
                    let li = document.createElement('li');

                    li.innerHTML = pageCount + '-' + (pageCount + 29)

                    console.log(programPage)
                    programPageUl.appendChild(li)
                    pageCount += 30
                }
                // 加载集数
                if (programAll >= startPage+29) {
                    programsUl.innerHTML = '';
                    for (var i = 1; i <= 30; i++) {
                        let li = document.createElement('li');
                        li.innerHTML = i + startPage-1;
                        programsUl.appendChild(li)
                    }
                } else {
                    programsUl.innerHTML = '';
                    for (var i = 1; i <= programAll%30; i++) {
                        let li = document.createElement('li');
                        li.innerHTML = i + startPage-1;
                        programsUl.appendChild(li)
                    }
                }
                programLi = programPW.querySelectorAll('li');
                programFocus = 0;
                programPageUl.children[0].className = 'programCurrent';
                console.log(programLi)
            }

        }
    }
}

document.addEventListener('keyup', goleft)

// //实现往下
function godown(e) {
    if (e.keyCode == 40) {
        if (!programOpen) {
            if (flag < 3) {
                flag = 3;
                for (var i = 0; i < a.length; i++) {
                    a[i].className = '';
                }
                randomImg[flag - 3].className = 'imgcurrent';
            }
        } else if (programOpen) {
            if (programFocus < programPageUl.children.length) {
                programFocus = programPageUl.children.length;
                for (var i = 0; i < programLi.length; i++) {
                    programLi[i].className = '';
                }
                programsUl.children[0].className = 'programCurrent';
            } else if (programFocus < programLi.length - 6 ) {
                    programFocus += 6;
                    for (var i = 0; i < programLi.length; i++) {
                        programLi[i].className = '';
                    }
                    programLi[programFocus].className = 'programCurrent';
            }
        }
    }
}

document.addEventListener('keyup', godown)

// // 实现向上
function goup(e) {
    if (e.keyCode == 38) {
        if (!programOpen) {
            if (flag > 2) {
                flag = 0;
                for (var i = 0; i < randomImg.length; i++) {
                    randomImg[i].className = '';
                }
                a[flag].className = 'wordcurrent';
            }
        } else if (programOpen) {
            if (programFocus >= programPageUl.children.length + 6) {
                programFocus -= 6;
                for (var i = 0; i < programLi.length; i++) {
                    programLi[i].className = '';
                }
                programLi[programFocus].className = 'programCurrent';
            } else if (programFocus >= programPageUl.children.length) {
                if (programFocus - programPageUl.children.length < programPageUl.children.length) {
                    programFocus -= programPageUl.children.length;
                } else {
                    programFocus = programPageUl.children.length-1;
                }
                for (var i = 0; i < programLi.length; i++) {
                    programLi[i].className = '';
                }
                programLi[programFocus].className = 'programCurrent';
            }
        }
    }
}

document.addEventListener('keyup', goup)
