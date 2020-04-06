##### 日志记录简洁化

```bash
$ git log --oneline
```

```bash
$ git log --oneline
=>
d7cdb2d (HEAD -> master) tableShow file rename to Readme
fc24742 Add two code changes
70cc115 Add js file
e54b758 Add style file
1be9df6 Add show.html+image file
6a218d7 ADD demo.html

```

##### 最近几次变更提交

```bash
$ git log -n数字
```

```bash
#只查看最近2次变更
$ git log -n2
=>
commit d7cdb2de89a3bb801f28533c1c4aed43f8996f8c (HEAD -> master)
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Mon Apr 6 21:03:31 2020 +0800

    tableShow file rename to Readme

commit 7f8f05544acc8828a148bafe645d0d1c3372d97d
Author: guansiyu_local <ladyguanguan@aliyun.com>
Date:   Mon Apr 6 20:37:57 2020 +0800

    Add what .DS_Store

```

##### 组合起来用

```bash
#简洁展示最近2次提交
$ git log -n2 --oneline
=>
d7cdb2d (HEAD -> master) tableShow file rename to Readme
7f8f055 Add what .DS_Store
```

