#!/bin/sh

git filter-branch -f --env-filter '
an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"
if [ "$GIT_COMMITTER_NAME" = "976500133" ]
then
  cn="2yuechanghe"
  cm="liujunbingdea3@163.com"
fi
if [ "$GIT_AUTHOR_NAME" = "976500133" ]
then
  an="2yuechanghe"
  am="liujunbingdea3@163.com"
fi
export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"
'
