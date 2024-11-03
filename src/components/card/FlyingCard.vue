<template>
    <div class="favorites-main-container">
        <div class="one-favoites">
            <div class="title">
                <p>The Game</p>
            </div>
            <div class="one-favoites-container">
                <div class="favorites-left">
                    <div class="P5R-container-left" v-motion-pop-visible>
                        <div class="container-title">P5R</div>
                        <div class="container">
                            I like the PERSONA very much, every one of its works is first-class fun, but the most to my
                            appetite or P5R, its color, music, game, are full marks
                        </div>
                    </div>
                    <div class="robot-left">
                        <div class="robot-container" v-motion-slide-visible-left>
                            <img src="../../photos/LovePhotos/robot.jpg" alt="" class="robot">
                        </div>
                    </div>
                </div>
                <div class="favorites-right">
                    <div class="P5R-container" v-motion-roll-visible-right>
                        <img src="../../photos/LovePhotos/P5R.png" alt="" class="P5R">
                    </div>
                    <div class="robot-container-right" v-motion-pop-visible>
                        <div class="container-title">ARMORED CORE VI: FIRES OF RUBICON</div>
                        <div class="container">
                            Flying a mech is every man's romance
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="two-favoites">
            <div class="title">
                <p>The ACGN</p>
            </div>
            <div class="two-favoites-container">
                <div class="favorites-left two-left">
                    <div class="bai-favorites-left" v-motion-slide-visible-left>
                        <div class="bai-left" >
                            <DBook :width="18" :imgUrl="require('../../photos/LovePhotos/baiquan1.jpg')" class="bai1" />
                            <DBook :width="18" :imgUrl="require('../../photos/LovePhotos/baiquan2.jpg')" class="bai2" />
                        </div>
                    </div>
                    <div class="violet-left" v-motion-pop-visible>
                        <div class="container-title">Violet Evergarden</div>
                        <div class="container">
                            For me, Violet Evergarden is also an incomparably divine novel, and many of its plots make
                            me cry. I love this work, which does not focus on big figures and big scenes, but tells the
                            story of one person learning to love in an era
                        </div>
                    </div>
                </div>
                <div class="favorites-right two-right">
                    <div class="bai-right" v-motion-pop-visible>
                        <div class="container-title bai-title">負けヒロインが多すぎる！</div>
                        <div class="container">
                            I really like this work very much, whether it is its novel, manga or anime, it brings me
                            unparalleled fun, I can hardly describe the feeling it brings me, superficial is a kind of
                            "youth feeling", I like Yanami Anna very much, I don't know how to say this feeling, in a
                            word, I like it very much
                        </div>
                    </div>
                    <div class="violet-favorites-right" v-motion-slide-visible-right>
                        <div class="violet-right">
                            <DBook :width="18" :imgUrl="require('../../photos/LovePhotos/violet.jpg')" class="bai1" />
                            <DBook :width="18" :imgUrl="require('../../photos/LovePhotos/violet1.jpg')" class="bai2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">

        </div>
    </div>
</template>

<script setup>
import DBook from '../3DBook.vue'; 
</script>

<style>
.title p {
    font-family: Anton;
    font-size: clamp(44px, 4vw, 80px);
    color: #82C0CC;
}

.two-favoites .title {
    margin-top: 90px;
}

.two-favoites-container {
    display: flex;
    flex-direction: row;
}

.robot {
    opacity: 0.9;
    position: relative;
    width: 130%;
    left: -20%;
    border-radius: 16px;
    border: 2px solid #00ff00c0;
}

.robot-left {
    margin-top: 40px;
}

.P5R-container-left {
    margin-top: 8%;
    width: 90%;
}

.robot-container-right {
    margin-top: 8%;
    width: 90%;
    margin-left: auto; /* 让块级元素靠右 */
    text-align: right;
}

.container-title {
    border-bottom: 2px solid #F7F7F7;
    color: #F7F7F7;
    font-family: Anton;
    font-size: 40px;
}

.container {
    min-height: 120px;
    padding: 10% 5% 10% 0%;
    color: #F7F7F7;
    font-size: 22px;
    border-bottom: 2px solid #F7F7F7;
}

.favorites-main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.favorites-left {
    width: 50%;
    border-right: 5px solid #F7F7F7;
    padding-bottom: 2%;
}

.favorites-right {
    width: 50%;
    border-left: 5px solid #F7F7F7;
    padding-bottom: 2%;
}

.one-favoites {
    display: flex;
    flex-direction: column;
}

.one-favoites-container {
    display: flex;
}

.P5R-container {
    width: 90%;
    display: flex;
    perspective: 1000px;
    /* 设置透视效果 */
}

.P5R {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 16px;
    box-shadow: -20px 20px 30px rgba(0, 0, 0, 0.3);
    /* 阴影从左下角延伸 */
    transform-origin: bottom left;
    /* 设置旋转中心为左下角 */
    transform: rotateX(40deg) rotateY(-30deg) rotateZ(20deg) translate(-20px, -10px);
    /* 初始插入效果 */
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.P5R-container:hover .P5R {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate(0, 0) scale(1.05);
    /* 悬停时恢复平面 */
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
    /* 调整悬停时阴影 */
}

.bai-left {
    display: flex;
    width: 90%;
}

.violet-right {
    display: flex;
    width: 90%;
}

.bai1 {
    z-index: 1;
}

.bai-right {
    margin-top: 7%;
    text-align: right;
}

.bai-title {
    font-family: "Mochiy Pop One", sans-serif;
    font-style: normal;
}

.bai-favorites-left {
    height: 55%;
    display: flex;
    align-items: center;
}

.violet-favorites-right{
    height: 55%;
    display: flex;
    align-items: center;
}



.violet-left{
    padding-top: 30px;
}

.two-left{
    padding-bottom: 5%;
}
.two-right{
    padding-bottom: 5%;
}

.block{
    padding: 2%;
}
.bai-right{
    width: 90%;
    margin-left: auto; /* 让块级元素靠右 */
}
.violet-left{
    width: 90%;
}
</style>