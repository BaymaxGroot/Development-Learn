# 跨域

    是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制

## 同源

    两个地址具有相同的协议、主机、端口号

## 跨域造成的问题

1. Cookie、LocalStorage、IndexDB无法读取
2. 无法接触非同源的DOM
3. 无法向非同源发送ajax请求

## 跨域解决方案

1. jsonp

    原理: 在html中通过相应的标签从不同的域名下加载静态资源(js|css|img)是被浏览器所允许的，(iconfont例外)
    (我们可以通过动态的创建script标签，再去请求一个带参网址来实现跨域通信)

```javascript
    var script = document.createElement('script');
    function getData(data) {
        console.log(data);
    }
    script.src = 'http://localhost:3000/?callback=getData';
    document.body.appendChild(script);
    /**
     * 缺陷就是只支持Get请求
     * **/
```

2. document.domain + iframe

    前提: 必须拥有同一个基础域名，而且所使用的协议和端口号要一致

```javascript
    /**
     * a.test.cn 和 b.text.cn
     * **/
    分别设置 document.domain = 'test.cn'
```

3. window.name + iframe

    原理: iframe标签可以跨域、window.name属性值在文档刷新后依然存在

4. location.hash + iframe

    同3.

5. postMessage

    html5新增加的api

```javascript
    /**
     * otherWindow指的是目标窗口 - 是window.frames或window.open的成员
     * 
     * targetOrigin是限定消息接受范围，不限制就用*
     * **/
    otherWindow.postMessage(message, targetOrigin);

    /**
     * 接收消息如下
     * **/
    window.addEventListener('message', fn);
```

6. CORS跨域资源共享

    它允许浏览器向跨域服务器发送XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。实现CORS的关键是服务器，只要服务器实现了CORS接口，就可以跨源通信

    CORS中会将请求分为简单请求和非简单请求，只要满足以下条件就是简单请求：

        1. 请求方式为GET/POST/HEAD
        2. http请求头信息中不超过以下字段: Accept、Accept-Language、Content-Language、Content-Type(application/x-www-form-urlencoded、multipart/form-data、text/plain)
    
    若不满足以上条件就是非简单请求
    
    1. 简单请求过程

        对于简单请求，浏览器直接发出CORS请求，并自动添加一个Origin字段

        Origin字段用来表明本次请求来自哪个源

        服务器检查请求中的Origin，浏览器通过响应头中的Access-Control-Allow-Origin来判断此次请求是否允许跨域

    2. 非简单请求过程

        在正式通信之前，发送Options预检请求，浏览器会主动添加如下请求头信息: Access-Control-Request-Method、Access-Control-Request-Headers、Origin

        服务器收到预检请求后会检查以上请求头，响应头字段如下: Access-Control-Allow-Origin、Access-Control-Allow-Methods、Access-Control-Allow-Headers、

    若涉及到发送cookie

        前端要设置withCredential属性值为true，相应的后端要设置Access-Control-Allow-Credentials

7. websocket协议跨域

    websocket是html5中新的协议，它实现了浏览器和服务器的全双工通信，同时允许跨域通信

8. node、nginx代理跨域

    请求转发，跨域只针对浏览器