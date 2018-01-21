## Nginx 经典美文



####nginx 常用命令

    nginx  -c /etc/nginx/nginx.conf #nginx启动,conf 可以自己指定或者删除
    nginx -s stop #停止nginx
    nginx -s quit  #停止nginx
    nginx -s reload #nginx重载配置
    nginx -t #检查配置文件是否正确




![](http://upload-images.jianshu.io/upload_images/1899643-4810a76cc98f1196.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果将整个配置文件的结构简化一下，大概就是这样：

    main块
        event块｛
        #定义nginx的事件模型，不可或缺。
        ｝
    
        http块 ｛  #http服务器的必要块。
            server块 ｛ #定义虚拟主机的块。
                if块 ｛｝
                location块 ｛    #定义uri规则的块，可以使用正则表达式。
                    if块 ｛｝   #RewriteCond的重新规则条件的功能。
                ｝
            ｝
        ｝



##nginx 限制ip访问

    server {
        listen 80;
        server_name xx.xx.xx.xx;
    
        location / {
               root html/blog;
              index.index.php index.html index.htm;
              allow 127.0.0.1/24;
              allow 192.168.0.0/16;
              allow 10.10.0.0;
              deny all;
        }
    
    //deny 一定要加一个ip，否则调转到403。
    //对于allow的ip段，允许访问的段位从小到大排列。
    //24,代表子网掩码：255.255.255.0
    //16,代表子网掩码：255.255.0.0
    //8,代表子网掩码：255.0.0.0


也可以通过文件的形式include进来
1.首先建立一个用于屏蔽IP的配置文件，放在nginx的conf目录下面, 这里以iplist为例，iplist内容可以是是:

    deny 192.168.1.11;
    deny 192.168.1.123;
    deny 10.0.1.0/24;

2、在nginx的配置文件 nginx.conf 中加入 include iplist，以便这个配置文件能够被加载。

    server {
        listen 80;
        server_name localhost;
        location / {
        include iplist;
        proxy_pass http://local_tomcat;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forworded-For $proxy_add_x_forwarded_for;
        }
    }

3、重新加载nginx的配置 nginx -s reload，即可生效。



##开启gzip 压缩性能优化
    gzip on; #开启压缩
    gzip_static on; #告诉nginx在压缩资源之前，先查找是否有预先gzip处理过的资源。这要求你预先压缩你的文件（在这个例子中被注释掉了），从而允许你使用最高压缩比，这样nginx就不用再压缩这些文件了
    gzip_min_length  1k;   #允许压缩页面的最小字节数
    gzip_disable "msie6";  #为指定的客户端禁用gzip功能
    gzip_http_version 1.1; #压缩版本 
    gzip_vary on;  #支持前端的缓存服务器缓存经过gzip压缩的页面。
    gzip_comp_level 6; #指定压缩等级，其值从1到9，数字越大，压缩率越高，越消耗CPU，负载也越高.设置为4，这是一个比较折中的设置.
    gzip_proxied any; #允许或者禁止压缩基于请求和响应的响应流。我们设置为any，意味着将会压缩所有的请求。
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript text/x-js; #支持的压缩类型



##nginx图片及目录防盗链

什么是防盗链系统

防盗链系统就是防范盗链的系统，防止别人通过一些技术手段绕过本站的资源展示页面，盗用本站的资源，让绕开本站资源展示页面的资源链接失效。实施防盗链系统后，因为屏蔽了那些盗链的间接资源请求，从而可以大大减轻服务器及带宽的压力，也正如此，越来越多的站点都开始实施防盗链技术。

>Nginx的防盗链主要使用的是referer模块。

   语法：valid_referers none | blocked | server_names | <string> ...

>说明：当在HTTP请求头中有Referer字段，则变量$invalid_referer将会设置为空字符串，否则$invalid_referer将会设置为1. 匹配时不区分大小写

>none：表示请求头中没有Referer字段。
>blocked：表示请求头中有Referer字段，但是该字段的值已经被防火墙或者是代理服务器删除了，不是以"http://"或者是"https://"开头
>server_names：请求头的Referer字段包含其中一个server name。
>string：表示任意的字符串。可以是一个server name或者是server name和URI的结合，可以使用在server name的开头和结尾可以使用*。并且不会检查Referer字段的服务器的端口号。
    也可以使用正则表达式进行匹配，如果要使用正则表达式，则第一个符号必须是"~"，并且表达式匹配的内容应该是"http://"或者是"https://"以后的内容。

配置示例

    location ~ \.(png|jpg|jpeg|gif)$ {
    valid_referers none blocked server_names *.kakaogift.cn *.kakaogift.com;
    
        if ($invalid_referer) {
            return 403;
        }   
    } 



##nginx 负载均衡 load balance


######nginx的upstream目前支持4种方式的分配
　　<code>1)、</code> 轮询（默认） 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。
　　<code>2)、</code>weight 指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。
　　<code>3)、</code>ip_hash 每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。
　　<code>4)、</code>fair（第三方） 按后端服务器的响应时间来分配请求，响应时间短的优先分配。



    #server参数
    #weight=number       ;服务器的权重，在默认情况下是1。
    #max_conns=number    ;限制与代理服务器的最大并发连接数。 默认值为零，意味着没有限制
    #max_fails=number    ;最大失败数，与服务器进行通信失败的次数，服务器将被视为不可用。缺省情况下，尝试失败的次数被设置为1。
    #fail_timeout=time   ;最大超时，与服务器通信不可用的时间段，服务器将被视为不可用。默认情况下，参数被设置为10秒。
    #backup              ;标志着服务器作为备份服务器。当主服务器不可用时将启用
    #down                ;将服务器标记为永久不可用
    #resolve             ;监视对应于服务器的域名的IP地址的变化，自动修改上游配置而不需要重新启动
    #route=string        ;设置服务器的路由名称
    #service=name        ;启用DNS SRV记录解析和设置服务名称
    #slow_start=time     ;慢启动，即服务器可用后到提供服务的这段时间，默认为0，表示禁用，不能用于hash和ip_hash负载均衡方法
    
    upstream backend {
        ip_hash;	//支持round robin， least_conn，ip_hash
    
        server backend1.example.com weight=5;
        server backend2.example.com down;	//down只在ip_hash时有效，表示该server down时，发请求给下一个server
        server backend3.example.com max_fails=3 fail_timeout=30s;	//
        server 192.0.0.1 backup;
    }
    
    server {
        location / {
    	    proxy_pass http://backend;
        }
    }


