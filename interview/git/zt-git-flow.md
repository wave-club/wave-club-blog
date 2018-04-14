# 如何使用git协同开发



### 功能驱动

git 主要有三种工作流程，有一个共同点：都采用["功能驱动式开发"](https://en.wikipedia.org/wiki/Feature-driven_development)（Feature-driven development，简称FDD）。

它指的是，完成开发后，该分支就合并到主分支，然后被删除。



### Git flow

最早诞生、并得到广泛采用的一种工作流程，就是[Git flow](http://nvie.com/posts/a-successful-git-branching-model/) 。

它最主要的特点有两个



##### 1.项目存在两个长期分支

```js
master 主分支

develop 开发分支

//前者用于存放对外发布的版本，任何时候在这个分支拿到的，都是稳定的发布版，最不活跃的；后者用于日常开发，存放最新的开发版。
```



##### 2.存在三种短期分支

```js
功能分支（feature branch）
补丁分支（hotfix branch）
预发分支（release branch）

// 缺点： 部门开发中通常要不就一条master走到底，要不就是master+develop，其实基本满足需要了。多了徒增复杂度，维护起来很麻烦
```



### Github flow （推荐）

[Github flow](http://scottchacon.com/2011/08/31/github-flow.html) 是Git flow的简化版，专门配合"持续发布"。它是 Github.com 使用的工作流程。

它只有一个长期分支，就是`master`，因此用起来非常简单。



Github flow 的最大优点就是简单，对于"持续发布"的产品，可以说是最合适的流程。



> 可是，有些时候并非如此，代码合并进入`master`分支，并不代表它就能立刻发布。比如，苹果商店的APP提交审核以后，等一段时间才能上架。这时，如果还有新的代码提交，`master`分支就会与刚发布的版本不一致。另一个例子是，有些公司有发布窗口，只有指定时间才能发布，这也会导致线上版本落后于`master`分支。
>
> 上面这种情况，只有`master`一个主分支就不够用了。通常，你不得不在`master`分支以外，另外新建一个`production`分支跟踪线上版本。



### Gitlab flow

[Gitlab flow](http://doc.gitlab.com/ee/workflow/gitlab_flow.html) 是 Git flow 与 Github flow 的综合。它吸取了两者的优点，既有适应不同开发环境的弹性，又有单一主分支的简单和便利。它是 Gitlab.com 推荐的做法。



#### 上游优先

Gitlab flow 的最大原则叫做"上游优先"（upsteam first），即只存在一个主分支`master`，它是所有其他分支的"上游"。只有上游分支采纳的代码变化，才能应用到其他分支。



#### 持续发布方案

对于"持续发布"的项目，它建议在`master`分支以外，再建立不同的环境分支。比如，"开发环境"的分支是`master`，"预发环境"的分支是`pre-production`，"生产环境"的分支是`production`。



开发分支是预发分支的"上游"，预发分支又是生产分支的"上游"。代码的变化，必须由"上游"向"下游"发展。比如，生产环境出现了bug，这时就要新建一个功能分支，先把它合并到`master`，确认没有问题，再`cherry-pick`到`pre-production`，这一步也没有问题，才进入`production`。

只有紧急情况，才允许跳过上游，直接合并到下游分支。



### 1.Branch 分支说明



#### 1.1 master branch：主分支

主分支从项目一开始便存在，它用于存放经过测试，已经完全稳定代码；在项目开发以后的任何时刻当中，`master`存放的代码应该是可作为产品供用户使用的代码。所以，应该随时保持`master`仓库代码的`清洁和稳定`，确保入库之前是通过*完全测试和代码reivew的*。`master`分支是所有分支中最不活跃的，根据项目需要周期性更新，每一次master更新的时候都应该用git打上`tag`，来说明产品有新版本发布。



#### 1.2 develop branch：开发分支

它是一开始从`master`分支中分离出来，用于开发者存放基本稳定代码。每个开发者的仓库相当于源仓库的一个镜像，每个开发者自己的仓库上也有`master`和`develop`。开发者把功能做好以后，是存放到自己的`develop`中，当测试完以后，可以向管理者发起一个`pull request`,请求把自己仓库的`develop`分支合并到源仓库的`develop`中。所有开发者开发好的功能会在源仓库的develop分支中进行汇总，当develop中的代码经过不断的测试，已经逐渐趋于稳定了，接近产品目标了。这时候，就可以把`develop`分支合并到`master`分支中，发布一个新版本。



> 任何人不应该向master直接进行无意义的合并、提交操作。正常情况下，master只应该接受develop的合并，也就是说，master所有代码更新应该源于合并develop的代码。
>
> 部门开发中通常要不就一条master走到底，要不就是master+develop，其实基本满足需要了。多了徒增复杂度



#### 1.3 feature branch：功能分支

它是用于开发项目的功能的分支，是开发者主要战斗阵地。开发者在本地仓库从`develop`分支分出功能分支，在该分支上进行功能的开发，开发完成以后再合并到`develop`分支上，这时候功能性分支已经完成任务，可以删除。功能性分支的命名一般为`feature-*`，`*`为需要开发的功能的名称。



### 2.常见操作流程



> 假设有1个github 地址 https://github.com/976500133/FETopic.git



1.克隆仓库 Repository 地址

```nginx
git clone  https://github.com/976500133/FETopic.git
```



2.首先切换到devlop分支 (devlop 也可以叫其他的， 比如deploy 等)

```nginx
git checkout -b devlop ( 及其重要：一定要确保 devlop是 基于 master 新建的， 也就是在master 的分支上运行  )
```



3.分出一个功能性分支

```nginx
git checkout -b feature-user-profile
```



4.如果进行了一顿猛如虎的代码修改



5.测试没问题，提交更改

```nginx
git add ../zt   // feature-user-profile 
git commit -m "add user-profile feature "
```



6.拉取最新代码（非必要）

```nginx
git pull  (非必要，在push 不上去的时候 需要执行)
```



7.推送分支到远程

```nginx
git push origin feature-user-profile

或者
git push --set-upstream origin feature-user-profile  //(只设置一次就行)
git push  //以后可以直接push

```



8.假设是master 为主分支,通知主分支合并feature-user-profile,

```nginx
git rebase origin/master

//如果出现冲突 conflict , 解决完之后 执行

git add ../zt
git rebase --continue //多次冲突的话需要多次执行命令 

//如果放弃的话， 使用如下命令
git rebase --abort

```



9.把rebase 过的代码推送到远程

```nginx
git push -f origin feature-user-profile
```



10.直接master 合并 feature-user-profile 就是直线了~！！赞

```nginx
git checkout master
git pull 
git merge origin/feature-user-profile
```



### Merge节点



Git merge 有两种合并：一种是"直进式合并"（fast forward），不生成单独的合并节点；另一种是"非直进式合并"（none fast-forword），会生成单独节点。

前者不利于保持commit信息的清晰，也不利于以后的回滚，建议总是采用后者（即使用--no-ff参数）。只要发生合并，就要有一个单独的合并节点。



### 部分非完全精准的总结



###### git merge <branch>|<commit-id> 直接合并某个分支或节点。用于2个不同分支直接的代码合并

###### git cherry-pick <commit-id> 摘取合并 某次 提交的信息 , 比如我某次提交就叫了一句注释， 就会合并进来这句注释

###### git rebase <branch>时间基线会修改， 修改时间线,让线看起来笔直的



