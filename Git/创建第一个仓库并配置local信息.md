### 创建Git仓库

##### 两种场景

##### 1.把已有的项目代码纳入Git管理

```bash
$ cd 项目代码所在文件夹
$ git init
```

##### 2.新建项目 用Git管理

```bash
$ cd 某个文件夹
$ git init your_project #会在当前路径下创建和项目名称同名的文件夹
$ cd your_project
```



```bash
#在/Mac/User/mac/下创建git-learning文件夹
$ git init git-learning 
=>Initialized empty Git repository in /Users/mac/git-learning/.git/
#进入git-learning文件夹
$ cd git-learning/ 
#看看git-learning文件夹里有什么
$ ls -al 
=>total 0
drwxr-xr-x   3 mac  staff    96  4  4 23:25 .
drwxr-xr-x+ 54 mac  staff  1728  4  4 23:25 ..
drwxr-xr-x   9 mac  staff   288  4  4 23:25 .git #只有一个叫.git的隐藏文件夹 它是Git的核心内容


#设置local的用户信息
$ git config --local user.name 'guansiyu_local' 
$ git config --local user.email 'ladyguanguan@aliyun.com'
#检查核对配置的内容
$ git config --local --list 
=>user.name=guansiyu_local
  user.email=ladyguanguan@aliyun.com
  core.repositoryformatversion=0
  core.filemode=true
  core.bare=false
  core.logallrefupdates=true
  core.ignorecase=true
  core.precomposeunicode=true
  user.name=guansiyu_local
  user.email=ladyguanguan@aliyun.com
#从git-try文件夹(与git-learning同级)复制demo.html到当前目录下
$ cp ../git-try/demo.html .   #这时可在git-try目录下找到demo.html
#向Git提交修改到暂存区
$ git add demo.html
#看一下Git现在的状况如何
$ git status
=>On branch master

  No commits yet

  Changes to be committed: #Git已经开始管理这个文件 文件已在暂存区
    (use "git rm --cached <file>..." to unstage)

	  new file:   demo.html

#生成正式的commit
$ git commit -m'ADD demo.html'
=>[master (root-commit) 6a218d7] ADD demo.html
 1 file changed, 185 insertions(+)
 create mode 100644 demo.html

#查看git日志
$ git log
commit 6a218d75f62f5922123f8f5e7a75326528d94719 (HEAD -> master)
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sat Apr 4 23:43:28 2020 +0800

    ADD demo.html


```