##nginx 配置expires缓存实现性能优化

>expires功能就是允许通过nginx配置文件控制http的expires和cache-control响应头的内容。告送浏览器是否缓存和缓存多长时间。

######(1).根据文件扩展名进行判断

    location ~ .*\.(gif | jpg | jpeg | png | nmp | swf)$ {
        expires 365d;
    }  
######(2).缓存某个特定的文件
    location ~(robots.txt) {
        expires 7d;
        break;
    }


##nginx 日志相关优化

######1）.配置日志切割脚本

    vim cut_nginx_log.sh
    #!/bin/bash
    cd /opt/application/nginx/nginx/logs && \ /bin/mv blog_access.log     blog_access_$(date +%F -d -1day).log
    /opt/application/ngnix/nginx/sbin/nginx -s reload
    
    crontab -e
    00 00 * * * /bin/sh /usr/local/cut_nginx_log.sh >/dev/null 2>&1


2).不记录不需要的访问日志 如果日志写入太频繁，会占用大量的磁盘I/O，从而降低了服务器的性能

    location ~ .*\.(js | css | gif | jpg | jpeg | png | nmp | swf)$ {
        access_log off ;
    }


##Rewrite规则

    location  = / {
      # 精确匹配 / ，主机名后面不能带任何字符串
      [ configuration A ]
    }
    location  / {
      # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
      # 但是正则和最长字符串会优先匹配
      [ configuration B ]
    }
    location /documents/ {
      # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
      # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
      [ configuration C ]
    }
    location ~ /documents/Abc {
      # 匹配任何以 /documents/Abc 开头的地址，匹配符合以后，还要继续往下搜索
      # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
      [ configuration CC ]
    }
    location ^~ /images/ {
      # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
      [ configuration D ]
    }
    location ~* \.(gif|jpg|jpeg)$ {
      # 匹配所有以 gif,jpg或jpeg 结尾的请求
      # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
      [ configuration E ]
    }
    location /images/ {
      # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
      [ configuration F ]
    }
    location /images/abc {
      # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
      # F与G的放置顺序是没有关系的
      [ configuration G ]
    }
    location ~ /images/abc/ {
      # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
        [ configuration H ]
    }
    location ~* /js/.*/\.js


