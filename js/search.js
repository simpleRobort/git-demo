var flag = -2;
var commend = document.querySelector('.active').querySelectorAll('span');
var tds = document.querySelectorAll('td');
var like = document.querySelector('.like');
var searchCommend = document.querySelector('.searchresult');
var searchImg = searchCommend.querySelectorAll('img');
var likeImg = document.querySelector('.like').querySelectorAll('img');
var searchWord = document.querySelector('.search').querySelector('h4');
var likeSpan = document.querySelector('.like').querySelectorAll('span');
var displayFlag = 0;
console.log(likeImg)
// 箭头移动
function commendchange(e) {
    // // 实现了➡往右
    if (e.keyCode == 39) {
        if (flag == -2) {
            commend[0].className = '';
            commend[1].className = 'currentactive';
            flag = -1;
        } else if (flag >= 50 && flag < 57) {
            flag++;
            console.log(flag)
            for (var i = 0; i < likeImg.length; i++) {
                likeImg[i].className = '';
            }
            likeImg[flag - 50].className = 'currentimg';
        } else if (flag >= 60 && flag < 67) {
            flag++;
            console.log(flag)
            for (var i = 0; i < searchImg.length; i++) {
                searchImg[i].className = '';
            }
            searchImg[flag - 60].className = 'currentimg';
        } else if (flag == -1 || (flag + 1) % 6 == 0) {
            if (displayFlag == 0) {
                flag = 50;
                commend[0].className = '';
                commend[1].className = '';
                for (var i = 0; i < tds.length; i++) {
                    tds[i].className = '';
                }
                likeImg[0].className = 'currentimg';
            } else if (displayFlag == 1) {
                flag = 60;
                console.log(flag)
                commend[0].className = '';
                commend[1].className = '';
                for (var i = 0; i < tds.length; i++) {
                    tds[i].className = '';
                }
                searchImg[0].className = 'currentimg';
            }

        } else if (flag < tds.length - 1) {
            flag++;
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = '';
            }
            tds[flag].className = 'currentactive';
        }
        // // 实现往左
        console.log(flag)
    } else if (e.keyCode == 37) {
        if (flag == -1) {
            commend[1].className = '';
            commend[0].className = 'currentactive';
            flag = -2;
        } else if (flag == 50 || flag == 54) {
            flag = 5;
            commend[0].className = '';
            commend[1].className = '';
            for (var i = 0; i < likeImg.length; i++) {
                likeImg[i].className = '';
            }
            tds[flag].className = 'currentactive';
        } else if (flag == 60 || flag == 64) {
            flag = 5;
            commend[0].className = '';
            commend[1].className = '';
            for (var i = 0; i < searchImg.length; i++) {
                searchImg[i].className = '';
            }
            tds[flag].className = 'currentactive';
        } else if (flag > 0 && flag < tds.length) {
            flag--;
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = '';
            }
            tds[flag].className = 'currentactive';
        } else if (flag > 50 && flag < 58) {
            flag--;
            for (var i = 0; i < likeImg.length; i++) {
                likeImg[i].className = '';
            }
            likeImg[flag - 50].className = 'currentimg';
        } else if (flag > 60 && flag < 68) {
            flag--;
            for (var i = 0; i < searchImg.length; i++) {
                searchImg[i].className = '';
            }
            searchImg[flag - 60].className = 'currentimg';
        }
        // //实现往下
    } else if (e.keyCode == 40) {
        if (flag < 0) {
            flag = 0;
            tds[flag].className = 'currentactive';
            commend[0].className = '';
            commend[1].className = '';
        } else if (flag <= tds.length - 7) {
            flag += 6;
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = '';
            }
            tds[flag].className = 'currentactive';
        } else if (flag >= 50 && flag < 54) {
            flag += 4;
            for (var i = 0; i < likeImg.length; i++) {
                likeImg[i].className = '';
            }
            likeImg[flag - 50].className = 'currentimg';
        } else if (flag >= 60 && flag < 64) {
            flag += 4;
            for (var i = 0; i < searchImg.length; i++) {
                searchImg[i].className = '';
            }
            searchImg[flag - 60].className = 'currentimg';
        }
        // // 实现向上
    }
    if (e.keyCode == 38) {
        console.log('up')
        if (flag > 5 && flag < tds.length) {
            flag -= 6;
            console.log(flag)
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = '';
            }
            tds[flag].className = 'currentactive';
        } else if (flag < 6 && flag >= 0) {
            flag = -2;
            console.log(flag)
            for (var i = 0; i < tds.length; i++) {
                tds[i].className = '';
            }
            commend[0].className = 'currentactive';
        } else if (flag >= 54 && flag < 58) {
            flag -= 4;
            console.log(flag)
            for (var i = 0; i < likeImg.length; i++) {
                likeImg[i].className = '';
            }
            likeImg[flag - 50].className = 'currentimg';
        } else if (flag>=64 && flag<68) {
            console.log(flag)
            flag-=4;
            for (var i = 0;i<searchImg.length;i++) {
                searchImg[i].className ='';
            }
            searchImg[flag-60].className = 'currentimg';
        }
    }
}

