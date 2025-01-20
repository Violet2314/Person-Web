<template>
    <div class="home">
        <NavBar @scroll-to="scrollToSection" ref="navBar" />
        <div class="white-ball-left"></div>
        <div class="white-ball-right"></div>
        <FloatingCard class="float-card-main" v-motion-slide-visible-once-bottom />
        <div class="card-experience" v-motion-pop-visible id="experience">
            <div class="experience-contant">
                <h1>My Experience</h1>
                <div class="experience">
                    <p>The fun-loving acm bronze medalist</p>
                    <p>Worked a 50-day full stack internship in Wuhan Yi ge Technology</p>
                </div>
                <div class="experience-card">
                    <DropCard />
                </div>
            </div>
            <div class="other-contant">
                <div class="other-contant-word">
                    <p>Haven't had that much experience</p>
                    <p>So 404</p>
                </div>
                <div class="not-found-item">
                    <NoFound />
                </div>
            </div>
        </div>
        <div class="technology-stack" v-motion-pop-visible id="stack">
            <div class="loverobots">
                <LoveDeathRobots />
            </div>
            <div class="one-stack">
                <FourCard :title="'JavaScript / Vue'" :grade="60" :logos="[require('@/photos/logo/icons8-javascript.svg'),require('@/photos/logo/icons8-视图-js.svg')]">
                    <template #description>
                        I developed some small web pages and personal websites, and participated in the front-end
                        development of the
                        <a href="https://www.starrycoding.com/problem" target="_blank" class="stack-a">StarryCoding
                            oj</a> web page.
                    </template>
                </FourCard>
                <FourCard :title="'QT(Cpp)'" :grade="40" :logos="[require('@/photos/logo/icons8-qt.svg'),require('@/assets/cpp-svgrepo-com.svg')]">
                    <template #description>
                        I used QT to develop a nethard cloud music player
                    </template>
                </FourCard>
                <FourCard :title="'Java'" :grade="20" :logos="[require('@/photos/logo/icons8-java咖啡杯徽标.svg')]">
                    <template #description>
                        I have developed a library management system and a personnel management system using Springboot
                        in java
                    </template>
                </FourCard>
                <FourCard :title="'Go'" :grade="10" :logos="[require('@/photos/logo/golang-svgrepo-com.svg')]">
                    <template #description>
                        Start Byte Academy right now. I'll learn
                    </template>
                </FourCard>
            </div>
            <div class="two-stack">
                <FourCardLong :title="'DataStructure / Algorithms'" :grade="44" :logos="[require('@/photos/logo/ccpc.png.svg')]">
                    <template #description>
                        I have studied algorithm for some time, participated in programming competition, and won the
                        bronze medal of ACM-CCPC China National Invitational Competition
                    </template>
                </FourCardLong>
                <OpenAi />
                <FourCardLong :title="'Python'" :grade="17" :logos="[require('@/photos/logo/icons8-python.svg')]">
                    <template #description>
                        I developed an email script that mimics the daily greetings that Yanami Anna sends me
                    </template>
                </FourCardLong>
            </div>
        </div>
        <div class="lab-card" id="lab">
            <LeftLabCard />
            <div class="right">
                <div class="right-container">
                    <MacBook v-motion-slide-visible-right />
                    <div class="right-card">
                        <RightCard v-motion-slide-visible-left />
                    </div>
                </div>
            </div>
        </div>
        <div class="favorites" id="favorites">
            <div class="menu-favorites">
                <p>My favorites things</p>
            </div>
            <div class="favorites-container">
                <FlyingCard />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'
import NavBar from '@/components/NavBar.vue';
import FloatingCard from '@/components/FloatingCard.vue';
// import LightThing from '@/components/LightThing.vue';
import OpenAi from '@/components/OpenAi.vue';
// import ThreeBook from '@/components/ThreeBook.vue';
import NoFound from '@/components/NoFound.vue';
// import BookCard from '@/components/card/BookCard.vue';
import DropCard from '@/components/card/DropCard.vue';
import FourCard from '@/components/FourCard.vue';
import FourCardLong from '@/components/FourCardLong.vue';
import LoveDeathRobots from '@/components/LoveDeathRobots.vue';
import LeftLabCard from '@/components/LeftLabCard.vue';
import MacBook from '@/components/MacBook.vue';
import RightCard from '@/components/card/RightCard.vue';
import FlyingCard from '@/components/card/FlyingCard.vue';
// import FlipCard from '@/components/card/FlipCard.vue';
// import SlideCard from '@/components/card/SlideCard.vue';
// import ThreeDCard from '@/components/card/ThreeDCard.vue';
// import TwoLayerCard from '@/components/card/TwoLayerCard.vue';