>已=开头表示精确匹配
>如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。
>^~ 开头表示uri以某个常规字符串开头，不是正则匹配
>~ 开头表示区分大小写的正则匹配;
>~* 开头表示不区分大小写的正则匹配
>/ 通用匹配, 如果没有其它匹配,任何请求都会匹配到

######so,实战项目一般这样

    所以实际使用中，个人觉得至少有三个匹配规则定义，如下：
    #直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
    #这里是直接转发给后端应用服务器了，也可以是一个静态首页
    # 第一个必选规则
    location = / {
        proxy_pass http://tomcat:8080/index
    }
    # 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
    # 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
    location ^~ /static/ {
        root /webroot/static/;
    }
    location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
        root /webroot/res/;
    }
    #第三个规则就是通用规则，用来转发动态请求到后端应用服务器
    #非静态文件请求就默认是动态请求，自己根据实际把握
    #毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
    location / {
        proxy_pass http://tomcat:8080/
    }

##优雅的显示错误页面

    server {
      ......
       error_page 500 501 502 503 504   xxx.html #https://err.tmall.com/error2.html
       error_page 400 403 404 405 408 410 411 412 413 414 415  https://err.tmall.com/error1.html
      ......
    }

##模块(心跳检查)nginx_upstream_check_module

1.下载模块包 wget https://github.com/yaoweibin/nginx_upstream_check_module/archive/v0.3.0.tar.gz
____
2.解压 tar -zxf v0.3.0.tar.gz
____
3.添加补丁 patch -p1 < ../nginx_upstream_check_module-master/check_1.5.12+.patch  

____
4.配置nginx ./configure --add-module=/opt/nginx_upstream_check_module-0.3.0
____
5.编译安装 make && make install
____
6.查看安装信息 nginx -V
____


    upstream default_upstream{
    	    keepalive 60;
    	    server 127.0.0.1:8080 max_fails=0 fail_timeout=30s weight=20;
    	    check interval=1000 rise=3 fall=2 timeout=3000 type=http default_down=false;
    	    check_http_send "GET / HTTP/1.0\r\n\r\n";
    	    check_http_expect_alive http_2xx;
    }


    #测试地址，不一定要配置
     location /nstatus {
      check_status;
      access_log off;
      allow all;
      #deny all;

}



##最后记录一些常用的默认配置,不需要修改就行

    error_log    logs/error.log warn;
指定error_log的日志文件为logs/error.log并设置记录级别为warning。

    events {
        use    epoll; #为什么nginx比apache快，epoll起到了比较关键的作用
        worker_connections    20480;
    }

设定事件模型使用epoll，每个worker进程可用的最大连接数是20480。

    root    /home/admin/cai/htdocs;
设置静态文件所在地，也就是网站根目录。

    sendfile    on;
打开会使用sendfile系统调用，用来发送静态文件，节省了文件在用户空间和内核空间拷贝的消耗。

    tcp_nopush     on;
打开后，会使TCP在发送数据时进行缓存，提高传输效率，但是会增加客户端响应时间。

    keepalive_timeout     15s;
    keepalive_requests     100;

设置keepalive连接的超时时间为15s，并且每处理100个请求以后就关闭链接。

    server_tokens     off;
关闭后，nginx在错误页面和响应的Server头中不会携带版本号信息。