document.addEventListener('keyup', commendchange)

// 回车事件
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        if (flag >= 0 && flag < tds.length) {
            if (searchWord.innerHTML == '请输入影片的首字母') {
                searchWord.innerHTML = ''
            }
            var word = tds[flag].innerHTML;
            searchWord.innerHTML += word;
            like.style.display = 'none';
            searchCommend.style.display = 'block';
            displayFlag = 1;
        }
        if (flag == -1) {
            if (searchWord.innerHTML == '请输入影片的首字母') {

            } else {
                searchWord.innerHTML = searchWord.innerHTML.slice(0, searchWord.innerHTML.length - 1)
            }

            if (searchWord.innerHTML == '') {
                searchWord.innerHTML = '请输入影片的首字母'
                searchCommend.style.display = 'none';
                like.style.display = 'block';
                displayFlag = 0;
            }
        } else if (flag == -2) {
            searchWord.innerHTML = '请输入影片的首字母'
            searchCommend.style.display = 'none';
            like.style.display = 'block';
            displayFlag = 0;
            // 跳转
        } else if (flag >= 50 && flag < 58) {
            var parm = likeImg[flag - 50].index;
            var parm2 = likeImg[flag - 50].page;
            window.location.assign('video.html?' + 'mainpic=' + parm + "&parm2=" + parm2)
        } else if (flag >= 60 && flag < 68) {
            var parm = searchImg[flag - 60].index;
            var parm2 = searchImg[flag - 60].page;
            window.location.assign('video.html?' + 'mainpic=' + parm + "&parm2=" + parm2)
        }
    }
})
// 猜你喜欢
// 推荐随机
var randompage = parseInt(Math.random() * 10)
console.log(parseInt(Math.random() * 10))
var ajaxResult = new  XMLHttpRequest();
ajaxResult.open('get','http://39.105.38.10:8081/book/top250?page='+randompage);
ajaxResult.send();
ajaxResult.onreadystatechange = function (){
    if (ajaxResult.readyState == 4 && ajaxResult.status == 200) {
        programs = JSON.parse(ajaxResult.responseText).data;
        var number = parseInt(Math.random() * (programs.subject.length - 9))
        for (var i = 0; i < likeImg.length; i++) {
            likeImg[i].src = programs.subject[number].img;
            likeImg[i].index = programs.subject[number].id;
            likeSpan[i].innerHTML = programs.subject[number].title
            likeImg[i].page = randompage;
            number++
        }

    }

}
// $.ajax({
//     url: 'http://39.105.38.10:8081/book/top250?page=2',
//     type: "GET",
//     data: {
//         page: randompage
//     },
//     dataType: "json",
//     success: function (result) {
//         programs = result.data;
//     },
//     complete: function () {
//         var number = parseInt(Math.random() * (programs.subject.length - 9))
//         for (var i = 0; i < likeImg.length; i++) {
//             likeImg[i].src = programs.subject[number].img;
//             likeImg[i].index = programs.subject[number].id;
//             likeSpan[i].innerHTML = programs.subject[number].title
//             likeImg[i].page = randompage;
//             number++
//         }
//
//     }
// })
// 搜索保存数据 !!!需优化
// for (var i = 0;i<10;i++) {
//     $.ajax({
//         url: 'http://39.105.38.10:8081/book/top250?page=2',
//         type: "GET",
//         data: {
//             page: i,
//             keyword : 'a'
//         },
//         dataType: "json",
//         success: function (result) {
//             programs = result.data;
//         },
//         complete: function () {
//             console.log(programs)
//             // for (var j = 0; j < programs.subject.length; j++) {
//             //     var programname = pinyin.getCamelChars(programs.subject[j].title)
//             //     arrname.push(programname);
//             //     arrlongname.push(programs.subject[j].title);
//             //     arrimg.push(programs.subject[j].img)
//             //     arrpage.push(i)
//             //
//             // }
//         }
//     })
// }

// function searchprogram(str) {
//     var arrname2 = [];
//     var arrimg2 = [];
//     var indices = [];
//     var array = ['a', 'b', 'a', 'c', 'a', 'd'];
//     var element = 'a';
//     var idx = array.indexOf(element);
//     while (idx != -1) {
//         arrname2.push(idx);
//         arrimg2.push(arrimg[idx]);
//         idx = array.indexOf(element, idx + 1);
//     }
//     console.log(arrimg2);
//     console.log(arrname2);
// }


