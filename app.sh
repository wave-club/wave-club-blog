#!/bin/bash

#Auth 刘俊斌

project_name=`cat ./server.conf | grep project_name | awk '{print $2}'`
version="";
branch="";
environment="dev";
publish_user=root;


echo "======================FETopic========================";

echo -e "\033[14;31m" "获取发布Tag列表: ${project_name}" '\033[0m';

git --no-pager tag

echo -e "\033[14;35m" "准备发布: ${project_name}" '\033[0m';



if [[ "x$1" == "x" ]]; then
    echo "======================FETopic========================";
    echo "请输入要发布的版本号码!例如: [0.0.1]";
    read -t 30  version;
fi


if [[ "x$1" == "x" ]]; then
    echo "======================FETopic========================";
    echo "请输入要发布的分支!例如: [master]";
    read -t 30  branch;
fi

if [[ "x$2" == "x" ]]; then
    echo "======================FETopic========================";
    echo "请输入要发布环境!例如: [dev|pro]";
    read -t 30 environment;
fi


confirm="N";


echo "======================FETopic========================";

echo -e "\033[14;35m" "将要发布 项目:"${project_name} "\033[0m";

echo "分支:${branch}-- 版本:${version}  -- 发布到: ${environment} 环境 -- 是否继续 [N/y]"
read confirm

case "${confirm}" in
    [yY]) ;;
    *) exit 1;;
esac

echo "======================FETopic========================";




echo -e "\033[14;35m"  "正在切换分支"  "\033[0m" ;

git add .

git commit -am "发布提交 ${version}"

git --no-pager tag -a $version -m '发布提交 ${version}'

git push --tags

echo $branch

git checkout $branch

echo -e "\033[14;35m"  "正在检查远端是否有更新"  "\033[0m" ;


git fetch;


echo -e "\033[14;35m"  "正在清除目录旧目录..."  "\033[0m" ;


rm -rf ./dist/*.js ./dist/*.html ./dist/stylesheets

_env='development'


if [ $environment == 'dev' ]; then
  _env='development'
else
  _env='production'
fi


echo "======================FETopic========================";


echo -e "\033[41;37m" "开始webpack 请稍等............. " '\033[0m'

if [ $environment == 'pro' ]; then
  npm run build
else
  npm run dev
  echo -e "\033[41;37m" "启动本地服务，退出发布 " '\033[0m'
  exit 2
fi


echo -e "\033[14;35m"  "开始目录调整中...."  "\033[0m" ;



mv dist/*.js dist/*.css dist/ups

mv dist/index.html dist/ups.html

mv dist/ups dist/ups

rm -rf ./dist/images

echo -e "\033[14;35m"  "目录调整结束"  "\033[0m" ;


echo "======================FETopic========================";


filename=Up主系统-${version}-${branch}-${environment}.tar.gz;

echo -e "\033[14;35m"  "开始创建 tar 包 ${filename}" "\033[0m";

cd ./dist

tar -czf ${filename} *

echo $filename;


echo -e "\033[41;37m" "打包完成，系统已经自动帮你打开文件夹 " '\033[0m'


open ./



