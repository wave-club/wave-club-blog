为Mac 设置Python多版本开发环境

问题 - 可能会遇到多个版本同时部署的情况

- 系统自带的Python是2.x，自己需要Python 3.x，测试尝鲜；
- 系统是2.6.x，开发环境是2.7.x
- 由于Mac机器系统保护的原因，默认的Python中无法对PIP一些包升级，需要组建新的Python环境
- 此时需要在系统中安装多个Python，但又不能影响系统自带的Python，即需要实现Python的多版本共存。pyenv就是这样一个Python版本管理器

##### 解决方法 - **pyenv** 

##### 1.安装pyenv

```
brew install pyenv

```

##### 2.添加.zshrc 代码

```
if which pyenv > /dev/null; then eval "$(pyenv init -)"; fi
export PYENV_ROOT=/usr/local/var/pyenv
source .zshrc

```

##### 3.查看当前激活的是那个版本的Python

```
pyenv version

```

##### 4.查看已经安装了那些版本的Python

```
pyenv versions

```

##### 5.安装指定版本的Python

```
pyenv install xx.xx.xx (pyenv install 3.4.3)
pyenv rehash   # 记得一定要rehash

```

##### 6.切换和使用指定的版本Python版本3种方式 ######1.系统全局用系统默认的Python比较好，不建议直接对其操作

```
pyenv global system

```

2.用local进行指定版本切换，一般开发环境使用。

```
pyenv local 2.7.10

```

3.对当前用户的临时设定Python版本，退出后失效

```
pyenv shell 3.5.0

```

4.取消某版本切换

```
pyenv local 3.5.0 --unset

```

优先级关系：shell——local——global

7.列举所有的可用的Python版本

```
pyenv install -l

```

\###8.pyenv: version `system' not installed 再.zshrc .bashrc 中添加 `eval "$(pyenv init -)"` then source xxx





#### Mac 上在pyenv install *** 之前，需要安装xcode-select

`xcode-select --install`

###### 否则会报错：BUILD FAILED (OS X 10.12.3 using python-build 20160602)