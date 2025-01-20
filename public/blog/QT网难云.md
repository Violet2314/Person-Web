---
title: QT网难云
date: 2024-07-31
tag: 技术开发
category: 我的赛博垃圾
excerpt: 玩一下QT
---
# 引入插件
## 引入Multimedia插件
Multimedia插件，是媒体播放器的插件，用来播放音乐和视频[qt镜像](https://download.qt.io/static/mirrorlist/)从中科大源或者阿里源下载，清华的好像不给下了

然后从源来下载对应版本的插件(我在QT安装目录发现了QT的组件管理软件**MaintenanceTool**),然后在储存库中选择**临时储存库**中加上对应版本的地址
```
   [Index of /qtproject/online/qtsdkrepository/windows_x86/desktop/qt6_671/ (ustc.edu.cn)](https://mirrors.ustc.edu.cn/qtproject/online/qtsdkrepository/windows_x86/desktop/qt6_671/)

...还有几个
```
总之就是把全部自己版本的都加上(我的是6.7.1)这样
## mysql插件
加入了mysql插件来连接mysql
	1. [【经验分享】Qt连接Mysql_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Jk4y167tt/?spm_id_from=333.1007.top_right_bar_window_history.content.click)
	2. [qt6.5.0MySQL驱动手动编译以及数据库连接详细教程以及注意事项附资源链接_qt编译mysql驱动-CSDN博客](https://blog.csdn.net/m0_52072919/article/details/130094915)
qt的比较麻烦,要先编译啥的，总之很麻烦，网上有不少教程

```yml
find_package(Qt6 REQUIRED COMPONENTS Multimedia)
find_package(Qt NAMES Qt6 Qt5 REQUIRED COMPONENTS Widgets Sql)
find_package(Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Widgets Sql)

......

target_link_libraries(MRS PRIVATE Qt6::Multimedia)
target_link_libraries(MRS PRIVATE Qt${QT_VERSION_MAJOR}::Sql)
```
# 设计
## 信号
知道了qt之间可以建立信号连接也就是`QObject::connect()`
### 登录的实现
登录的实现也是通过信号的连接来实现的
```cpp
    QObject::connect(&l2, &loginrigsters::loginSuccessful, [&w](int userId,QString username) {//绑定信号
        w.setuid(userId,username);
        w.show();
    });

//表示的是检测到从&l2中发出的loginSuccessful信号就执行这个connect
//这个loginSuccessful是在这loginrigsters个类中定义的所以写&loginrigsters::loginSuccessful
//这个信号传递了两个参数userId和username，写成[&w](int userId,QString username)
```
这个信号是自己定义的只用写在`.h`文件里面就好了，不用写在`.cpp`文件中
```h
signals:
    void loginSuccessful(int userId,QString username);
```
### 通过拖动进度条实现改变音乐进度条和声音大小
我们音乐进度条和声音的调整就是通过建立`QMediaPlayer audiooutput`和`ui->horizontalSlider`之间的信号来达成的
```cpp
void MainWindow::settime(){
    QObject::connect(mediaPlayer, &QMediaPlayer::mediaStatusChanged, [=](QMediaPlayer::MediaStatus status){
        if (status == QMediaPlayer::LoadedMedia) {
            qint64 duration = mediaPlayer->duration();
            ui->label_5->setText(gettime(duration));
            //setSlider();不能放在这里来，这样的话会在第一次初始化的时候出问题
        }
    });
}

void MainWindow::setSlider(){
    connect(mediaPlayer, &QMediaPlayer::positionChanged, this, [this](qint64 position) {
        if (!ui->horizontalSlider->isSliderDown()) {  // 检查滑块是否被用户拖动
            ui->horizontalSlider->setValue(position);
            ui->label_4->setText(gettime(position));//跟踪显示
        }
    });
    connect(ui->horizontalSlider, &QSlider::sliderMoved, this, [this](int position) {
        mediaPlayer->setPosition(position);
    });
    connect(mediaPlayer, &QMediaPlayer::durationChanged, this, [this](qint64 duration) {
        ui->horizontalSlider->setRange(0, duration);
        //std::cout << duration << "\n";
    });
}

void MainWindow::setVol(){
    ui->horizontalSlider_2->setValue(0.5 * 100);
    connect(ui->horizontalSlider_2, &QSlider::sliderMoved, this, [this](int position) {
        float n = (float)position/100.0;
        audiooutput->setVolume(n);
    });
    connect(audiooutput, &QAudioOutput::volumeChanged, this, [this](float n) {
        if (!ui->horizontalSlider_2->isSliderDown()) {  // 检查滑块是否还在被用户拖动
            int position = n * 100;
            ui->horizontalSlider_2->setValue(position);
        }
    });
}
```
## QSS
有各种乱七八糟的QSS
### 圆形
```css
    min-width:  50px;
    max-width:  50px;
    min-height: 50x;
    max-height: 50px;

    border-radius: 25px;
    border-width: 0 0 0 0;
```
### 好看的进度条
```css
QSlider::groove:horizontal {
border: 0px solid #bbb;
background: white;
height: 5px;
border-radius: 4px;
}

QSlider::sub-page:horizontal {
background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #66e, stop:1 #bbf);
background: qlineargradient(x1: 0, y1: 0.2, x2: 1, y2: 1, stop: 0 #5DCCFF, stop: 1 #0063B1);
background:rgb(202, 0, 0);
border: 1px solid #777;
height: 10px;
border-radius: 4px;
}

  

QSlider::add-page:horizontal {
background: rgb(166, 166, 166);
border: 1px solid #777;
height: 5px;
border-radius: 4px;
}

QSlider::handle:horizontal {
background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #eee, stop:1 #ccc);
border: 1px solid #777;
width: 10px; /* 滑块的宽度 */
height: 10px; /* 滑块的高度，确保与宽度相同以形成完美的圆形 */
margin-top: -3px; /* 根据需要调整，以确保滑块垂直居中 */
margin-bottom: -3px; /* 根据需要调整，以确保滑块垂直居中 */
border-radius: 5px; /* 设置为宽度的一半，形成圆形 */
}
```
### 图片圆角并且改变文字的位置
```css
font: 700 11pt "Microsoft YaHei UI";
color: rgb(57, 57, 57);
    text-align: top;
    border-radius: 15px;
    border-width: 0 0 0 0;
	
border-image: url(:/images/45d87197fe88fd5b2c4340428500fa3f49533273.jpg);
```
还有很多乱七八糟的玩意，自己去看吧
![](../images/PixPin_2024-07-31_11-51-28.png)
