# 小知识点

## 认证授权

    Http是无状态的协议，对于事务处理没有记忆能力，每次客户端和服务端完成会话时，服务端不会保存任何会话信息，每个请求都是完全独立的，服务端无法确认当前访问者的身份，所以会用到以下几种会话跟踪的技术

1. Cookie

    Cookie由服务器颁发给客户端并保存在本地的数据，它会在客户端下一次向同一服务器发送请求时被携带并发送到服务器上
    Cookie具有不可跨域性，每个cookie都会绑定单一的域名，无法再别的域名下获取使用

    cookie重要属性如下

        1. name=value
            键值对，设置cookie的名称及相应值
        2. domain
            指定cookie所属的域名
            (第一个字符为 . )
        3. path
            指定cookie在哪个路径下生效，默认为 /
        4. maxAge
            cookie失效时间，单位为s
            > 0 失效时间
            < 0 临时cookie，关闭浏览器即失效
            = 0 删除cookie
        5. secure
            表明该cookie是否只被使用安全协议传输，默认为 false
        6. httpOnly
            若给某个cookie设置了该属性，则无法通过JavaScript脚本读取到该cookie

2. Session

    session是基于cookie实现的，session存储于服务器，sessionid保存于客户端的cookie中

    当客户端第一次访问服务器时，服务器会主动创建session，并将sessionid以cookie的形式返还给客户端，当客户端再次访问服务器时，请求会自动携带相应的cookie，服务器会校验从cookie中获得的sessionid

3. Access Token

    访问API是所需要的资源凭证，携带与请求头中；服务端无状态，可扩展性好

4. Refresh Token

    用于更新Access Token，Refresh Token一般保存于服务器的数据库中，只有在申请新的Access Token时才会验证

5. JWT

    目前最流行的跨域认证解决方案，不同于Token的是JWT是自验证，
    JWT一旦颁发，服务端没办法废弃掉，除非等它自身过期
    (适合一次性的命令认证，办法一个有效期极短的JWT)

## SSO单点登录

    公用的用户体系，用户只要登录之后，就能够访问所有的系统，为了使是这一解决方案，有以下两种策略

1. SAML 2.0
    认证
2. OAuth 2.0
    授权

## websocket

    使得浏览器具备实时双向通信的能力，是一个持久化的应用层协议

### 如何建立websocket连接

1. 客户端申请协议升级

    涉及到的HTTP请求报文段相关属性如下:

        Connection: Upgrade //表示要升级协议
        Upgrade: websocket 
        Sec-WebSocket-Version: 13
        Sec-WebSocket-Key: xxxxxx

2. 服务端响应协议升级

    涉及到的HTTP响应报文段相关属性如下:

        HTTP/1.1 101 Switching Protocols
        Connection: Upgrade
        Upgrade: websocket
        Sec-WebSocket-Accept: yyyyyyy // 由请求头中的Sec-WebSocket-key计算得来