useMotion() // 初始化 motion

const navBar = ref(null)

const scrollToSection = (id) => {
    scrollaction(id);
    // 设置时间间隔后再执行第二个滚动动作
}

const scrollaction = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY; // 获取元素的绝对位置
        const offsetPosition = elementPosition - 60; // 向上偏移60像素

        // 滚动到计算的位置
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // 平滑滚动
        });
    }
}
</script>

<style>
:root {
    --primary-gary: #F7F7F7;
    /* 主色 */
    --primary-black: #121113;
    /* 辅助色 */
    --accent-colour: #82C0CC;
    /* 文字颜色 */
    --background-color: #82C0CC;
    /* 背景色 */
}

.home {
    overflow: hidden;
}

body {
    background: var(--primary-gary);
    margin: 0;
    font-family: Arial, sans-serif;
}

.not-found-item {
    position: absolute;
    right: 2%;
    bottom: -26%;
}

.other-contant-word {
    font-family: Anton;
    font-size: 44px;
    /* 可根据实际需要调整 */
    color: var(--accent-colour);
    line-height: 1;
    margin: 16px 32px;
}

.other-contant {
    display: flex;
    flex-direction: row;
    position: absolute;
    background: rgb(45, 55, 72);
    height: 90%;
    width: 85%;
    z-index: 4;
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
}

.experience {
    width: 55%;
}

.experience-card {
    position: absolute;
    z-index: 5;
}

.experience-contant {
    width: 100%;
    z-index: 5;
    padding: 0 5%;
    background: url("../assets/snow.png");
}

.experience-contant h1 {
    font-family: Anton;
    font-size: 44px;
    /* 可根据实际需要调整 */
    color: var(--accent-colour);
    line-height: 1;
}

.experience-contant p {
    font-family: 'Microsoft Sans Serif', Verdana, sans-serif;
    font-size: 18px;
}

.card-experience::after {
    border-radius: 20px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-shadow: inset -20px -70px 150px #6e6d6d3d;
    transition: box-shadow 0.5s ease;
}

.card-experience {
    margin: 200px auto;
    margin-bottom: 100px;
    display: flex;
    flex-direction: row;
    height: 400px;
    width: 60%;
    left: -11%;
    position: relative;
    background: rgba(255, 255, 255, 0.945);
    border-radius: 20px;
    box-shadow: -20px 20px 40px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

.white-ball-left {
    position: absolute;
    width: 380px;
    height: 400px;
    right: 180px;
    background: white;
    border-radius: 50%;
    filter: blur(10px);
    z-index: -1;
}

.white-ball-right {
    position: absolute;
    width: 380px;
    height: 400px;
    left: 15%;
    bottom: -22%;
    background: rgba(211, 82, 53, 0.231);
    border-radius: 50%;
    filter: blur(10px);
    z-index: -1;
}

.technology-stack {
    position: relative;
    width: 84%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.one-stack {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.stack-a {
    color: white;
}

.two-stack {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.loverobots {
    filter: blur(4px);
    position: absolute !important;
    z-index: -1;
    top: -30px;
    right: 20px;
    display: flex;
    flex-direction: row;
}

.lab-card {
    display: flex;
    margin-top: 100px;
    background: rgb(31, 36, 42);
    padding-left: 8%;
}

.right {
    position: relative;
    width: 100%;
    max-width: 1100px;
    overflow: hidden;
}

.right-container {
    width: 100%;
    position: absolute;
    left: 3%;
}

.right-card {
    width: 80%;
    max-width: 970px;
    position: absolute;
    right: 9%;
}

.favorites {
    padding-top: 5%;
    background: rgb(31, 36, 42);
    display: flex;
    flex-direction: column;
}

.favorites p {
    margin: 0;
}

.menu-favorites {
    margin: 0 auto;
}

.menu-favorites p {
    font-family: Anton;
    font-size: clamp(66px, 5vw, 100px);
    color: rgb(31, 36, 42);
    text-shadow:
        -2px -2px 0 #F7F7F7,
        /* 上左 */
        2px -2px 0 #F7F7F7,
        /* 上右 */
        -1px 1px 0 #F7F7F7,
        /* 下左 */
        1px 1px 0 #F7F7F7;
    /* 下右 */
}

.favorites-container {
    padding: 0 7%;
}

html {
    scroll-behavior: smooth;
}
</style>
