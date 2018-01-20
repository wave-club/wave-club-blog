# mac osx下环境变量以及加载顺序



Mac系统的环境变量，加载顺序为：



/etc/profile    /etc/paths    ~/.bash_profile    ~/.bash_login    ~/.profile    ~/.bashrc



特别注意

/etc/paths中的内容:

/usr/bin
/bin
/usr/sbin
/sbin
/usr/local/bin

Homebrew安装的软件，其二进制执行文件都放在/usr/local/bin中，bin在使用时的查找不是覆盖原则，而是优先查找，所以例如mac已经自带了sqlite3，如果brew安装后，最新版的sqlite3是不会被调用的，因此可以将顺序修改一下以达到目的。





Mac配置环境变量的地方

 /etc/profile   （建议不修改这个文件 ）

 全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

 

 /etc/bashrc    （一般在这个文件中添加系统级环境变量）

 全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。

 

 ~/.bash_profile  （一般在这个文件中添加用户级环境变量）

 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!

 

 

**MAC 修改host文件 **

\-------------------------------------------------------

sudo vi /etc/hosts

 

 

**linux下查看和添加PATH环境变量**

==============================================

 

**PATH的格式为：**

\-------------------------------------------------------

PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>   ，中间用冒号隔开。

 

 

 

**添加PATH**环境变量：

\-------------------------------------------------------

[root@localhost u-boot-sh4]#export PATH=/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH

 

 

**查看PATH**环境变量：

\-------------------------------------------------------

[root@localhost u-boot-sh4]#echo $PATH

/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin

 

** 操作示例：**

\-------------------------------------------------------

通过编辑 启动文件 来改PATH，

\# vim /etc/profile

在文档最后，添加:

export PATH="/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH"

保存，退出。

 

想**立即生效**请运行：

\#source /etc/profile

不报错则成功。

 

如果想**立刻生效**，则可执行下面的语句：

$ source .bash_profile（这是文件名）

环境变量更改后，在用户下次登陆时生效。