const http = require('http');
const app = http.createServer();
const url = require('url');
const path = require('path');
const fs = require('fs');

app.on('request',(req,res) => {
    let parsms = url.parse(req.url,true);
    let realpath = path.join(__dirname,parsms.pathname);
    console.log(parsms.pathname.includes('/index.html'))
    // if (parsms.pathname.includes('/index.html')) {
        fs.readFile(realpath,(error,result) => {
            if (error != null) {
                res.writeHead(404,{
                    'content-type':'text/html;charset=utf8'
                });
                if (parsms.query.name == 'zzz') {
                    res.end('zzz欢迎你')
                }else if (parsms.pathname == '/index.html') {
                    res.end(realpath)
                }else {
                    res.end('<h1>hi，12hihihihihihi</h1>')
                }
            }
            res.end(result)
        })
    // }
});

app.listen(3001);
console.log('3001端口监听2');