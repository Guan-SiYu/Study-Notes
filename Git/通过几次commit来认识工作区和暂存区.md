#### 工作目录---(git add files)--->暂存区---(git commit)--->版本历史

通过4次提交不断巩固练习

##### 加入html和image文件夹

```bash
#进入git-learning开始操作
$ cd git-learning
#从git-try文件夹(与git-learning同级)复制index.html到当前目录下并重命名为show.html
$ cp ../git-try/index.html show.html
#拷贝整个image文件夹到当前目录下
$ cp -r ../image .
#查看git状况
$ git status
=>
On branch master
Untracked files: #下面这些还没被git跟踪
  (use "git add <file>..." to include in what will be committed)

	.DS_Store
	image/
	show.html

nothing added to commit but untracked files present (use "git add" to track)
#把没被git管理的变成由git管理
$ git add demo.html image #add后面可以加多个文件和文件夹
#再次查看
$ git status
=>
On branch master
Changes to be committed: #下面这些已经放入暂存区
  (use "git reset HEAD <file>..." to unstage)

	new file:   image/timg-1.jpg
	new file:   image/timg.jpg
	new file:   image/touxiang.jpg

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.DS_Store
	show.html
#提交变更
$ git commit -m'Add show.html+image file'
[master 1be9df6] Add show.html+image file
 4 files changed, 36 insertions(+)
 create mode 100644 image/timg-1.jpg
 create mode 100644 image/timg.jpg
 create mode 100644 image/touxiang.jpg
 create mode 100644 show.html
#查看日志
$ git log
commit 1be9df6a28418ed9d40ce7bd88f352e125650b18 (HEAD -> master) #正式提交的ID号
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 00:41:12 2020 +0800

    Add show.html+image file


```

#### 添加style文件夹

```bash
#在git-learning下建一个style文件夹
$ mkdir style 
#从git-try文件夹下拷贝main.css 作为上一步style文件夹下的index.css
$ cp ../git-try/main.css style/index.css
#进入style文件夹
$ cd style
#看一下style文件夹里有没有index.css
$ ls -al
total 8
drwxr-xr-x  3 mac  staff    96  4  5 00:49 .
drwxr-xr-x  8 mac  staff   256  4  5 00:44 ..
-rwxr-xr-x  1 mac  staff  1353  4  5 00:49 index.css #有
#编辑index.css
bogon:style mac$ vi index.css #按Esc 然后:q离开
#看一下终端现在在哪里
$ pwd
/Users/mac/git-learning/style #在style文件夹里
#退到上级目录里
$ cd ../ 
bogon:git-learning mac$ #现在在git-learning文件夹里
#看一下git状态
$ git status
=>
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.DS_Store
	style/

nothing added to commit but untracked files present (use "git add" to track)
#将style文件夹放入暂存区
$ git add style
=>
bogon:git-learning mac$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   style/index.css
#提交纳入正式版本
$ git commit -m'Add style file'
=>
[master e54b758] Add style file
 1 file changed, 98 insertions(+)
 create mode 100755 style/index.css
#查看日志
=>
$ git log
commit e54b7589ed7e42e5e19618a5d1d69b68401b6024 (HEAD -> master)
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:08:36 2020 +0800

    Add style file


```

##### 添加js文件夹

```bash
$ cp -r ../git-try/jsFile .
$ git add jsFile #添加到暂存区
$ git commit -m'Add js file' #正式提交变更
=>
[master 70cc115] Add js file
 1 file changed, 39 insertions(+)
 create mode 100644 jsFile/text.js
$ git log
=>
commit 70cc115c72cce601d91223aa760cbe3dc8cb93ec (HEAD -> master)
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:20:29 2020 +0800

    Add js file

commit e54b7589ed7e42e5e19618a5d1d69b68401b6024
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:08:36 2020 +0800

    Add style file

commit 1be9df6a28418ed9d40ce7bd88f352e125650b18
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 00:41:12 2020 +0800

    Add show.html+image file

commit 6a218d75f62f5922123f8f5e7a75326528d94719
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sat Apr 4 23:43:28 2020 +0800

    ADD demo.html
```

##### 更改html和css

```bash
#编辑show.html 改好按Esc 然后:w!保存 最后:q离开编辑返回终端
$ vi show.html 
#同样编辑css
$ vi style/index.css
#查看git
$ git status
=>
On branch master
Changes not staged for commit: #未准备提交的更改
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   show.html #modified是调整、更改的意思 是modify的过去分词
	modified:   style/index.css
#对于git已经跟踪了的文件
$ git add -u #-u是update 表示所有工作区当中已经被git管理的文件一起放入暂存区
#查看git
$ git status
=>
On branch master
Changes to be committed:  #要提交的更改
  (use "git reset HEAD <file>..." to unstage)

	modified:   show.html
	modified:   style/index.css
#正式提交变更
$ git commit -m'Add two code changes'
=>
[master fc24742] Add two code changes
 2 files changed, 4 insertions(+), 5 deletions(-)
#查看git日志

```

看看所有的操作

```bash
$ git log
commit fc24742159978fa60d9e204ce28dd5837978659b (HEAD -> master)
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:42:40 2020 +0800

    Add two code changes

commit 70cc115c72cce601d91223aa760cbe3dc8cb93ec
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:20:29 2020 +0800

    Add js file

commit e54b7589ed7e42e5e19618a5d1d69b68401b6024
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 01:08:36 2020 +0800

    Add style file

commit 1be9df6a28418ed9d40ce7bd88f352e125650b18
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sun Apr 5 00:41:12 2020 +0800

    Add show.html+image file

commit 6a218d75f62f5922123f8f5e7a75326528d94719
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Sat Apr 4 23:43:28 2020 +0800

    ADD demo.html

```

