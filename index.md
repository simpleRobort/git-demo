<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="page-view-size" content="1280*720">
    <title>Title</title>
    <link rel="stylesheet" href="css/index.css">
<!--    <script src="js/jQuery.min.js"></script>-->
    <script>
    </script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .left {
            position: relative;
            width: 200px;
            height: 750px;
            background-color: rgba(0,0,0,0.6);
            float: left;
        }
        .left a {
            position: absolute;
            width: 170px;
            height: 28px;
            color: white;
            line-height: 28px;
            right: 0;
            font-size: 18px;
            text-decoration: none;
            padding-left: 5px;
        }
        .focus_movie {
            color: black!important;
            background-color: white;
        }
        .left :first-child {
            top: 138px;
        }
        .left :nth-child(2) {

            top: 250px;
        }
        .right {
            float: left;
            /*background-color: pink;*/
            width: 1000px;
            height: 750px;
        }
        .right ul {
            list-style-type: none;
            width: 850px;
            margin-left: 70px;
            margin-top: 150px;
        }
        .right li {
            float: left;
            margin-right: 15px;
            margin-bottom: 15px;
            padding: 0;
            height: 208px;
            transition: all .3s;
        }
        .right li img {
            width: 149px;
            height: 208px;
            border: 2px solid #aaa;
            margin-right: -1px;
            margin-top: 2px;
        }
        .focux_shadow {
            box-shadow: rgba(0,0,0,.5) 5px 10px 10px;
            transform: scale(1.05);
        }
        .page {
            position: absolute;
            left: 270px;
            top: 120px;
        }
        .page span {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background-color: #ccc;
        }
        .loading {
            position: fixed;
            display: none;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .loading p {
            position: absolute;
            left: 50%;
            transition: all .5;
            top: 50%;
            transform: translate(-50%,-75%) ;
            width: 100px;
            height: 100px;
        }
        .loading p img {
            width: 100%;
            height: 100%;
        }
        .scrollline {
            position: absolute;
            left: 1200px;
            top: 130px;
            width: 10px;
            height: 440px;
            border: 2px solid rgba(0, 0, 0, 0.62);
            border-radius: 10px;
        }
        .line {
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
            height: 0;
            border-radius: 10px;
            background-color: #ccc;
        }
        .search {
            position: relative;
            width: 70px;
            height: 30px;
            left: 1000px;
            top: 115px;
        }
        .search a {
            position: absolute;
            text-decoration: none;
            text-align: center;
            line-height: 30px;
            border-radius: 20px;
            left: 0;
            top: 0;
            color: black;
            border: 2px solid black;
            width: 100%;
            height: 100%;
        }
        .search .searchfocus {
            color: white;
            border: none;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="left">
        <a href="javascript:;" id="movie1" class="focus_movie">豆瓣电影Top250</a>
        <a href="javascript:;" id="movie2">豆瓣电影Top500</a>
    </div>
    <div class="page" id="page">
       当前为第 <span>1</span> 页，共 <span>5</span> 页
    </div>
    <div class="right">
        <ul>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
            <li><img alt=""></li>
        </ul>
    </div>
    <div class="loading">
        <p><img src="upload/load.gif" alt=""></p>
    </div>  
    <div class="search">
        <a href="javascript:;">搜索</a>
    </div>
    <div class="scrollline">
        <div class="line">
        </div>
    </div>
    <script src="js/ajax.js"></script>
    <script src="js/index.js"></script>
</body>
</html>