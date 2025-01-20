---
title: git使用教程
date: 2024-09-9T09:04:00
tags: 小技巧
category: 基本常识
excerpt: 自己总会忘记git命令吧
---
# git使用教程
## 小文件
```git
git init

git add .

git commit -m "... commit"

git remote add origin <url>

git push -u origin <branch>
```
## 大文件
跟踪大文件：使用以下命令告诉 Git LFS 跟踪特定文件类型的大文件

将 `*.ext` 替换为你要跟踪的文件类型的模式，例如 `*.mp4` 或 `*.zip`。Git LFS 将会为匹配的文件类型启用跟踪。

```git
git lfs track "*.ext"
git add large_file.ext
git commit -m "Add large file using Git LFS"
```

推送和拉取大文件：使用常规的 git push 和 git pull 命令来推送和拉取包含大文件的提交。Git LFS 会自动处理大文件的上传和下载。
